import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Footer from '@/components/Footer';

const messages = {
  footer: {
    direitos: 'Todos os direitos reservados',
    email: 'contato@empresa.com',
  },
};

test('renderiza footer com copyright e ano atual', () => {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Footer />
    </NextIntlClientProvider>
  );
  expect(screen.getByText(/todos os direitos reservados/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
});
