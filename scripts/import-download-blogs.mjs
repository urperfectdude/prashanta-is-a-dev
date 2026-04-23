#!/usr/bin/env node
// One-off: turns Download/ tree .txt files into content/blog .md posts.
// Publish dates start 2024-01-02; each next post + deterministic 15–20 day gap.

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const downloadDir = path.join(root, 'Download')
const outDir = path.join(root, 'content/blog')

const FILENAME_RE = /^(.+)_(\d{6})_(\d{6})\.txt$/i

function walkTxt(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name)
    if (name.isDirectory()) walkTxt(full, acc)
    else if (name.isFile() && name.name.toLowerCase().endsWith('.txt')) acc.push(full)
  }
  return acc
}

function slugify(s) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'note'
}

/** 15–20 inclusive, stable per seed */
function gapDays(seed) {
  const h = crypto.createHash('sha256').update(seed).digest()
  return 15 + h[0] % 6
}

function parseFilename(absPath) {
  const base = path.basename(absPath)
  const m = base.match(FILENAME_RE)
  if (!m) {
    return {
      title: base.replace(/\.txt$/i, '').trim(),
      yymmdd: null,
    }
  }
  const title = m[1].trim()
  const yymmdd = m[2]
  return { title, yymmdd }
}

function yymmddToSortKey(yymmdd) {
  if (!yymmdd || yymmdd.length !== 6) return '999999'
  const yy = parseInt(yymmdd.slice(0, 2), 10)
  const year = yy >= 70 ? 1900 + yy : 2000 + yy
  const mm = yymmdd.slice(2, 4)
  const dd = yymmdd.slice(4, 6)
  return `${year}${mm}${dd}`
}

function folderTag(relFromDownload) {
  const top = relFromDownload.split(path.sep)[0]?.toLowerCase() || 'journal'
  const map = {
    career: 'career',
    'deep thoughts': 'deep-thoughts',
    others: 'others',
    'random feelings': 'random-feelings',
    'self brand': 'self-brand',
  }
  return map[top] || 'journal'
}

function toMarkdownBody(raw) {
  const text = raw.replace(/\r\n/g, '\n').trim()
  if (!text) return '_Empty note._'
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)
  return blocks.map((b) => b.split('\n').join('\n')).join('\n\n')
}

function descriptionFrom(raw) {
  const one = raw.replace(/\s+/g, ' ').trim()
  if (one.length <= 158) return one || 'Personal notes.'
  return `${one.slice(0, 155)}...`
}

function addDays(isoDateStr, days) {
  const d = new Date(`${isoDateStr}T12:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

const files = walkTxt(downloadDir).sort((a, b) => {
  const pa = path.relative(downloadDir, a)
  const pb = path.relative(downloadDir, b)
  const ka = yymmddToSortKey(parseFilename(a).yymmdd)
  const kb = yymmddToSortKey(parseFilename(b).yymmdd)
  if (ka !== kb) return ka.localeCompare(kb)
  return pa.localeCompare(pb)
})

const usedSlugs = new Set()
let publishDate = '2024-01-02'

for (let i = 0; i < files.length; i++) {
  const abs = files[i]
  const rel = path.relative(downloadDir, abs)
  const { title, yymmdd } = parseFilename(abs)
  let slug = slugify(title)
  if (yymmdd) slug = `${slug}-${yymmdd}`
  let candidate = slug
  let n = 2
  while (usedSlugs.has(candidate)) {
    candidate = `${slug}-${n++}`
  }
  slug = candidate
  usedSlugs.add(slug)

  const raw = fs.readFileSync(abs, 'utf8')
  const body = toMarkdownBody(raw)
  const description = descriptionFrom(raw)
  const tags = [folderTag(rel)]

  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: "${publishDate}"`,
    `description: ${JSON.stringify(description)}`,
    `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    '---',
    '',
    body,
    '',
  ].join('\n')

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, `${slug}.md`), fm, 'utf8')

  if (i < files.length - 1) {
    publishDate = addDays(publishDate, gapDays(`${slug}|${i}|${rel}`))
  }
}

console.log(`Wrote ${files.length} posts to ${outDir}`)
