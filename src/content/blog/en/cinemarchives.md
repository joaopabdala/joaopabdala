---
title: 'Cinemarchives'
description: 'Introducing a digital archive for browsing and searching decades of digitized cinema magazines.'
date: 2026-05-12
lang: 'en'
slug: 'cinemarchives'
originalUrl: 'https://joaopabdala.substack.com/p/cinemarchives'
---

[Cinemarchives](https://cinemarchives.com.br) is a digital archive for browsing
and searching digitized cinema magazines — thousands of transcribed pages, made
searchable and pleasant to read.

The goal is simple: take material that used to be locked away in scanned PDFs and
turn it into something you can actually *explore*. You can full-text search across
the whole collection and jump straight to the page where a name, a film, or a
phrase appears.

## What it's built with

- **Ruby on Rails 8** for the application.
- **SQLite with FTS5** for full-text search, written in raw SQL, over thousands
  of transcribed pages.
- **Hotwire/Turbo** for fast, server-rendered navigation, with a **Tailwind CSS**
  interface.

It's deliberately boring in the best way: a single small server, a single
database file, and a lot of care put into making search feel instant.

> This is a short introduction. The follow-up post goes into the idea,
> architecture, and deployment decisions in detail.

*This article was first published on
[Substack](https://joaopabdala.substack.com/p/cinemarchives).*
