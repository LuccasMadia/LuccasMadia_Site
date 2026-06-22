import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { vi } from 'vitest';
import Navbar from '@/components/Navbar';

vi.mock('@/lib/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl')>();
  return { ...actual, useLocale: () => 'pt' };
});

const messages = {
  nav: {
    sobre: 'Sobre',
    servicos: 'Serviços',
    formacoes: 'Formações',
    contato: 'Contato',
  },
};

function renderNavbar() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Navbar />
    </NextIntlClientProvider>
  );
}

test('renderiza todos os links de navegação', () => {
  renderNavbar();
  expect(screen.getAllByText('Sobre').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Serviços').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Formações').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('Contato').length).toBeGreaterThanOrEqual(1);
});

test('marca PT como ativo quando locale é pt', () => {
  renderNavbar();
  const ptButton = screen.getByRole('button', { name: 'PT' });
  expect(ptButton).toHaveClass('text-amber-400');
});

test('abre menu mobile ao clicar no hamburguer', () => {
  renderNavbar();
  const hamburger = screen.getByRole('button', { name: /abrir menu/i });
  fireEvent.click(hamburger);
  expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
});
