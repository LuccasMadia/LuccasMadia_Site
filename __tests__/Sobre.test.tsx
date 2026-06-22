import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Sobre from '@/components/Sobre';

const messages = {
  sobre: {
    titulo: 'Sobre nós',
    descricao: 'Empresa de consultoria.',
    anos: 'Anos de experiência',
    projetos: 'Projetos entregues',
    clientes: 'Clientes atendidos',
    anosValor: '5+',
    projetosValor: '80+',
    clientesValor: '40+',
  },
};

test('renderiza seção Sobre com título e estatísticas', () => {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Sobre />
    </NextIntlClientProvider>
  );
  expect(screen.getByText('Sobre nós')).toBeInTheDocument();
  expect(screen.getByText('5+')).toBeInTheDocument();
  expect(screen.getByText('80+')).toBeInTheDocument();
  expect(screen.getByText('40+')).toBeInTheDocument();
});
