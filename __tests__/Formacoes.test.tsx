import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Formacoes from '@/components/Formacoes';

const messages = {
  formacoes: {
    titulo: 'Formações',
    academicaTitulo: 'Formação Acadêmica',
    tecnicaTitulo: 'Certificações & Cursos',
    academica: [
      { nome: 'Bacharelado em Administração', instituicao: 'Universidade X', ano: '2020' },
    ],
    tecnica: [
      { nome: 'Power BI Avançado', instituicao: 'Microsoft', ano: '2022' },
    ],
  },
};

test('renderiza as duas colunas com seus itens', () => {
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <Formacoes />
    </NextIntlClientProvider>
  );
  expect(screen.getByText('Formação Acadêmica')).toBeInTheDocument();
  expect(screen.getByText('Certificações & Cursos')).toBeInTheDocument();
  expect(screen.getByText('Bacharelado em Administração')).toBeInTheDocument();
  expect(screen.getByText('Power BI Avançado')).toBeInTheDocument();
});
