import { Dispatch, FormData, WalletFormData } from '../../types';

export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';
export const UPDATE_WALET_FORM = 'UPDATE_WALET_FORM';

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

export const requestCurrenciesError = (errorMsg: any) => ({
  type: REQUEST_CURRENCIES_ERROR,
  payload: errorMsg,
});

export const fetchCurrencies = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestCurrencies());

      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();

      dispatch(requestCurrenciesSuccess(currencies));
    } catch (errorMsg) {
      dispatch(requestCurrenciesError(errorMsg));
    }
  };
};

export const updateWalletForm = (data: WalletFormData) => ({
  type: UPDATE_WALET_FORM,
  payload: data,
});
