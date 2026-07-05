---
title: "Sherpa - AI Chrome Extension for ERP Training"
date: "2024-06-01"
description: "An AI Chrome extension that turns any Oracle ERP workflow into a finished training guide and voiceover video, live at sherpa.yourerpcoach.com."
image: ""
tags: ["Chrome Extension", "LangGraph", "Claude", "FFmpeg", "AI Pipeline"]
---

## Why it exists

Enterprise Oracle ERP training documentation took weeks to put together for a single client at YourERPCoach, all of it written and screenshotted by hand. That pace put a hard ceiling on how many accounts we could take on, since every new client meant another few weeks of someone's time before training could even start.

## What I built

I led design-to-launch on a Chrome extension that watches someone click through an ERP workflow once, capturing each clicked UI element along with its DOM context as they go. FFmpeg stitches the captured frames into a video, and an AI voice narrates the steps over it. What comes out the other end is a finished PDF and a voiceover video, generated from someone just doing their job, not writing it up afterward.

The result lives at [sherpa.yourerpcoach.com](https://sherpa.yourerpcoach.com), where clients can see the generated guides and videos directly.

## Rebuilding the pipeline as it grew

The first version ran on a straightforward linear pipeline, one step feeding the next. That held up while Sherpa scaled to 500+ enterprise clients, but I eventually rebuilt it into four separate agents, a retriever, a planner, an executor, and a validator, each testable on its own instead of debugging one long chain end to end. I also swapped the primary model to Claude Haiku, which cut inference cost by 60% without losing narration quality.

## What moved

Documentation time down 70%. Scaled to 500+ enterprise clients. Inference cost down 60% after the move to Claude Haiku.
