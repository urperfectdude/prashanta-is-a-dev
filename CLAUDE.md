# Prashanta's Portfolio Site — Claude Code Instructions

## Default behavior for any build / feature / content request

**Any time the user asks to build, add, redesign, or write something for this site**, route through the right specialist subagent(s) below instead of doing the work directly. Each agent file lives in `agents/`.

| Agent | File | Use for |
|---|---|---|
| `product-manager` | `agents/product-manager.md` | Scoping what a new feature/page/section is for, before anything else gets built |
| `ux-designer` | `agents/ux-designer.md` | Layout, components, states, interaction design — after PM scope, before code |
| `developer` | `agents/developer.md` | All application code: Next.js routes, components, content loaders |
| `copywriter` | `agents/copywriter.md` | Any user-facing text: blog posts, project write-ups, bios, page copy |
| `tester` | `agents/tester.md` | Final check: build/lint passes, acceptance criteria met, content scanned for AI-tells |

### How to route a request

1. **New feature, page, or section** (e.g. "add a filter to the projects page"):
   `product-manager` → `ux-designer` → `developer` → `copywriter` (if new text needed) → `tester`

2. **New or edited blog post / project write-up / bio copy** (no new functionality):
   `copywriter` directly. Skip the rest unless the content reveals a scoping question, in which case loop in `product-manager`.

3. **Pure code change with no new user-facing surface** (refactor, bug fix, dependency bump):
   `developer` → `tester`. Skip PM/UX — they're for things a visitor actually sees/uses.

4. **Visual/design tweak only** (spacing, color, layout on an existing page):
   `ux-designer` → `developer` → `tester`.

Spawn each subagent with the Agent tool, in order. Report each agent's output to the user before moving to the next step. Stop and surface blockers immediately if any agent reports **Blocked**.

### When NOT to use the agent hierarchy

- Read-only questions about the codebase or content → answer directly.
- Trivial fixes: typo, broken link, one-line config change → just do it.
- The user explicitly names a single agent ("just have the copywriter look at this") → run only that one.

---

## Hard rules that apply regardless of which agent is active

- **No em dashes anywhere in published copy.** No exceptions.
- **No AI-sounding phrasing** in any user-facing text — see the banned-word list in `agents/copywriter.md`. This applies even to small copy changes a non-copywriter agent might touch (e.g. a button label written by `developer`) — when in doubt, route the text through `copywriter`.
- **One feature at a time.** This is a single-maintainer site. Don't parallelize unrelated features in the same change.
- **Reuse before you build.** Check `components/ui/` for an existing primitive before adding a new component or dependency.
- **Static export.** This site builds to a static export (see `out/`, `next.config.ts`). Don't introduce patterns that require a persistent backend or server-side session — there isn't one, and there shouldn't be one.

---

## Project context

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS + Radix UI / shadcn-style primitives
- **Content:** Markdown files in `content/{blog,projects,work,education}/`, parsed with `gray-matter`, rendered with `react-markdown`
- **Components:** Reusable primitives in `components/ui/` (accordion, avatar, badge, button, card, carousel, input, separator, sheet, textarea)
- **Routes:** `app/{projects,education,blog,work,api}/`
- **No database, no backend service.** Content lives in markdown in the repo. If a request seems to need persistent server state, that's a sign to revisit scope with `product-manager` before reaching for infra.
- **Analytics:** PostHog is used on at least one linked project (the Osho Discourse Library); check before assuming it's wired into this site itself.

## Audience

Two distinct visitor types read this site — keep both in mind when scoping or writing anything:
1. Recruiters/clients evaluating credibility (project pages, work history, technical writing)
2. Personal readers following the blog (life essays, reflections)

Don't blur the two. A feature or tone that serves one doesn't automatically serve the other.
