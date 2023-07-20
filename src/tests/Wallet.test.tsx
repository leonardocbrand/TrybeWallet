import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRedux } from './helpers/renderWith';
import { Wallet } from '../pages/Wallet';
import mockUserData from './helpers/mockUserData';
import mockData from './helpers/mockData';

describe('Testando a página da Wallet "/carteira"', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Testando os elementos do form', async () => {
    const state = mockUserData;
    renderWithRedux(<Wallet />, { initialState: state });

    const value = screen.getByRole('heading', { name: /0\.00/i });
    const headerCurrency = screen.getByTestId('header-currency-field');
    const email = screen.getByRole('heading', { name: /email@teste\.com/i });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const submitButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const selectMethod = screen.getByRole('combobox', {
      name: /método de pagamento/i,
    });
    const selectCurrency = await screen.findByRole('combobox', {
      name: /moeda/i,
    });
    const selectTag = screen.getByRole('combobox', {
      name: /categoria da despesa/i,
    });

    expect(value).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(selectMethod).toBeInTheDocument();
    expect(selectCurrency).toBeInTheDocument();
    expect(selectTag).toBeInTheDocument();
    expect(selectMethod).toHaveLength(3);
    expect(selectCurrency).toHaveLength(15);
    expect(selectTag).toHaveLength(5);
  });
  test('Testando a tabela de gastos', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });

    const state = mockUserData;

    renderWithRedux(<Wallet />, { initialState: state });

    expect(global.fetch).toHaveBeenCalledTimes(1);

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

    expect(global.fetch).toHaveBeenCalledTimes(2);

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
});
