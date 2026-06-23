---
title: 'Cinemarchives: ideia, arquitetura, deploy'
description: 'As decisões técnicas por trás do Cinemarchives — busca, uma única VM pequena e um cache de borda agressivo.'
date: 2026-05-26
lang: 'pt'
slug: 'cinemarchives-architecture'
originalUrl: 'https://joaopabdala.substack.com/p/cinemarchives-ideia-arquitetura-deploy'
---

Este é o complemento técnico da introdução ao
[Cinemarchives](/articles/cinemarchives) — a ideia, a arquitetura e como ele é
implantado.

## A ideia

Revistas antigas de cinema guardam muita história, mas PDFs escaneados são um beco
sem saída: não dá para buscar e são cansativos de ler. O Cinemarchives transcreve
as páginas e coloca um mecanismo de busca de verdade na frente delas.

## Busca

A busca é a funcionalidade central, então recebe a maior atenção:

- **SQLite FTS5**, consultado com **SQL puro**, sobre milhares de páginas
  transcritas.
- Os resultados levam direto para a imagem da página, para você conferir a fonte.

O índice full-text do SQLite é rápido e mantém toda a stack em um único arquivo —
sem um serviço de busca separado para manter ou pagar.

## Deploy

Tudo roda em **uma única VM de 1 vCPU / 1 GB** na Oracle Cloud, com deploy via
**Kamal** e **Docker**:

- **Cloudflare** na frente, com regras de cache de borda e CDN de imagens.
- **New Relic** (APM) para observabilidade; **GoatCounter** para analytics.

## Como se comportou no lançamento

No mês de lançamento (maio de 2026) o site registrou aproximadamente:

- **~108 mil visualizações** e **~34 mil visitantes únicos** (≈650 mil requisições),
- com pico no primeiro dia de **~31 mil visualizações / ~8 mil visitantes únicos**.

Tudo isso em uma única VM minúscula — possível porque **~50% das requisições foram
servidas direto pela borda do Cloudflare**. A lição que se repete: um cache
confiável faz um hardware bem modesto ir muito longe.

*Este artigo foi publicado originalmente no
[Substack](https://joaopabdala.substack.com/p/cinemarchives-ideia-arquitetura-deploy).*
