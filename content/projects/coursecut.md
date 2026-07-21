---
title: "CourseCut"
date: "2026-07-21"
description: "A local-first desktop app that turns long lecture recordings into structured, edited lesson videos, using Whisper and GPT to find where one lesson ends and the next begins."
image: "/projects/coursecut.png"
tags: ["Tauri", "Rust", "React", "TypeScript", "SQLite", "OpenAI Whisper", "GPT"]
---

## Why it exists

I had a bunch of long lecture recordings, the kind that run two or three hours straight with no natural breaks in them. Cutting those into individual lessons by hand meant scrubbing through the whole recording, marking timestamps, and exporting clips one at a time. I wanted something that could look at a raw recording and figure out where one lesson stopped and the next one started, then let me clean that up instead of building the whole thing from nothing.

## What it is

CourseCut is a desktop app for macOS and Windows. Feed it a long lecture recording and it comes back with a set of separate, structured lesson videos instead of one undifferentiated file. It's local-first: the app runs on your machine and reads your files off your machine.

## How it works

It's built with Tauri, so the desktop shell and file handling are Rust and the interface is React and TypeScript. SQLite keeps track of projects and segments locally.

The splitting itself happens in two steps. Whisper transcribes the video into text first. Then GPT reads that transcript and works out the structure inside it: where a lesson's ideas wrap up, where a new one starts, what reads like an intro or a recap. What comes out of that step is a set of proposed segments, not a final cut.

You get the final say. The app shows you the segments GPT proposed before anything gets exported. Move a boundary if it's off. Merge two segments that should have been one. Drop a segment that turned out to be filler. Export only runs on what you've actually approved.

## The video stays on your machine, on purpose

This was a deliberate call, not an afterthought. The source video is the largest and most sensitive thing in the whole process, so it never leaves the device it's on. What actually gets sent out for the Whisper and GPT steps is the extracted audio and the transcript text, not the video file itself.

That's a smaller, cheaper thing to send over the network, and it means the raw footage stays put no matter what. If a lecture recording has something in it you wouldn't want sitting on a third-party server, it doesn't have to.

## Where to get it

[github.com/urperfectdude/coursecut](https://github.com/urperfectdude/coursecut)
