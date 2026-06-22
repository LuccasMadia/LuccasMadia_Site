import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Servicos from '@/components/Servicos';

const messages = {
  servicos: {
    titulo: 'Nossos Serviços',
    consultoriaAdmin: { titulo: 'Consultoria Administrativa', descricao: 'Desc.' },
    dashboards: { titulo: 'Dashboards Interativos', descricao: 'Desc.' },
    sites: { titulo: 'Sites e Sistemas', descricao: 'Desc.' },
    socialMedia: { titulo: 'Social Media', descricao: 'Desc.' },
    design: { titulo: 'Design Gráfico', descricao: 'Desc.' },
  },
};

test('renderiza os 5 cards de serviços', () => {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Servicos />
    </NextIntlClientProvider>
  );
  expect(screen.getByText('Nossos Serviços')).toBeInTheDocument();
  expect(screen.getByText('Consultoria Administrativa')).toBeInTheDocument();
  expect(screen.getByText('Dashboards Interativos')).toBeInTheDocument();
  expect(screen.getByText('Sites e Sistemas')).toBeInTheDocument();
  expect(screen.getByText('Social Media')).toBeInTheDocument();
  expect(screen.getByText('Design Gráfico')).toBeInTheDocument();
});
