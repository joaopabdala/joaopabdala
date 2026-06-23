import type { Locale } from './site';

type L10n = Record<Locale, string>;
type L10nList = Record<Locale, string[]>;

export const resumePdf: Record<Locale, string> = {
  en: 'resume-en.pdf',
  pt: 'curriculo-pt.pdf',
};

export interface Job {
  role: L10n;
  company: string;
  period: L10n;
  context: L10n;
  bullets: L10nList;
}

export const experience: Job[] = [
  {
    role: { en: 'Full Stack Developer', pt: 'Desenvolvedor Full Stack' },
    company: 'Palinha',
    period: { en: 'Oct 2025 – Jun 2026', pt: 'Out 2025 – Jun 2026' },
    context: {
      en: 'Technology company focused on booking musicians for private events and bars.',
      pt: 'Empresa de tecnologia focada em contratação de músicos para eventos privados e bares.',
    },
    bullets: {
      en: [
        'Built the backend API in PHP/Laravel and the frontend with Blade.',
        'Integrated Google Calendar to help musicians organize their schedules.',
        'Built a real-time rating system for venues and the musicians they hire, including on-site tipping for performing musicians.',
      ],
      pt: [
        'Desenvolvimento de API backend em PHP/Laravel e frontend com Blade.',
        'Integração com Google Calendar para facilitar a organização dos músicos.',
        'Sistema de avaliação em tempo real para casas de entretenimento e para os músicos contratados, com a possibilidade de gorjeta para músicos tocando no local.',
      ],
    },
  },
  {
    role: { en: 'Full Stack Developer', pt: 'Desenvolvedor Full Stack' },
    company: 'Hotel pra Hoje',
    period: { en: 'Mar 2024 – Sep 2025', pt: 'Mar 2024 – Set 2025' },
    context: {
      en: 'Technology company focused on hospitality and online booking solutions.',
      pt: 'Empresa de tecnologia focada em soluções de hotelaria e reservas online.',
    },
    bullets: {
      en: [
        'Built the backend API in PHP/Laravel and the frontend with Livewire, on MySQL.',
        'Modeled the system and implemented integrations: payment gateways (Asaas, Pagar.me), OAuth, observability (Laravel Telescope), API docs via Swagger, multichannel notifications (email, WhatsApp, Firebase push), and Google Maps geolocation.',
        'Optimized logging to a structured JSON format, replacing Laravel default stacks for standardization and better analysis.',
        'Set up a CI/CD pipeline with GitHub Actions to run automated tests on every commit.',
      ],
      pt: [
        'Desenvolvimento de API backend em PHP/Laravel e frontend com Livewire, utilizando MySQL.',
        'Modelagem do sistema e integrações: gateways de pagamento (Asaas, Pagar.me), autenticação OAuth, observabilidade (Laravel Telescope), documentação via Swagger, notificações multicanal (e-mail, WhatsApp, push com Firebase) e geolocalização com Google Maps.',
        'Otimização do sistema de logs para formato JSON estruturado, substituindo as stacks padrão do Laravel para padronização e melhor análise.',
        'Implantação de pipeline CI/CD com GitHub Actions para testes automatizados a cada commit.',
      ],
    },
  },
  {
    role: { en: 'Backend Developer (Freelance)', pt: 'Desenvolvedor Backend (Freelancer)' },
    company: 'Palinha',
    period: { en: 'Jan 2025 – Feb 2025', pt: 'Jan 2025 – Fev 2025' },
    context: {
      en: 'Technology company focused on booking musicians for private events and bars.',
      pt: 'Empresa de tecnologia focada em contratação de músicos para eventos privados e bares.',
    },
    bullets: {
      en: [
        'Implemented a calendar system integrated with the orders module, letting clients and musicians view and organize upcoming events.',
      ],
      pt: [
        'Sistema de calendários integrado ao módulo de pedidos, permitindo que contratantes e contratados visualizem e organizem eventos futuros.',
      ],
    },
  },
];

export const education = {
  degree: {
    en: 'Associate Degree in Internet Systems Technology',
    pt: 'Tecnologia em Sistemas para Internet',
  } satisfies L10n,
  school: {
    en: 'UTFPR — Federal University of Technology, Paraná',
    pt: 'UTFPR — Universidade Tecnológica Federal do Paraná',
  } satisfies L10n,
  period: {
    en: 'Mar 2023 – Dec 2025 (completed)',
    pt: 'Mar 2023 – Dez 2025 (concluído)',
  } satisfies L10n,
};

export const certifications: L10nList = {
  en: ['AWS Certified Cloud Practitioner'],
  pt: ['AWS Certified Cloud Practitioner'],
};

export const skills: { label: L10n; items: string }[] = [
  {
    label: { en: 'Languages', pt: 'Linguagens' },
    items: 'PHP · Ruby · JavaScript · Python · Rust · HTML · CSS',
  },
  {
    label: { en: 'Frameworks', pt: 'Frameworks' },
    items: 'Laravel · Livewire · Ruby on Rails · Hotwire/Turbo · Tailwind CSS',
  },
  {
    label: { en: 'Databases', pt: 'Bancos de dados' },
    items: 'MySQL · PostgreSQL · SQLite',
  },
  {
    label: { en: 'Tools', pt: 'Ferramentas' },
    items: 'Git · Docker · Linux terminal',
  },
  {
    label: { en: 'Cloud & DevOps', pt: 'Cloud & DevOps' },
    items: 'AWS (basic) · Docker/Kamal deploys · CI/CD (GitHub Actions) · Cloudflare (CDN/cache) · observability (New Relic)',
  },
];

export const languages: { name: L10n; level: L10n }[] = [
  {
    name: { en: 'Portuguese', pt: 'Português' },
    level: { en: 'Native', pt: 'Nativo' },
  },
  {
    name: { en: 'English', pt: 'Inglês' },
    level: { en: 'Fluent — speaking, reading, writing', pt: 'Fluente — fala, leitura e escrita' },
  },
  {
    name: { en: 'French', pt: 'Francês' },
    level: { en: 'Beginner (reading)', pt: 'Iniciante (leitura)' },
  },
  {
    name: { en: 'Japanese', pt: 'Japonês' },
    level: { en: 'Beginner', pt: 'Iniciante' },
  },
];

export interface Project {
  name: string;
  url: string;
  tags: string[];
  summary: L10n;
  highlights: L10nList;
}

export const projects: Project[] = [
  {
    name: 'Cinemarchives',
    url: 'https://cinemarchives.com.br',
    tags: ['Ruby on Rails 8', 'SQLite FTS5', 'Hotwire', 'Kamal', 'Cloudflare'],
    summary: {
      en: 'A digital archive for browsing and searching digitized cinema magazines.',
      pt: 'Um acervo digital para navegar e buscar revistas de cinema digitalizadas.',
    },
    highlights: {
      en: [
        'Full-text search with SQLite FTS5 (raw SQL) over thousands of transcribed pages; navigation with Hotwire/Turbo and a Tailwind CSS interface.',
        'Deployed with Kamal/Docker on an Oracle Cloud VM, behind Cloudflare with edge cache rules and an image CDN; observability via New Relic.',
        'In its launch month (May 2026): ~108K page views and ~34K unique visitors (≈650K requests), served by a single 1 vCPU / 1 GB VM thanks to ~50% of requests hitting the Cloudflare edge.',
      ],
      pt: [
        'Busca full-text com SQLite FTS5 (SQL puro) sobre milhares de páginas transcritas; navegação com Hotwire/Turbo e interface em Tailwind CSS.',
        'Deploy com Kamal/Docker em VM na Oracle Cloud, atrás do Cloudflare com regras de cache de borda e CDN de imagens; observabilidade com New Relic.',
        'No mês de lançamento (maio de 2026): ~108 mil visualizações e ~34 mil visitantes únicos (≈650 mil requisições), atendidos por uma única VM de 1 vCPU / 1 GB graças a ~50% das requisições servidas pela borda do Cloudflare.',
      ],
    },
  },
  {
    name: 'challenge-backend-laravel-php',
    url: 'https://github.com/joaopabdala/challenge-backend-laravel-php',
    tags: ['PHP', 'Laravel', 'Redis', 'Docker'],
    summary: {
      en: 'A REST backend that syncs products and categories from an external store API into a local database.',
      pt: 'Backend REST que sincroniza produtos e categorias de uma API externa de loja para um banco local.',
    },
    highlights: {
      en: [
        'Redis caching and queue workers; Adapter/Factory patterns for swappable providers.',
        'Exposes filtering, pagination, and aggregated-statistics endpoints. Runs on Docker / Laravel Sail.',
      ],
      pt: [
        'Cache em Redis e workers de fila; padrões Adapter/Factory para troca de provedores.',
        'Expõe endpoints de filtragem, paginação e estatísticas agregadas. Roda em Docker / Laravel Sail.',
      ],
    },
  },
  {
    name: 'tiko',
    url: 'https://github.com/joaopabdala/tiko',
    tags: ['Rust', 'async', 'CLI'],
    summary: {
      en: 'A command-line tool written in async Rust to download watermark-free TikTok videos in HD.',
      pt: 'Ferramenta de linha de comando em Rust async para baixar vídeos do TikTok em HD e sem marca d’água.',
    },
    highlights: { en: [], pt: [] },
  },
];

export const summary: L10n = {
  en: 'Full Stack Developer with experience building and maintaining web applications, developing APIs, integrating systems, and optimizing performance. Hands-on with PHP/Laravel, Livewire, and relational databases, plus CI/CD pipelines, payment integrations, multichannel notifications, and geolocation. Comfortable with observability, API documentation, Docker environments, and version control with git.',
  pt: 'Desenvolvedor Full Stack com experiência em criação e manutenção de aplicações web, desenvolvimento de APIs, integrações de sistemas e otimização de performance. Atuação com PHP/Laravel, Livewire e bancos de dados relacionais, além de pipelines CI/CD, integrações de pagamento, notificações multicanal e geolocalização. Familiaridade com observabilidade, documentação de APIs, ambientes Docker e versionamento com git.',
};
