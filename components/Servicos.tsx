'use client';

import { useTranslations } from 'next-intl';
import { BarChart2, Globe, Share2, Palette, ClipboardList, Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';

export default function Servicos() {
  const t = useTranslations('servicos');

  const services = [
    {
      icon: <ClipboardList className="w-7 h-7 text-accent" />,
      title: t('consultoriaAdmin.titulo'),
      desc: t('consultoriaAdmin.descricao'),
    },
    {
      icon: <BarChart2 className="w-7 h-7 text-accent" />,
      title: t('dashboards.titulo'),
      desc: t('dashboards.descricao'),
    },
    {
      icon: <Globe className="w-7 h-7 text-accent" />,
      title: t('sites.titulo'),
      desc: t('sites.descricao'),
    },
    {
      icon: <Share2 className="w-7 h-7 text-accent" />,
      title: t('socialMedia.titulo'),
      desc: t('socialMedia.descricao'),
    },
    {
      icon: <Palette className="w-7 h-7 text-accent" />,
      title: t('design.titulo'),
      desc: t('design.descricao'),
    },
    {
      icon: <Sparkles className="w-7 h-7 text-slate-500" />,
      title: '—',
      desc: '—',
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {t('titulo')}
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.07}>
              <div className="bg-[#2e2f2e] rounded-lg p-7 border border-zinc-700 hover:border-accent/40 hover:shadow-lg transition-all h-full">
                <div className="mb-4">{service.icon}</div>
                <h3 className="font-semibold text-white text-lg mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
