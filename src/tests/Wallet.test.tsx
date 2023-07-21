import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import user from '../redux/reducers/user';

describe('Testando a página da Wallet "/carteira"', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });

  test('Testando a tabela de gastos', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(global.fetch).toBeCalledTimes(1);

    const table = screen.getByRole('table');
    const description = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    const method = screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    });
    const ask = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const newValue = screen.getByRole('columnheader', { name: /valor convertido/i });
    const convertionCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const editDelete = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(table).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(ask).toBeInTheDocument();
    expect(newValue).toBeInTheDocument();
    expect(convertionCurrency).toBeInTheDocument();
    expect(editDelete).toBeInTheDocument();

    const value = screen.getByRole('textbox', { name: /valor/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const currencySelect = await screen.findByRole('combobox', { name: /moeda/i });
    const methodSelect = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tagSelect = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(value, '10');
    await userEvent.type(descriptionInput, 'teste03');
    await userEvent.selectOptions(currencySelect, 'CAD');
    await userEvent.selectOptions(methodSelect, 'Cartão de crédito');
    await userEvent.selectOptions(tagSelect, 'Lazer');
    await userEvent.click(submitButton);

    expect(global.fetch).toBeCalledTimes(2);

    const cellValue = await screen.findByRole('cell', { name: /10/i });
    const cellDescription = await screen.findByRole('cell', { name: /teste03/i });
    const cellTag = await screen.findByRole('cell', { name: /lazer/i });
    const cellMethod = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const cellAsk = await screen.findByRole('cell', { name: /3\.76/i });
    const cellConvertedValue = await screen.findByRole('cell', { name: /37\.56/i });

    expect(cellValue).toBeInTheDocument();
    expect(cellDescription).toBeInTheDocument();
    expect(cellTag).toBeInTheDocument();
    expect(cellMethod).toBeInTheDocument();
    expect(cellAsk).toBeInTheDocument();
    expect(cellConvertedValue).toBeInTheDocument();

    const deletButton = await screen.findByRole('button', { name: /excluir/i });

    expect(deletButton).toBeInTheDocument();

    await userEvent.click(deletButton);

    expect(deletButton).not.toBeInTheDocument();
    expect(cellValue).not.toBeInTheDocument();
  });
  test('Testando o botão de editar uma despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(global.fetch).toBeCalledTimes(1);

    const value = screen.getByRole('textbox', { name: /valor/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(value, '100');
    await userEvent.type(descriptionInput, 'teste04');
    await userEvent.click(submitButton);

    expect(global.fetch).toBeCalledTimes(2);

    const cellValue = await screen.findByRole('cell', { name: /100/i });
    const cellDescription = await screen.findByRole('cell', { name: /teste04/i });
    const editButton = await screen.findByRole('button', { name: /editar/i });

    expect(cellValue).toBeInTheDocument();
    expect(cellDescription).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    await userEvent.click(editButton);

    const updateButton = await screen.findByRole('button', { name: /editar despesa/i });

    expect(updateButton).toBeInTheDocument();

    await userEvent.type(value, '50');
    await userEvent.click(updateButton);

    const updatedCellValue = await screen.findByRole('cell', { name: /50/i });

    expect(updatedCellValue).toBeInTheDocument();
  });
});
