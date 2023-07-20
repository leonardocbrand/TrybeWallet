import { Dispatch, ExpensesData, FormData, WalletFormData } from '../../types';

export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const UPDATE_WALET_FORM = 'UPDATE_WALET_FORM';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const updateForm = (data: FormData) => ({
  type: UPDATE_LOGIN_FORM,
  payload: data.email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const requestCurrenciesSuccess = (currencies: string[]) => (
  {
    type: REQUEST_CURRENCIES_SUCCESS,
    payload: currencies,
  }
);

export const fetchCurrencies = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestCurrencies());

    const response = await global.fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();

    dispatch(requestCurrenciesSuccess(currencies));
  };
};

export const updateWalletForm = (data: WalletFormData) => ({
  type: UPDATE_WALET_FORM,
  payload: data,
});

export const deleteExpense = (data: ExpensesData) => ({
  type: DELETE_EXPENSE,
  payload: data,
});
