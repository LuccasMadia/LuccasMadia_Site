'use client';

import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

export default function Sobre() {
  const t = useTranslations('sobre');

  return (
    <section id="sobre" className="py-24 bg-[#1c1d1c]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            {t('titulo')}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">{t('descricao')}</p>
        </FadeIn>
      </div>
    </section>
  );
}
