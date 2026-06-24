'use client';

import { useTranslations, useMessages } from 'next-intl';
import { GraduationCap, Award } from 'lucide-react';
import FadeIn from './FadeIn';

interface FormacaoItem {
  nome: string;
  instituicao: string;
  ano: string;
}

export default function Formacoes() {
  const t = useTranslations('formacoes');
  const messages = useMessages() as {
    formacoes: { academica: FormacaoItem[]; tecnica: FormacaoItem[] };
  };

  const academica: FormacaoItem[] = messages.formacoes.academica;
  const tecnica: FormacaoItem[] = messages.formacoes.tecnica;

  return (
    <section id="formacoes" className="py-24 bg-[#1c1d1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {t('titulo')}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formação acadêmica */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-accent flex-shrink-0" />
              <h3 className="font-serif text-xl font-bold text-white">{t('academicaTitulo')}</h3>
            </div>
            <div className="space-y-5">
              {academica.map((item) => (
                <div key={`${item.nome}-${item.ano}`} className="border-l-2 border-accent/30 pl-5">
                  <p className="font-semibold text-slate-200">{item.nome}</p>
                  <p className="text-slate-400 text-sm mt-0.5">
                    {item.instituicao} · {item.ano}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Certificações técnicas */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-accent flex-shrink-0" />
              <h3 className="font-serif text-xl font-bold text-white">{t('tecnicaTitulo')}</h3>
            </div>
            <div className="space-y-5">
              {tecnica.map((item) => (
                <div key={`${item.nome}-${item.ano}`} className="border-l-2 border-accent/30 pl-5">
                  <p className="font-semibold text-slate-200">{item.nome}</p>
                  <p className="text-slate-400 text-sm mt-0.5">
                    {item.instituicao} · {item.ano}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
