import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRedux, renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import { Wallet } from '../pages/Wallet';
import mockUserData from './helpers/mockUserData';
import mockData from './helpers/mockData';

describe('Testando a página da Wallet "/carteira"', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Testa se contém os elementos na tela', async () => {
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
  test('Testa o fetch do botão submit', () => {
    // vi.spyOn(global, 'fetch');
    // (global.fetch as any).mockResolvedValue({
    //   json: vi.fn().mockResolvedValue(mockData),
    // });

  });
});
