'use client';

import { useTranslations } from 'next-intl';
import FadeIn from './FadeIn';

export default function Sobre() {
  const t = useTranslations('sobre');

  const stats = [
    { value: t('anosValor'), label: t('anos') },
    { value: t('projetosValor'), label: t('projetos') },
    { value: t('clientesValor'), label: t('clientes') },
  ];

  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-6">
              {t('titulo')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('descricao')}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl font-bold text-accent">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
