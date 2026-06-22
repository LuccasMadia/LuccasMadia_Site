import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { vi } from 'vitest';
import Contato from '@/components/Contato';

const messages = {
  contato: {
    titulo: 'Contato',
    subtitulo: 'Fale conosco.',
    nome: 'Nome',
    email: 'E-mail',
    mensagem: 'Mensagem',
    enviar: 'Enviar mensagem',
    sucesso: 'Mensagem enviada com sucesso!',
    erroNome: 'Nome obrigatório',
    erroEmail: 'E-mail inválido',
    erroMensagem: 'Mensagem deve ter pelo menos 10 caracteres',
  },
};

function renderContato() {
  return render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Contato />
    </NextIntlClientProvider>
  );
}

test('exibe erro quando nome está vazio ao submeter', async () => {
  renderContato();
  fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
  await waitFor(() => {
    expect(screen.getByText('Nome obrigatório')).toBeInTheDocument();
  });
});

test('exibe erro para e-mail inválido', async () => {
  renderContato();
  await userEvent.type(screen.getByLabelText(/nome/i), 'João');
  await userEvent.type(screen.getByLabelText(/e-mail/i), 'nao-e-email');
  fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
  await waitFor(() => {
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
  });
});

test('exibe mensagem de sucesso após envio válido', async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true });
  renderContato();
  await userEvent.type(screen.getByLabelText(/nome/i), 'Maria');
  await userEvent.type(screen.getByLabelText(/e-mail/i), 'maria@email.com');
  await userEvent.type(screen.getByLabelText(/mensagem/i), 'Olá, tenho interesse nos serviços.');
  fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
  await waitFor(() => {
    expect(screen.getByText('Mensagem enviada com sucesso!')).toBeInTheDocument();
  });
});
