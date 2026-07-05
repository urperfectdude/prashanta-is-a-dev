---
title: "EasyV - Multiplatform EV SAAS for Fleet Operators"
date: "2024-03-01"
description: "Founding engineer on a SaaS platform for EV fleet operations, built mostly on Bubble with Kafka streaming telemetry underneath."
image: "/projects/easyv-ev-saas.jpg"
tags: ["Bubble", "IoT", "Google Cloud Functions", "AWS Kafka", "Mixpanel", "Algolia", "Python", "GPT-4o"]
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

## Bridging fleet data and bank credit

Somewhere in all that telemetry was a problem nobody on the finance side could solve. Banks had no clean way to underwrite EV fleet financing, because the data that actually described a fleet's risk was sitting in our dashboards and never reached them in a form they could use. So I built CredOps, a linear AI pipeline in Python running on GPT-4o. It ingests EV fleet telemetry, the same data feeding the monitoring dashboard, and turns it into a structured creditworthiness report, something a bank's underwriting team can read the way they'd read a CIBIL score.

The pipeline is linear on purpose. Telemetry goes in, GPT-4o scores it against a fixed set of criteria, and a structured report comes out with a score and the numbers behind it. No agent deciding what to check next, no loop, just a fixed path from raw data to a number a loan officer can act on. Banks don't want a black box here, they want a report they can point to.

Before this, EV fleet financing was stuck in a gap. A fleet operator with hundreds of vehicles and years of real usage data had no way to turn any of that into a loan, because there was no equivalent of a personal credit score for a fleet. CredOps gives them one.

## What I'd say to another developer about it

Bubble gets dismissed fast by engineers, and I get why. But the lesson here wasn't "no-code is secretly great." It was that you don't need everything to be custom-built to ship something real. You need to know exactly which parts of the system actually need engineering rigor, and put your effort there. The Kafka-to-Postgres pipeline and the design system were that part. The product layer just needed to be good enough and fast to iterate on.
