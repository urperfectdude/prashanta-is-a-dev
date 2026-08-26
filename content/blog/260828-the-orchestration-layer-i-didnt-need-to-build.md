---
title: "The Orchestration Layer I Didn't Need to Build"
date: "2026-08-28"
description: "While building the voice AI pipeline for Tata Motors, I wrote a custom orchestration layer from scratch, then found ElevenLabs already shipped the same thing as a feature."
tags: ["technology", "career", "mindset"]
---

Working hard and picking the right problem are not the same skill, and I keep learning that the hard way.

While building the AI voice agent for Tata Motors, my job was to get a voice model to hold a real phone conversation: listen while the caller is still talking, decide when to jump in, keep the conversation state between turns, and stitch speech-to-text, the LLM, and text-to-speech into something that didn't lag or talk over people. I built that whole orchestration layer myself. Session handling, turn-taking logic, routing between every model in the pipeline, all custom, all from scratch.

Weeks in, I found out ElevenLabs already shipped a conversational voice feature that did almost exactly this out of the box. We switched the project onto it. The custom layer I'd been building got replaced by an API call.

The work itself wasn't bad. The orchestration logic worked, and the reasoning behind each piece was sound. The problem was upstream of the code. Nobody had checked, before we started building, whether this had already been solved by a vendor. We validated the engineering. We never validated that engineering was even the right thing to spend weeks on.

That's a different failure than writing bad code. Bad code you catch in review. This kind you only catch after you've already spent the time, because the system runs fine right up until someone hands you the fifteen-minute alternative.

It also wasn't the first time. Foodaspas, six months of my life at nineteen, ran into the same wall: not bad execution, a problem that was never validated in the first place.

Working hard is not evidence you're solving the right problem. It's evidence you're working hard. The two get confused constantly, because effort feels like progress while you're inside it, and only looks like a detour once someone hands you the alternative that took them fifteen minutes.

The question worth asking before the build isn't whether you can build it. It's whether someone already has, and whether you're about to spend weeks proving that.
