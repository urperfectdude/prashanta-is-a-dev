---
title: "Start Life - Deceased Individuals Directory"
date: "2024-01-15"
description: "A Hebrew memorial directory app for an Israeli client, built solo end to end in Bubble.io from a Figma handoff."
image: "/projects/startlife.jpg"
tags: ["Bubble.io", "No-Code", "RTL", "Freelance"]
---

## Why it exists

An Israeli client came to me with a finished Figma file and one idea: a directory of memorial pages for people who had died. Search for someone, see their life details and photos, see how they connect to other people already in the directory. The design was done. What the client needed was someone to actually build it.

## Where I came in

I got the Figma file and built the whole app alone, on Bubble.io, in Hebrew, right to left, for an Israeli audience. No team, no handoff to another developer, just the design and me. Bubble was the client's call, not mine, and it shaped almost every decision downstream. A no-code tool gives you data types and workflows and a drag-and-drop editor, not a blank canvas. Getting the Figma design to actually behave the way it looked meant working inside those limits rather than around them.

## Building a family tree with no tree component

The design shows something that looks like a small org chart: one person in the center, a spouse next to them, parents above, siblings and children fanned out around the edges. Bubble has no element for this. What it has is data types that can point at each other.

So each person record carries relationship fields, spouse, parent, sibling, child, each one a link to another person record already in the directory. The graph on screen isn't a chart library rendering a tree, it's a set of repeating groups placed and sized so that whichever relationships exist for that person land in the right position around them. Add a sibling to someone's record and a new node appears in the sibling row automatically, because the layout is just reading the data, not redrawn by hand.

## Deciding who can touch a memorial

A memorial page for someone's parent or spouse is not something the internet at large should be able to edit. Anyone can view a profile, but only the people the family has approved can change it, add photos, or correct details.

Bubble's privacy rules made this workable without writing custom server logic. Each memorial stores a list of approved editors, and the rule checks whether the current logged-in user is on that list before any edit action is even allowed to run, not just before an edit button is shown. That distinction matters. Hiding a button is a UI trick. A privacy rule enforces the restriction at the data level, so someone can't just poke around and find an unprotected way in.

## Hebrew, mirrored, all the way through

The client wanted the whole app right to left, which is a bigger ask than switching the text alignment. Every layout in the Figma file had to be checked and, in most cases, manually rebuilt mirrored: navigation on the other side, icons flipped, form fields, spacing, buttons, all of it. Bubble handles some of this automatically once the app language is set to Hebrew, but not consistently across every element, so I went screen by screen confirming that what displayed matched the direction people would actually read in. There's no single switch that gets an entire no-code app correctly RTL. It's a lot of small checks, repeated on every screen.

## Photos on every profile

Each memorial page has a photo grid, family members adding pictures over time the way you'd add to an album. That part is closer to what Bubble is built for: a picture uploader tied to a photo record linked to the memorial, displayed back out through a repeating group. The work here was less about the mechanism and more about making sure only approved editors could add to a page that belongs to someone who can't consent to how they're represented anymore. Same permission logic as the edit rights, applied to every photo upload.

## A feed that tells you when it matters

The home feed shows what's happening across the directory: a photo someone just added, a memorial anniversary coming up, an update to a profile you're connected to. Underneath, that's a set of backend workflows watching for dates and new records, writing feed entries that get pulled into a repeating group sorted by recency. The part worth building carefully was the anniversary reminders. Getting someone a nudge on the day that matters, rather than burying it in a wall of unrelated activity, was the actual point of the feed, not the activity logging itself.

## What building it taught me

Most of my other projects are custom-coded, so I choose the constraints. Here the constraint was chosen for me, and the job was making a real design work inside it anyway. A family tree, a permissions system, and a fully mirrored RTL layout all sound like things you'd reach for a framework to build properly. Bubble can do all three. It just takes more patience with the data model up front and more manual checking at the end than code would, because there's no compiler catching the screen where you forgot to flip the padding.

Start Life is live and shipped.
