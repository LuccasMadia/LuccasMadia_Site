import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Hero from '@/components/Hero';

const messages = {
  hero: {
    headline: 'Consultoria que transforma resultados',
    subheadline: 'Soluções para sua empresa.',
    cta: 'Conheça nossos serviços',
  },
};

test('renderiza headline e CTA com href correto', () => {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Hero />
    </NextIntlClientProvider>
  );
  expect(screen.getByText('Consultoria que transforma resultados')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Conheça nossos serviços' }))
    .toHaveAttribute('href', '#servicos');
});
