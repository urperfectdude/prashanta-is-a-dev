---
title: "EasyV - Multiplatform EV SAAS for Fleet Operators"
date: "2024-03-01"
description: "Founding engineer on a SaaS platform for EV fleet operations, built mostly on Bubble with Kafka streaming telemetry underneath."
image: "/projects/easyv-ev-saas.jpg"
tags: ["Bubble", "IoT", "Google Cloud Functions", "AWS Kafka", "Mixpanel", "Algolia"]
---

## Why it exists

EasyV gives EV fleet operators a live view of their vehicles: battery health, location, performance, all the telemetry coming off the hardware in real time. This is the same EasyV from my time at Driveo Electric. I was one of six founding engineers, in before any of it existed, and built across product design, frontend, and backend to get it into production.

## The stack is unusual on purpose

Most of the user-facing app runs on Bubble. That sounds odd for something handling live IoT data at scale, but it worked because the parts that actually needed raw performance weren't built in Bubble at all. AWS Kafka handles the telemetry ingestion, and Google Cloud Functions sit right behind it processing and reshaping that stream before it lands in its own Postgres database, separate from anything Bubble touches. We built APIs on top of that Postgres instance specifically to pull processed data back into the product. So Bubble was never holding the IoT pipeline together, it was just the canvas rendering what a proper backend had already chewed through.

The platform sits around 200K workload units now. Getting there without falling over meant being deliberate about which algorithms ran where, since Bubble punishes you quickly if you push heavy computation into it.

## What I actually built

I integrated Mixpanel and Algolia myself. Mixpanel went into eight product flows, not as an afterthought but as the thing that told us what to build next, since none of us were guessing about usage anymore. Algolia handles search across fleet and vehicle records, which matters more than it sounds like once a fleet operator has hundreds of vehicles and needs to find one in seconds, not scroll.

The real-time monitoring dashboard was the centerpiece. ML-driven alerting on top of the telemetry stream cut vehicle downtime by 30% and got issue resolution moving 50% faster, because operators stopped finding out about problems after the fact.

I also spent time on a reusable design system inside Bubble, which isn't something people usually associate with no-code tools. It cut our development cycles by 30%, mostly by killing the habit of rebuilding the same component five different ways across the app.

## What I'd say to another developer about it

Bubble gets dismissed fast by engineers, and I get why. But the lesson here wasn't "no-code is secretly great." It was that you don't need everything to be custom-built to ship something real. You need to know exactly which parts of the system actually need engineering rigor, and put your effort there. The Kafka-to-Postgres pipeline and the design system were that part. The product layer just needed to be good enough and fast to iterate on.
