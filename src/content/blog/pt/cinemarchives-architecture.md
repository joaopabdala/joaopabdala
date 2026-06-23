---
title: 'Cinemarchives: ideia, arquitetura, deploy'
description: '8 mil visitantes, 321 mil requests no primeiro dia — só com SQLite, Cloudflare e uma VPS de 1 core e 1 GB de RAM.'
date: 2026-05-29
lang: 'pt'
slug: 'cinemarchives-architecture'
cover: '/joaopabdala/articles/cinemarchives-architecture/cover.png'
originalUrl: 'https://joaopabdala.substack.com/p/cinemarchives-ideia-arquitetura-deploy'
---

Como alguém que gosta de cinema sempre vou atrás de ler mais sobre o assunto. Ao se aprofundar, é inevitável não se deparar com algumas revistas historicamente importantes, como *Cahiers du Cinéma*, *Présence du Cinéma*, *Cinema & Film*, *Film Culture*, etc... afinal a tradição crítica do cinema vem principalmente dessas revistas.

O principal obstáculo para se chegar até elas é que, em sua esmagadora maioria, elas só existem como arquivos PDF, em versões escaneadas ou fotografadas. A leitura, então, é dificultada; ficar dando zoom-in e out em PDF é uma tarefa chata, realizar pesquisas nelas (dar um ctrl+f) é algo fora de questão, pois a maioria não possui OCR, e quando possui não é de tão boa qualidade.

Há um bom tempo eu tinha essa ideia de criar um acervo digital com essas revistas, de forma que facilite a leitura e possibilite realizar pesquisas entre elas.

![Página da revista ao lado de sua transcrição](/joaopabdala/articles/cinemarchives-architecture/img-1.png)

![Interface de leitura do acervo](/joaopabdala/articles/cinemarchives-architecture/img-2.png)

## Escolha da stack

Escolhi construir o site com Ruby on Rails, pelo simples motivo de que um amigo precisava de ajuda em um projeto em Rails, ao mesmo tempo eu queria aprender algo novo e sair um pouco da minha stack principal em PHP.

## Economia

Por ser um acervo digital, sem qualquer pretensão de arrecadar dinheiro, uma das coisas principais para se pensar na construção é a economia. O custo de manutenção deve ser o mínimo possível, idealmente zero.

## Read-only por design

Sendo um acervo digital que será alimentado somente por mim, não vi sentido em fazer páginas de admin ou de registro de usuários. Isso foi uma decisão importante, pois acabou por moldar toda a arquitetura do projeto, fazendo com que eu dividisse o projeto em dois repositórios: o site/web e o de transcrições.

Após ler um [artigo do Fabio Akita](https://akitaonrails.com/2026/02/20/sqlite-kamal-deploy-de-rails-sem-drama-bastidores-do-the-m-akita-chronicles) e ver um [vídeo do DHH sobre SQLite](https://www.youtube.com/watch?v=0rlATWBNvMw), decidi que usar SQLite em produção seria a melhor opção, pelo menos em primeiro momento (devo dizer que, depois de ter colocado tudo no ar, não pretendo mudar isso por um bom tempo).

Optar pelo SQLite cortou o custo de ter um banco de dados, junto com isso decidi armazenar as imagens localmente, servindo-as do próprio disco.

## Repositório de transcrições

O repositório de transcrições foi mantido separado por dois motivos. 1) as transcrições são permanentes: não faria sentido eu criar uma página de admin somente para conseguir alimentar o meu banco de dados; 2) isso potencializa o uso das transcrições para outras coisas que não somente o site, posso, por exemplo: formatá-las em texto puro, transformar em ebook ou PDF, abrir o repositório publicamente, ou subir tudo no archive.org.

A pipeline para realizar as transcrições foi a seguinte: transformar o PDF em imagens → realizar o OCR → salvar a transcrição/OCR em JSON → importar as transcrições de forma organizada em um arquivo .db do SQLite → publicar o .db como release no GitHub.

![Pipeline de transcrição](/joaopabdala/articles/cinemarchives-architecture/img-3.png)

### Transcrições

Não possuindo uma boa GPU para rodar uma ferramenta de OCR localmente, tive de optar por soluções externas, e esse foi o único custo real na construção do site.

Em primeiro momento usei Gemini e OpenAI para realizar o OCR. As ferramentas de AI possuem ótima capacidade de identificar textos, e junto com a capacidade de _thinking_ conseguem identificar o que seriam títulos, itálicos, negritos, assunto, tipo de artigo, notas de rodapé, etc... Porém, seu custo foi muito mais alto do que o esperado, cerca de 1 dólar por 100 páginas.

Acabei migrando para o MistralOCR, ferramenta dedicada em OCR. Perdi alguma flexibilidade em coletar dados do texto, negritos e itálicos não são mais possíveis, ainda consigo capturar alguns títulos e subtítulos (apesar da maioria deles não ser detectados), mas ganhei em custo: 1 dólar por mil páginas.

A velocidade com que ele processa as páginas é muito maior comparada com as AIs. Se eu enviar um batch com 100 páginas para o Mistral ele processa elas em menos de um minuto, coisa que demoraria uns 10 minutos se eu enviasse página a página ao Gemini/OpenAI, ou até 24h se enviado via batch.

Outra vantagem da ferramenta nativa em comparação às AIs é que não há falhas no processamento, alucinações nas transcrições, retorno de JSONs quebrados, e por aí vai.

As transcrições são salvas em um arquivo JSON que possui as informações de título, subtítulo e o texto dividido em parágrafos. Para realizar a pesquisa nos textos esses campos foram adicionados em uma tabela virtual FTS5 no banco de dados.

As imagens que são extraídas dos PDFs são as mesmas exibidas no site, lado a lado com as transcrições. Elas são mapeadas de acordo com o nome da revista, número de edição e número da página, então ficam hospedadas em um R2, catalogadas por pastas de revista e edição. O R2 é utilizado somente para armazenar as imagens, elas serão baixadas e servidas localmente para cortar gastos.

## Site

O site foi feito usando Rails como monólito, sem framework frontend, somente Hotwire e Stimulus resolvem 99% dos problemas, sem muito segredo aí.

### Leitor de páginas

A ideia principal do site é apresentar a transcrição junto a imagem da página transcrita lado a lado. Assim se tem a facilidade da leitura transcrita e ao mesmo tempo o design original da revista não é perdido. Isso também é útil para identificar transcrições erradas.

Para mostrar cada página os parágrafos salvos em JSON são parseados, assim o texto não fica sendo só um grande parágrafo desorganizado.

Se pode dar zoom na página original e também vê-la em tela cheia. Foram adicionados shortcuts nas setas do teclado, direita e esquerda para ir para a próxima página ou página anterior, cima e baixo para navegar pelo texto.

### Bancos de dados

Tenho dois bancos de dados, ambos SQLite, um com os dados das revistas, somente para leitura, e outro, o padrão da aplicação, com estatísticas.

Como as transcrições são geradas automaticamente elas são sempre passíveis de erros. Criei uma opção para reportar transcrições erradas, elas são salvas no segundo DB, que é backupeado com VACUUM INTO a cada uma hora.

### Busca

Para realizar as pesquisas no acervo a tabela virtual é usada com algorítmo de ordenação BM25 (o mesmo usado em elastic search), distribuindo o peso da pesquisa por títulos, subtítulos e textos, mostrando os resultados mais interessantes por primeiro. Há a opção de filtrar por revista e por edição de revista.

![Resultados de busca no acervo](/joaopabdala/articles/cinemarchives-architecture/img-4.png)

### URLs permanentes

Como o banco de dados de revistas é gerado de forma independente do site principal, eu corria o risco de haver uma dessincronia entre updates do banco, afetando o acesso por links compartilhados, ou reports de erros de transcrição.

Para resolver isso, ao gerar o banco de dados é seguida uma ordem pré-determinada, para que não haja mudança de ordem de IDs no import. Mas também foi implementada uma estratégia de URL permanente, usando slugs (apelidos) gerados pelo script de importação. Assim, em vez de usar IDs fixos, temos URLs humanizadas como:

`https://cinemarchives.com.br/magazines/movie/issues/n-8-cinema-verite/pages/2`

### Estatísticas

Para saber as rotas mais acessadas e dados de origem uso GoatCounter self hosted, para logs e estatísticas uso New Relic, que possui 100GB de graça.

## Deploy

A Oracle possui VPSs *always free* com hardware limitado de 1 core e 1GB de RAM. Apesar da limitação do hardware é uma opção de graça para o projeto.

O deploy é feito com Kamal, ferramenta extremamente útil e simples de usar. O Kamal builda uma imagem Docker da sua branch e sobe ela, no meu caso, no GitHub Packages. Depois disso ele acessa a sua VPS, baixa a imagem, levanta uma nova instância com essa imagem, enquanto ainda deixa a antiga no ar, só matando-a depois que a nova está pronta, assim não se tem downtime.

Para fazer tudo isso o Kamal possui o kamal-proxy, seu próprio proxy reverso, assim você não precisa adicionar Traefik por conta própria. Ele possui suporte a acessórios, que é onde o GoatCounter vai ser subido, e tudo relacionado ao deploy fica no `deploy.yml`.

![Configuração de deploy com Kamal](/joaopabdala/articles/cinemarchives-architecture/img-5.png)

Além disso ele possui suporte a scripts que rodam em várias etapas do deploy, como pre-deploy e post-deploy. Você pode passar chaves do próprio sistema de secrets dele.

No meu caso temos um script de post-deploy que roda quatro comandos rake.

`magazine:fetch`

Acessa o repositório de transcrições no GitHub e baixa o último release do banco de revistas, substituindo o antigo.

`images:sync`

Primeiramente lista todas as imagens do R2, compara com as que já existem em disco, e baixa as que estão ausentes.

`images:thumbnails`

Gera thumbnails das imagens novas.

`cloudflare:purge`

Reseta o cache da Cloudflare.

Por se tratar de um site read-only e possuir uma VPS limitada, a Cloudflare é uma grande aliada para a sua eficiência. Somente o cache de borda, que faz cache das páginas HTML, servindo elas sem que o request do usuário tenha de bater no servidor, salva um custo enorme de processamento.

## Divulgação e primeiro dia de tráfego

O site é direcionado para a comunidade cinéfila ao redor do mundo, possuindo um acervo que embarca múltiplos idiomas, inglês, italiano, francês e português.

Fiz um tweet no X divulgando o site. Usar o X foi uma ótima estratégia, além de atingir facilmente o público alvo, a sua feature recente de tradução automática usando Grok fez com que o site chegasse em diversos países, como: Vietnã, Coreia do Sul, Japão, Estados Unidos, Espanha, França e Reino Unido.

Ao fim das primeiras 24h o tweet já contava com mais de mil retweets, o que demonstra o interesse da comunidade pelo projeto. Até o momento (29/05/2026) o tweet conta com 284 mil impressões, 2110 retweets e mais de 10 mil curtidas.

![Repercussão do anúncio no X](/joaopabdala/articles/cinemarchives-architecture/img-6.png)

Isso fez com que o site tivesse quase 8 mil visitantes em seu primeiro dia, contabilizando 321 mil requests, sendo que 198 mil foram cacheados pela Cloudflare. Isso demonstra que a Cloudflare conseguiu segurar requests o suficiente para que o SQLite trabalhasse com folga, mesmo em uma máquina com recursos limitados, sendo uma ótima estratégia para desempenho e escalabilidade.

![Estatísticas de tráfego do primeiro dia](/joaopabdala/articles/cinemarchives-architecture/img-7.png)

![Distribuição de requests e cache](/joaopabdala/articles/cinemarchives-architecture/img-8.png)

![Origem geográfica dos acessos](/joaopabdala/articles/cinemarchives-architecture/img-9.png)

## Conclusão

Atualmente o site possui 5 revistas diferentes, totalizando 72 edições, com 4915 páginas transcritas.

O custo de manutenção é zero. As imagens self hosted, até o momento, só pesam 1,75GB, tendo 34GB livres na VPS. O banco de dados com as transcrições pesa somente 68,9MB.

Os únicos custos tidos com o site foram a de compra do domínio, R$ 45,00, e de transcrições com OCR, que totalizaram algo em torno de R$ 60,00.

Ao fim, aprendi bastante sobre Rails, coloquei um site no ar pela primeira vez, e o que era um problema pessoal acabou virando um acervo de interesse para muita gente.

O site está no ar em [cinemarchives.com.br](https://cinemarchives.com.br/).
