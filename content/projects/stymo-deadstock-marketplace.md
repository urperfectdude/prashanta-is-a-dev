---
title: "Stymo - Deadstock Marketplace"
date: "2025-11-15"
description: "Shipped three connected platforms at Enviu that turned vendor deadstock into a live marketplace in 45 days."
image: "/projects/stymo.png"
tags: ["Marketplace", "AI Cataloging", "Product Strategy", "Enviu", "LangChain", "LangGraph", "GCP Cloud Run", "Gemini"]
---

## Why it exists

Vendors had inventory sitting in warehouses with no channel to move it and no read on what would actually sell. That part was obvious. What made it hard to fix was that warehouse ops, vendor success, and engineering were each looking at a different slice of the same problem, so nobody had shipped anything because nobody had one shared picture of the workflow.

## Mapping the workflow before building anything

I ran more than 15 vendor interviews to walk the deadstock process end to end, from the moment a vendor decides a batch isn't selling to the moment a buyer checks out. That turned into one prioritized roadmap instead of three teams building three separate tools. We shipped a consumer storefront, an admin console, and a warehouse ops tool as one connected system, not three handoffs that happened to share a database. All three run out of a single codebase, with role-based access control showing a vendor one screen, an admin another, and a warehouse worker a third, instead of maintaining three apps in parallel.

## Letting the data pick the fix

I instrumented the full funnel from browse to checkout early, so when people dropped off at checkout, the redesign came from where they actually stalled instead of a guess. The fix turned out smaller than expected: a clearer comparison at the pricing step, nothing added to the page. Checkout completion moved because the confusion went away, not because there was more to look at.

I still didn't want to lose everyone who stalled anyway, so an abandoned checkout now fires a webhook that triggers a WhatsApp or email nudge while the cart is still fresh, instead of a generic follow-up days later that nobody opens.

Vendor listing was the other bottleneck. Photographing and writing up deadstock inventory by hand doesn't scale past a few vendors. I built a cataloging pipeline on LangChain that pipes a vendor's raw photos through a vision model and comes back with a title, description, and tags, no one typing anything out by hand, which is most of why listing time dropped 60%. It runs as a containerized microservice on GCP Cloud Run, so it scales per cataloging request instead of sitting on a server sized for the busiest vendor. I wired in LangSmith to trace every generation, which is how I could catch the pipeline mislabeling a specific category of stock and fix the prompt instead of guessing at it.

## Photos and styling, done by the system

Vendor photos were still a manual shoot, which doesn't scale any better than manual listings did. I built an agentic pipeline on LangGraph that takes a raw warehouse photo, works out what kind of product it's looking at, then runs it through its own checks on background, lighting, and framing before handing it to Gemini's image model to produce a studio-grade shot. A photo that fails a check gets sent back through the pipeline instead of shipping half-done. No photographer, no lightbox, no shoot scheduled around a vendor's availability.

The stylist agent is a separate build on LangChain with its own tool use. It reads what a shopper says they like, cross-references a demand-velocity score so slower-moving stock gets surfaced ahead of whatever's already flying off the shelf, and can parse a photo of someone's existing wardrobe to recommend pieces that actually go with what they own. The last step is a virtual try-on, a diffusion inpainting model that places the recommended item onto the shopper's own photo, so they're not guessing how something looks on a stock model instead of themselves.

## What moved

45 days from kickoff to a live marketplace. 123,000 sessions in that first window. ₹374,000 in GMV and 400+ vendor items liquidated over the same 45 days. Vendor listing time down 60% once the cataloging tool took over.
