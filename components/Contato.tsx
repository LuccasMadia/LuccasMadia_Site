'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useMemo } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import FadeIn from './FadeIn';

type FormData = { name: string; email: string; message: string };

export default function Contato() {
  const t = useTranslations('contato');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const schema = useMemo(() => z.object({
    name: z.string().min(1, t('erroNome')),
    email: z.string().email(t('erroEmail')),
    message: z.string().min(10, t('erroMensagem')),
  }), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-slate-200 rounded text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

  return (
    <section id="contato" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">{t('titulo')}</h2>
          <p className="mt-4 text-slate-500">{t('subtitulo')}</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <FadeIn>
            {submitted ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-accent font-semibold text-lg">{t('sucesso')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="sr-only">{t('nome')}</label>
                  <input
                    id="name"
                    {...register('name')}
                    placeholder={t('nome')}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">{t('email')}</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder={t('email')}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">{t('mensagem')}</label>
                  <textarea
                    id="message"
                    {...register('message')}
                    placeholder={t('mensagem')}
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-semibold py-3 rounded hover:bg-slate-800 transition-colors disabled:opacity-60"
                >
                  {t('enviar')}
                </button>
                {submitError && (
                  <p className="text-red-500 text-sm text-center">Erro ao enviar. Tente novamente.</p>
                )}
              </form>
            )}
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="mailto:contato@suaempresa.com.br"
                className="text-slate-600 hover:text-primary transition-colors text-sm"
              >
                contato@suaempresa.com.br
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors text-sm"
              >
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="https://linkedin.com/in/seu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
