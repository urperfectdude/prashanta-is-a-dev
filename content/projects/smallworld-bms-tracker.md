---
title: "SmallWorld: Events Platform and the BookMyShow Sales Tracker"
date: "2026-06-01"
description: "A solo build for SmallWorld: a Turborepo monorepo running the customer and admin web apps, plus a scraper and Telegram bot that tracks 10,000+ events on BookMyShow, a platform with no public API. Sync schedules are tuned to dodge rate limits, keeping 99%+ uptime and making it the daily numbers source for 50+ organizers."
image: "/projects/smallworld.jpg"
tags: ["TypeScript", "React", "Vite", "Turborepo", "Supabase", "PostgreSQL", "Row-Level Security", "Playwright", "Telegram Bot"]
---

## What I was building

I'm the sole engineer on [SmallWorld](https://www.instagram.com/small.world/?hl=en)'s platform, one of the bigger event-hosting companies in India. It's a Progressive Web App for discovering, booking, staffing, and managing events, built as a Turborepo monorepo with two apps: `apps/web` for customers, gig workers, event hosts, and organizers, and `apps/admin` for admin and finance staff.

## Talking to the people who'd use it

Before any of that went into a schema, I talked to more than 10 core members of SmallWorld's internal teams, spanning customers, gig workers, event hosts, organizers, finance, and admin. The six-role model, and most of the features below, came out of those conversations, not out of deciding what to build and then finding people to agree with it.

Gig workers and event hosts were describing the same problem from opposite sides of the door: no fast way to tell who'd actually shown up against who'd merely booked. That's what pointed toward QR-based attendance instead of a name checked off a printed list.

Finance staff had a different complaint. Reimbursement requests came in over chat or email, with no record of what had been approved, by whom, or what was still owed. That's the shape the reimbursements flow and the finance role were built around: a request with a visible trail instead of a thread someone had to scroll back through.

Organizers were losing time before an event even opened for booking. Setting one up meant working across scattered forms and spreadsheets before anything went live, which is why event creation became a guided multi-step flow instead of one long form.

And customers weren't really finding events, they were hearing about them secondhand through a WhatsApp group or a friend, then messaging someone to check if a spot was still open. That's the gap discovery, coupons, referrals, and wallet credits close, so finding a spot and vouching for it to a friend both happen inside the app instead of around it.

## No backend, on purpose

Both apps connect directly to Supabase Postgres. There's no API layer sitting between them and the data.

That's the part worth explaining, because it's not the default choice. Access control lives entirely in the database instead: Row-Level Security policies decide which rows a given user can even see, Postgres triggers keep derived data like a wallet balance or an attendance count consistent without a service layer reconciling it after the fact, and SECURITY DEFINER RPCs handle the handful of operations, like approving a reimbursement, that need to run with more privilege than the calling user has, without handing that privilege to the client directly.

The six roles, customer, gig_worker, event_host, organizer, finance, admin, aren't just a column value. They're what every RLS policy checks against, and what apps/web and apps/admin use to decide which screens even render. A gig worker's session can query the database directly and still never see a row of finance data, because the rule blocking that read lives next to the data, not in a controller somewhere that a future change could forget to enforce.

## What's actually in it

**Booking and payments.** Customers authenticate over SMS OTP, browse and book events, and admin staff can lean on an AI-powered Booking Assistant to ask for numbers in plain language instead of digging through a report, "give me a summary of today's non-zero booked tickets" answered in chat. Coupons, referrals, and wallet credits sit on top of the same booking flow. Credit earned from a referral shows up as a balance a customer can spend on their next booking, not a separate ledger of who invited whom.

**Staffing and operations.** Organizers assign gig workers to events, workers get scheduled shifts, and QR attendance at the door replaces the printed list, the exact friction the gig-worker and event-host conversations surfaced. Venue management and reimbursements live on the admin and finance side, so a gig worker's payout for a shift has a trail from assignment through attendance through the reimbursement finance actually approves.

**Retention and comms.** WhatsApp and email notifications handle the follow-up that used to depend on someone remembering to send it: a booking confirmation, a reminder, a nudge to come back. None of it is a blast to everyone. It's tied to what a specific user actually did on the platform.

## The one problem with no clean fix

Everything above assumes SmallWorld can read its own data. There's one number it couldn't get to at all: how a show is actually selling on BookMyShow.

When you list an event on BookMyShow, India's largest ticketing platform, you can watch it sell on their dashboard and nowhere else. No public API, no export, no feed. An organizer running ten shows across cities had no single place to answer a basic question: how is each one actually selling right now? They were checking dashboards by hand, one show at a time. That stops working the moment you have more than a couple of events.

The fix had two halves. Get the data out of BookMyShow reliably, then put it somewhere the organizers already spend their day. That turned into a scraper and a Telegram bot, kept as two separate apps on purpose.

## Getting the data out

The scraper is a TypeScript and Node.js background service that pulls live seat-availability data off BookMyShow and lands it in the same Supabase Postgres database.

The hard part isn't reading the page. It's not getting blocked. BookMyShow runs real bot detection, so a plain headless browser gets shut out fast. I used Patchright, a stealth fork of Playwright, with ghost-cursor on top so the mouse moves in human-looking arcs instead of teleporting around the page. Everything goes out through a pool of rotating residential proxies, so the traffic doesn't read as one machine hammering the site from a single address.

Speed matters too, because stale numbers are useless and there's a lot to keep current: more than 10,000 events. The service runs four headless browsers in parallel on a virtual display using Xvfb, staggered so they don't all hit the site at once and trip rate limits. The first version wrote each event back one row at a time, which fell apart at that volume. I switched to bulk SQL upserts that push a whole batch of events in a single statement instead of a query per show. That one change is most of why a full pass now finishes in a reasonable window. Prisma still handles the session database, where the lighter, structured reads and writes are a better fit for an ORM than the bulk event writes are.

On top of that sits a node-cron job that re-scrapes on an interval, plus a small authenticated HTTP API. `POST /scrape` kicks off an on-demand run when someone wants numbers right now, and `GET /status` is there for health checks. Between the cron schedule and the parallel browsers, no event's numbers sit stale for more than 90 seconds.

The whole thing is Dockerized and deploys itself. Push to GitHub, GitHub Actions builds the image and pushes it to GHCR, and CapRover pulls and runs it on a DigitalOcean droplet. Keeping Chromium stable in production took some tuning of the shared-memory config, which is the kind of thing you only find out about once four browsers start crashing under load. That tuning is also why the service has held 99%+ uptime since it went live, it's the boring infrastructure work that nobody sees until it's missing.

## Putting it where they already are

The second app is a Telegram bot. It reads from the same Supabase Postgres database and lets an organizer ask about their events in plain chat: total ticket sales, the breakdown by venue, the numbers show by show. No dashboard to log into, no new tool to learn. They were already on Telegram all day, so the answers come to them there. It's now the daily numbers source for 50+ event organizers across the shows SmallWorld runs.

![SmallWorld BookMyShow bot in Telegram, answering non-zero booking counts by city, a CSV export, and a 7-day ticket summary](/projects/bms_bot.png)

Ask it for "today" and it comes back with the shows listed, total tickets sold against capacity, occupancy, and the top-selling shows broken out by venue and city. From there an organizer can drill into a single venue or pull the full list, all without leaving the chat.

## Why two apps instead of one

The scraper and the bot share one Supabase Postgres instance but run as completely separate services. That was deliberate. Data collection and the user-facing product fail for different reasons and change at different speeds. If the bot is down, the scraper keeps filling the database. If the scraping logic needs a rewrite because BookMyShow changed their page, the bot doesn't care, it's still reading the same tables. Drawing that line early kept both sides simple, and it meant I could keep tearing into the fragile scraping part without ever putting the thing organizers actually touch at risk.

## What it adds up to

Research, an architecture that pushes access control into the database instead of a backend, and one integration with no API to lean on, all on one build. The scraper and the bot are the part that looks hardest from outside: bot detection, proxies, headless browsers. The part that actually mattered more happened earlier, sitting with ten-plus people across six different roles long enough to know which six roles were real, then building a database that enforces that model instead of an app that just displays it.

I went in assuming a business this physical, staffing gig workers, checking people in at a door, chasing reimbursements over chat, would resist getting tightened up by software. You can't script someone showing up to an event. But QR attendance replacing a printed list, and a reimbursement turning into a request with an approver and a timestamp instead of a thread someone had to scroll back through, argued otherwise. RLS backed it up at the data layer: the six roles held because the database enforced them, not because a screen was careful enough to hide the right button. The friction I'd assumed was physical turned out to be about how much of the work lived in someone's memory or an unsearchable thread, not in the door or the shift itself.
