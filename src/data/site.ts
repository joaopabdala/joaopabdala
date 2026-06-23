export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type L10n = Record<Locale, string>;

export const profile = {
  name: 'João Paulo Abdala Bohaczk',
  shortName: 'João Abdala',
  email: 'okiabdala@gmail.com',
  tagline: {
    en: 'Full Stack Developer',
    pt: 'Desenvolvedor Full Stack',
  } satisfies L10n,
  location: {
    en: 'Guarapuava — Paraná, Brazil',
    pt: 'Guarapuava — Paraná, Brasil',
  } satisfies L10n,
  bio: {
    en: 'Full Stack Developer building and maintaining web applications, designing APIs, integrating systems, and squeezing out performance. I work mostly with PHP/Laravel and Ruby on Rails, and I care about clean deployments, observability, and shipping things that hold up under real traffic.',
    pt: 'Desenvolvedor Full Stack que cria e mantém aplicações web, projeta APIs, integra sistemas e busca performance. Trabalho principalmente com PHP/Laravel e Ruby on Rails, e me importo com deploys limpos, observabilidade e entregar coisas que aguentam tráfego real.',
  } satisfies L10n,
} as const;

export const links = {
  github: 'https://github.com/joaopabdala',
  linkedin: 'https://www.linkedin.com/in/joao-paulo-abdala/',
  substack: 'https://joaopabdala.substack.com',
  email: `mailto:${profile.email}`,
} as const;

// UI strings used in nav, buttons, headings.
export const ui = {
  nav_home: { en: 'Home', pt: 'Início' },
  nav_resume: { en: 'Résumé', pt: 'Currículo' },
  nav_articles: { en: 'Articles', pt: 'Artigos' },
  home_featured_projects: { en: 'Selected work', pt: 'Trabalhos selecionados' },
  home_latest_articles: { en: 'Latest writing', pt: 'Escritos recentes' },
  home_view_all_articles: { en: 'All articles →', pt: 'Todos os artigos →' },
  home_connect: { en: 'Elsewhere', pt: 'Em outros lugares' },
  resume_download: { en: 'Download PDF', pt: 'Baixar PDF' },
  resume_experience: { en: 'Experience', pt: 'Experiência' },
  resume_education: { en: 'Education', pt: 'Formação' },
  resume_certifications: { en: 'Certifications', pt: 'Certificações' },
  resume_skills: { en: 'Technical skills', pt: 'Habilidades técnicas' },
  resume_projects: { en: 'Showcase projects', pt: 'Projetos de demonstração' },
  resume_languages: { en: 'Languages', pt: 'Idiomas' },
  articles_title: { en: 'Articles', pt: 'Artigos' },
  articles_intro: {
    en: 'Notes on building, shipping, and operating software.',
    pt: 'Notas sobre construir, lançar e operar software.',
  },
  articles_empty: { en: 'Nothing here yet.', pt: 'Nada por aqui ainda.' },
  article_back: { en: '← All articles', pt: '← Todos os artigos' },
  article_read_original: { en: 'Read the original on Substack →', pt: 'Leia o original no Substack →' },
  footer_built: {
    en: 'Built with Astro. Source on GitHub.',
    pt: 'Feito com Astro. Código no GitHub.',
  },
  toggle_theme: { en: 'Toggle theme', pt: 'Alternar tema' },
} satisfies Record<string, L10n>;

export function t(key: keyof typeof ui, locale: Locale): string {
  return ui[key][locale];
}

export function localeName(locale: Locale): string {
  return locale === 'en' ? 'EN' : 'PT';
}
