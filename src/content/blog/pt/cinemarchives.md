---
title: 'Cinemarchives'
description: 'Apresentando um acervo digital para navegar e buscar em décadas de revistas de cinema digitalizadas.'
date: 2026-05-12
lang: 'pt'
slug: 'cinemarchives'
originalUrl: 'https://joaopabdala.substack.com/p/cinemarchives'
---

O [Cinemarchives](https://cinemarchives.com.br) é um acervo digital para navegar
e buscar em revistas de cinema digitalizadas — milhares de páginas transcritas,
pesquisáveis e agradáveis de ler.

O objetivo é simples: pegar um material que antes ficava preso em PDFs escaneados
e transformá-lo em algo que você realmente consegue *explorar*. Você pode fazer
busca full-text em toda a coleção e ir direto para a página onde um nome, um filme
ou uma frase aparece.

## Como foi construído

- **Ruby on Rails 8** para a aplicação.
- **SQLite com FTS5** para a busca full-text, em SQL puro, sobre milhares de
  páginas transcritas.
- **Hotwire/Turbo** para navegação rápida renderizada no servidor, com interface
  em **Tailwind CSS**.

É propositalmente simples, no melhor sentido: um único servidor pequeno, um único
arquivo de banco de dados e muito cuidado para que a busca pareça instantânea.

> Esta é uma introdução curta. O próximo post detalha a ideia, a arquitetura e as
> decisões de deploy.

*Este artigo foi publicado originalmente no
[Substack](https://joaopabdala.substack.com/p/cinemarchives).*
