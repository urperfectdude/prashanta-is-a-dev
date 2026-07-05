---
title: "OneSherpa - AI-Native ERPNext Implementation Platform"
date: "2026-04-01"
description: "A freelance build of an AI-native SaaS that lets business owners and consultants implement ERPNext by describing what they need in plain language instead of configuring it by hand."
image: "/projects/onesherpa_overview.jpg"
tags: ["ERPNext", "LangGraph", "Multi-Agent Systems", "Claude", "Product Design", "Freelance"]
---

## Why it exists

Setting up ERPNext usually means hiring a consultant who knows the configuration screens well enough to translate what a business actually needs into the right modules, fields, and settings. OneSherpa is built on a simple bet: if you can describe what you need in plain language, across accounting, selling, buying, stock, manufacturing, projects, CRM, HR and payroll, assets, or quality, the platform should be able to configure it for you, so an owner or a consultant can self-serve instead of waiting on an implementation partner.

The flow is three steps: implement, customize, run. Stand up a working setup in one sitting, describe changes as you go instead of hunting through settings menus, then publish once you've reviewed what's about to go live.

## Re-engineering how it thinks

The first version ran its AI on a linear pipeline, one step handing off to the next with no way to loop back if a step needed more information or a user changed their answer halfway through. That falls apart fast in an implementation flow, where someone regularly needs to revisit an earlier decision once a later one changes the picture.

I re-engineered the orchestration around LangGraph instead of the linear chain, which gave the pipeline actual loop control and shared state across steps. A decision made in the questionnaire can now feed back into an earlier step without restarting the whole conversation, and the system keeps track of what's already been decided instead of re-asking.

I split the single chain into four agent roles, a retriever, a planner, an executor, and a validator, each running as its own node in the graph instead of one long function doing all four jobs. That split means I can test each role on its own, swap the model behind any one node without touching the others, and see exactly which node failed instead of guessing which part of one long chain broke. It's deployed on Google Cloud Run, so every request runs in its own isolated instance that scales up or down with load, and each node gets retries with checkpointing, so a failed step resumes from where it left off instead of restarting the whole run.

Claude Haiku is the primary model behind the agents now, which cut inference cost more than 60% against GPT-4 without giving up response quality. I also wired the whole pipeline through LangSmith, so I can trace a run node by node and catch a regression in one agent before it turns into a wrong answer somewhere downstream, which matters more each time a new ERPNext module gets onboarded into the flow.

## Redesigning and building the screens

Alongside the backend rebuild, I redesigned and built the core screens myself, front end included: the dashboard, the chat screen, a two-stage questionnaire page, and the chat screen settings page.

[Screenshot placeholder: dashboard, before and after]

[Screenshot placeholder: chat screen, before and after]

[Screenshot placeholder: two-stage questionnaire page, before and after]

[Screenshot placeholder: chat screen settings page, before and after]

I also added a floating widget chat window that sits over the implementation flow. Instead of a user staring at a long list of ERPNext options and guessing what applies to them, they can ask the widget a question mid-setup and get pointed at the specific thing to configure next, which cuts down the decision fatigue of not knowing what to implement out of everything ERPNext exposes.

## Where it stands

This is a freelance build I'm still working on. No adoption numbers yet, the work so far has been the orchestration rebuild and the screen redesigns above.
