'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = (newLocale: 'pt' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '#sobre', label: t('sobre') },
    { href: '#servicos', label: t('servicos') },
    { href: '#formacoes', label: t('formacoes') },
    { href: '#contato', label: t('contato') },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#inicio" className="text-white font-bold text-lg tracking-tight">
            [LOGO]
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 ml-4 border-l border-slate-700 pl-4">
              <button
                onClick={() => switchLocale('pt')}
                className={`text-sm font-medium transition-colors ${
                  locale === 'pt' ? 'text-accent' : 'text-slate-400 hover:text-white'
                }`}
              >
                PT
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={() => switchLocale('en')}
                className={`text-sm font-medium transition-colors ${
                  locale === 'en' ? 'text-accent' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'fechar menu' : 'abrir menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="mobile" className="md:hidden bg-primary border-t border-slate-800">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 px-6 py-3 border-t border-slate-800">
            <button
              onClick={() => switchLocale('pt')}
              className={`text-sm font-medium ${locale === 'pt' ? 'text-accent' : 'text-slate-400'}`}
            >
              PT
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => switchLocale('en')}
              className={`text-sm font-medium ${locale === 'en' ? 'text-accent' : 'text-slate-400'}`}
            >
              EN
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
