---
title: "Osho Discourse Library"
date: "2026-03-01"
description: "Personal audio library for Osho discourses that turned into a free web app used by hundreds of listeners."
image: "/projects/interesting/overview.jpg"
tags: ["Midnight Product", "React", "PostHog"]
---

## Why I built it

I had a big folder of Osho discourses sitting on my local drive. Every time I switched phones, moving all those files was painful. Upload once, access from anywhere sounded better.

So I pushed the audio to GitHub, used an open source player, wrapped it with a thin custom shell, tweaked it to how I actually listen, and had something working in a few midnight hours. I was genuinely happy with how it turned out.

## Sharing it

Thought it might help others too, so I posted on Reddit before going to sleep. Woke up to 200+ users and a lot of warm messages. That was unexpected.

<div
  data-reddit-embed
  data-url="https://www.reddit.com/r/Osho/comments/1r97sp6/i_built_a_free_web_app_organizing_all_osho/"
  data-title="I built a free web app organizing all Osho discourses by topic"
  data-subreddit="Osho"
></div>

[rajneesh-live.github.io/library/explore](https://rajneesh-live.github.io/library/explore)

## Numbers (last 90 days)

![PostHog overview](/projects/interesting/overview.jpg)

602 visitors, 12.9k page views, 28 min average session. People are not just landing and leaving. 19% bounce rate.

![Weekly active users](/projects/interesting/weekly-active-users.png)

![Total listened minutes](/projects/interesting/listened-minutes.png)

![Listened minutes by hour](/projects/interesting/listened-by-hour.png)

![Referring domains](/projects/interesting/referring-domains.png)

Reddit still sends a good chunk of traffic. A lot of people come back direct too.

## How it works

GitHub hosts the audio files. An open source web player does the playback. A small custom UI on top. PostHog for analytics.

It is also a PWA, so you can install it on your phone, tablet, or laptop and open it like a regular app. No app store needed.

No backend. No database. Just files and a player.

## Features

What it's grown into since that first midnight version:

- **Transcripts** — full text of each discourse, synced to the audio.
- **Transcript-based search** — search inside the actual words spoken, not just titles and tags, and jump straight to that moment in the audio.
- **Bookmarks with comments** — save a timestamp and write a note on why it mattered, so you can come back to it later.
- **Reels/shorts** — short clippable moments from discourses for people who want a five minute hit instead of an hour.
- **Background music** — most of the original recordings are very plain, so there's optional BGM with its own volume control to make long listens easier.
- **Search bar** — find a discourse by name or topic instead of scrolling through the whole library.
- **English/Hindi filter** — Osho spoke in both languages, so you can filter the library by language.
- **Product analytics with PostHog** — granular event tracking to actually understand what people listen to and where they drop off.
