---
title: "Loop Engineering: Designing Agent Loops Instead of Prompting Them"
date: "2026-06-07"
description: "Coding agents are moving from turn-by-turn prompting to designed loops built from automations, worktrees, skills, connectors, and sub-agents, held together by a state file."
tags: ["ai", "technology", "product", "mindset"]
---

Peter Steinberger said it plainly: "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."

Boris Cherny, who leads Claude Code at Anthropic, said something close enough that it stopped feeling like coincidence: "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops."

Two people, two different companies, same sentence structure. That usually means the shift is real and not just a personal habit.

I'm still skeptical of parts of this, and you have to watch token cost closely because usage swings wildly depending on whether you're token rich or token poor. But the underlying claim is worth taking seriously, so here's what it actually means.

## The distinction that matters

For about two years, using a coding agent meant writing a good prompt, sharing enough context, and reading what came back before typing the next thing. You held the tool the entire time, one turn after another. That part is what both of them are saying is ending.

The alternative isn't a better prompt. It's a small system that finds the work, hands it to the agent, checks the result, records what got done, and decides the next step, without you touching any single turn. You build the system once. The system does the prompting from then on.

There's a related idea worth naming so it doesn't get confused with this one: agent harness engineering, the work of designing the environment a single agent runs inside, the factory model that produces the software. Loop engineering sits one floor above the harness. Same building. It just runs on a timer, spawns its own helpers, and feeds itself.

What actually surprised me is that this stopped being a bash-scripting hobby. A year ago, building a loop meant writing your own pile of shell scripts and maintaining that pile forever, alone. Now the pieces ship inside the products themselves. Steinberger's list maps onto Codex almost exactly, and then maps onto Claude Code almost as well. Once you see that the shape is identical across both tools, you stop arguing about which one is better and start designing a loop that survives being moved between them.

## Five primitives, one memory

A loop needs five moving parts and one place to remember what happened.

1. **Automations** that fire on a schedule and do discovery and triage without you.
2. **Worktrees** so two agents working at once don't overwrite each other.
3. **Skills** that write down the project knowledge the agent would otherwise guess at.
4. **Plugins and connectors** that plug the agent into the tools you already use.
5. **Sub-agents** so the one that has the idea isn't the one that checks it.
6. **State**, the sixth thing, the memory that outlives any single run.

Both products have all five now. The names differ a little, the capability doesn't.

<table>
<thead>
<tr>
<th>Primitive</th>
<th>Job in the loop</th>
<th>Codex app</th>
<th>Claude Code</th>
</tr>
</thead>
<tbody>
<tr>
<td>Automations</td>
<td>Discovery and triage on a schedule</td>
<td>Automations tab: pick project, prompt, cadence, environment; results land in a Triage inbox; /goal for run-until-done</td>
<td>Scheduled tasks and cron, /loop, /goal, hooks, GitHub Actions</td>
</tr>
<tr>
<td>Worktrees</td>
<td>Isolate parallel work</td>
<td>Built-in worktree per thread</td>
<td>git worktree, --worktree flag, isolation: worktree on a subagent</td>
</tr>
<tr>
<td>Skills</td>
<td>Codify project knowledge</td>
<td>Agent Skills (SKILL.md), invoked with $name or implicitly</td>
<td>Agent Skills (SKILL.md)</td>
</tr>
<tr>
<td>Plugins / connectors</td>
<td>Connect to your existing tools</td>
<td>Connectors (MCP) plus plugins for distribution</td>
<td>MCP servers plus plugins</td>
</tr>
<tr>
<td>Sub-agents</td>
<td>Ideate and verify separately</td>
<td>Subagents defined as TOML files in .codex/agents/</td>
<td>Task subagents in .claude/agents/, plus agent teams</td>
</tr>
<tr>
<td>State</td>
<td>Track what's done and what's next</td>
<td>Markdown, or Linear through a connector</td>
<td>Markdown (AGENTS.md, progress files), or Linear through MCP</td>
</tr>
</tbody>
</table>

### Automations: the heartbeat

Automations are what turn a loop into an actual loop, rather than a run you happened to do once. In Codex you set one up in the Automations tab: pick the project, the prompt it runs, how often, and whether it runs on your local checkout or a background worktree. Runs that find something land in a Triage inbox. Runs that find nothing archive themselves quietly, which is a small detail that matters more than it sounds like it should. OpenAI reportedly uses these internally for the boring recurring stuff: daily issue triage, summarizing CI failures, writing commit briefings, hunting for bugs someone introduced the week before. An automation can also call a skill directly, so the recurring job stays maintainable. You fire $skill-name instead of pasting a wall of instructions into a schedule nobody will ever go back and update.

Claude Code reaches the same place through scheduling and hooks instead of a dedicated tab. You run a prompt or command on an interval with /loop, schedule a cron task, fire shell commands at points in the agent's lifecycle with hooks, or push the whole thing to GitHub Actions if you want it running after you close the laptop. Same idea: define an autonomous task, give it a cadence, let the findings come to you instead of going around checking on things yourself.

### /loop and /goal: the stopping condition as a primitive

There's a second, in-session primitive worth knowing separately, and it's the one closest to what this whole post is actually about. /loop re-runs on a cadence. /goal keeps going until a condition you wrote becomes true, and after every turn a separate, smaller model checks whether that condition holds. The agent that wrote the code isn't the one grading whether it's done. You give it something like "all tests in test/auth pass and lint is clean," then walk away.

Codex has the equivalent, also named /goal: it keeps working across turns until a verifiable stopping condition is met, with pause and resume built in. Same primitive, two different products, which by now is the pattern for this entire post.

This is the part of the loop that decides when to stop bothering you. Everything else in the loop is what acts once work has been found.

### Worktrees: keeping parallel from becoming chaos

The moment you run more than one agent, files start colliding, and that collision is the failure mode. Two agents editing the same file is the same headache as two engineers committing to the same lines without talking to each other first. A git worktree fixes this at the root: it's a separate working directory on its own branch, sharing the same repo history, so one agent's edits physically cannot touch another agent's checkout.

Codex builds worktree support in directly, so several threads can hit the same repo at once without bumping into each other. Claude Code gives you the same isolation through git worktree, a --worktree flag to open a session in its own checkout, and an isolation: worktree setting on a subagent so each helper gets a fresh checkout that cleans itself up afterward. Worktrees remove the mechanical collision. They don't raise your ceiling. Your review bandwidth still decides how many of these you can actually run, not the tool.

### Skills: stop re-explaining your project every time

A skill is how you stop re-explaining the same project context every session. Both tools use the same format: a folder with a SKILL.md inside, holding instructions and metadata, plus optional scripts, references, and assets. Codex runs a skill when you invoke it with $ or /skills, or on its own when your task description matches the skill's description, which is why a boring, precise description beats a clever one. Claude Code works the same way.

Skills are also where intent stops costing you the same tax on every run. An agent starts every session cold, and it will fill any gap in your intent with a confident guess. A skill is that intent written down externally: the conventions, the build steps, the "we don't do it that way because of what happened last time." Written once, read every run. Without skills, the loop re-derives your whole project from zero each cycle. With them, the loop compounds instead of restarting.

Worth keeping straight: the skill is the authoring format, the plugin is how you ship it. When you want to share a skill across repos, or bundle several together, you package them as a plugin. True in Codex. True in Claude Code.

### Plugins and connectors: touching your real tools

A loop that can only see the filesystem is a small loop. Connectors, built on MCP, let the agent read your issue tracker, query a database, hit a staging API, drop a message in Slack. Codex and Claude Code both speak MCP, so a connector written for one usually works in the other with no changes. Plugins bundle connectors and skills together so a teammate installs your setup in one step instead of rebuilding it from memory.

This is the actual difference between an agent that tells you "here's the fix" and a loop that opens the pull request, links the ticket, and pings the channel once CI turns green, on its own. The connectors are what let the loop act inside your real environment instead of describing what it would do if it could.

### Sub-agents: keep the maker away from the checker

The single most useful structural choice in a loop is splitting the one who writes from the one who checks. The model that wrote the code is far too generous when grading its own homework. A second agent, with different instructions and sometimes a different underlying model, catches what the first one talked itself into believing.

Codex only spawns subagents when asked, runs them concurrently, then folds the results into one answer. You define your own agents as TOML files in .codex/agents/, each with a name, description, instructions, and an optional model and reasoning effort, so your security reviewer can run a strong model at high effort while your explorer runs something fast and read-only. Claude Code does the same through subagents in .claude/agents/ and agent teams that pass work between each other. The common split in both: one agent explores, one implements, one verifies against the spec.

This matters specifically inside a loop because the loop runs while you're not watching. A verifier you actually trust is the only reason you're able to walk away in the first place. Subagents cost more tokens, since each one does its own model and tool calls, so spend them where a second opinion is worth paying for. This is also, functionally, what /goal is doing under the hood: a fresh model decides whether the loop is done instead of the model that did the work. The maker-checker split, applied to the stop condition itself.

### State: the memory that ties it together

The sixth thing isn't a feature so much as a habit. A markdown file, a Linear board, anything that lives outside the single conversation and holds what's done and what's next. It sounds too plain to matter. But it's the same trick every long-running agent depends on: the model forgets everything between runs, so the memory has to live on disk, not in the context window. The agent forgets. The repo doesn't.

Without state, every run of the loop starts from zero and rediscovers the same three problems it already solved yesterday. With it, tomorrow's run picks up exactly where today's left off. State is what makes the other five primitives into a loop instead of five disconnected tricks.

## What one loop looks like

Put the six pieces together and a single thread becomes a small control panel. Here's one shape it can take.

An automation runs every morning against the repo. Its prompt calls a triage skill that reads yesterday's CI failures, the open issues, and the recent commits, then writes the findings into a state file. For each finding worth acting on, the loop opens an isolated worktree and sends a sub-agent to draft the fix, then a second sub-agent to review that draft against the project's skills and existing tests.

Connectors let the loop open the pull request and update the ticket. Anything the loop can't resolve lands in the triage inbox for you. The state file is the spine of the whole thing: it remembers what was tried, what passed, what's still open, so tomorrow's run doesn't start from nothing.

Notice what happened there. You designed this once. You didn't prompt a single one of those steps.

## What the loop still doesn't do for you

The loop changes the work. It doesn't remove you from it. Three problems get sharper as the loop gets better, not easier.

Verification is still on you. A loop running unattended is also a loop making mistakes unattended. The whole reason to split the verifier sub-agent from the maker is to make the loop's "it's done" mean something, and even then, done is a claim, not a proof. Shipping code you actually confirmed works is still your job, not the loop's.

Your understanding still rots if you let it. Call it comprehension debt, or the more familiar name for skipping your own homework, cognitive surrender: the faster the loop ships code you never personally wrote, the wider the gap between what exists in the repo and what you actually carry in your head. Some people describe the cost of running several of these loops at once as an orchestration tax, or the buildup as intent debt. Different names, same bill, and it comes due at the worst possible time, usually during an incident.

The comfortable posture is the dangerous one. Once the loop runs itself, it's tempting to stop having an opinion and just accept whatever comes back. Designing the loop is the cure when you do it with judgment. It's the accelerant when you do it to avoid thinking. Same action, opposite result, and the loop has no way of telling which one you're doing.

Two people can build the identical loop and get opposite outcomes. One uses it to move faster on work they already understand deeply. The other uses it to avoid understanding the work at all. The loop can't tell those two people apart. It just runs.

That's what makes loop design harder than prompt engineering, not easier. Cherny's point was never that the work got simpler. It's that the point where your effort actually matters moved, from what you type into the agent to what you build around it. Build the loop like someone who intends to stay the engineer, not just the person who pressed go.
