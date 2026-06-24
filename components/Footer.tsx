'use client';

import { useTranslations } from 'next-intl';
import { Share2, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/luccas-madia-b0229739b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <Share2 size={20} />
            </a>
            <a
              href="https://github.com/LuccasMadia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <Globe size={20} />
            </a>
            <a
              href={`mailto:${t('email')}`}
              aria-label="E-mail"
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <p className="text-slate-500 text-sm text-center">
            © {year} · {t('direitos')}
          </p>
        </div>
      </div>
    </footer>
  );
}
