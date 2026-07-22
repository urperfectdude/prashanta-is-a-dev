---
title: "GTMhero (In Progress)"
date: "2026-07-22"
description: "A prototype that reads a company's website and drafts a first month of go-to-market content across LinkedIn, Instagram, X, and Facebook."
image: "/projects/gtmhero.png"
tags: ["React", "Vite", "Supabase", "OpenAI"]
---

## Why it exists

Building the product and running the marketing for it are two different jobs, and most solo developers only signed up for the first one. GTMhero is my attempt at closing that gap: give it your company's URL and it drafts your go-to-market plan for you, so the building doesn't stop to make room for the marketing.

## What it is

You land on the page, type in your domain, and hit "Draft my GTM plan." From there GTMhero crawls your homepage plus up to five other key pages on your site. That crawl becomes a business profile: a written summary of what the company does, plus a logo and brand colors when it can find them on the page. The whole thing takes around 40 seconds.

That profile isn't a one-shot guess you're stuck with. It's versioned in the backend, so it can be regenerated or refined instead of thrown out and redone from scratch.

## From profile to calendar

Once GTMhero has a business profile, it uses it to draft a content calendar aimed at covering a first month of marketing. Each item on the calendar is tied to a channel (LinkedIn, Instagram, X, or Facebook) and a format (a single graphic, a carousel, or a video).

Generating the actual asset for an item happens in two stages, not one. First a wireframe gets drafted and sits waiting for approval. Only after you approve it does GTMhero generate the finished graphic, carousel, or video. Nothing goes straight from idea to finished asset without a checkpoint in between.

## Bring your own key

AI generation on GTMhero runs on your own OpenAI API key, not mine. You add it in Settings, it's stored server side, and nothing generates until it's there. Content generation is flatly gated on it: no key, no output.

This was a deliberate call rather than a cost-saving shortcut. A tool that drafts a month of marketing content is going to make a lot of model calls, and running all of that through my own key doesn't scale to more than a couple of users. Letting people bring their own means the tool can exist as a real prototype without turning into a standing bill.

## Where it stands

GTMhero is a working demo, not a finished product. I built it to prove the crawl-to-profile-to-calendar-to-asset pipeline actually holds together end to end, and it does, but I haven't put it in front of real companies yet. Treat it as a working sketch of the idea rather than something ready for a team to run their marketing on.

## How it's built

The front end is React, built with Vite, and it deploys as a static site to GitHub Pages, the same shape as this portfolio. Supabase sits behind it doing the actual work: Postgres tables for the business context, calendars, and calendar items, edge functions for crawling and generating wireframes, carousels, and images, and realtime for pushing state back to the browser as a wireframe moves from drafted to approved. OpenAI handles the generation itself, run against whatever key you've added.

## Where to get it

[urperfectdude.github.io/gtmhero](https://urperfectdude.github.io/gtmhero/)
