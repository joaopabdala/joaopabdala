---
title: 'Cinemarchives: idea, architecture, deploy'
description: 'The technical decisions behind Cinemarchives — search, a single small VM, and an aggressive edge cache.'
date: 2026-05-26
lang: 'en'
slug: 'cinemarchives-architecture'
originalUrl: 'https://joaopabdala.substack.com/p/cinemarchives-ideia-arquitetura-deploy'
---

This is the technical follow-up to the [Cinemarchives](/articles/cinemarchives)
introduction — the idea, the architecture, and how it's deployed.

## The idea

Old cinema magazines hold a surprising amount of history, but scanned PDFs are a
dead end: you can't search them, and they're painful to read. Cinemarchives
transcribes the pages and puts a real search engine in front of them.

## Search

Search is the core feature, so it gets the most attention:

- **SQLite FTS5**, queried with **raw SQL**, over thousands of transcribed pages.
- Results link directly to the page image, so you can verify the source.

SQLite's full-text index is fast and keeps the whole stack to a single file — no
separate search service to run or pay for.

## Deployment

The whole thing runs on **one 1 vCPU / 1 GB VM** on Oracle Cloud, deployed with
**Kamal** and **Docker**:

- **Cloudflare** sits in front with edge cache rules and an image CDN.
- **New Relic** (APM) for observability; **GoatCounter** for analytics.

## How it held up at launch

In its launch month (May 2026) the site served roughly:

- **~108K page views** and **~34K unique visitors** (≈650K HTTP requests),
- peaking on day one at **~31K page views / ~8K unique visitors**.

All of that on a single tiny VM — possible because **~50% of requests were served
straight from the Cloudflare edge**. The lesson that keeps proving itself: a cache
you trust lets very modest hardware go a very long way.

*This article was first published on
[Substack](https://joaopabdala.substack.com/p/cinemarchives-ideia-arquitetura-deploy).*
