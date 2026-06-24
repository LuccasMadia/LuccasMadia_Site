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
    'w-full px-4 py-3 border border-zinc-600 rounded text-sm text-white placeholder-slate-500 bg-[#2e2f2e] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

  return (
    <section id="contato" className="py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">{t('titulo')}</h2>
          <p className="mt-4 text-slate-400">{t('subtitulo')}</p>
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
                  className="w-full bg-accent text-primary font-semibold py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {t('enviar')}
                </button>
                {submitError && (
                  <p className="text-red-500 text-sm text-center">{t('erroEnvio')}</p>
                )}
              </form>
            )}
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="mailto:madiaconsultoria@gmail.com"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                madiaconsultoria@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="https://wa.me/+5567998746300"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="https://www.linkedin.com/in/luccas-madia-b0229739b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <a
                href="https://github.com/LuccasMadia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
