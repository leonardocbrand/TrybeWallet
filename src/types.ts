import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type FormData = {
  email: string,
  password: string,
};

export type ReduxState = {
  user: {
    email: string,
  }
  wallet: {
    currencies: string[],
    expenses: ExpensesData[],
    editor: boolean,
    idToEdit: number,
  }
};

export type WalletFormData = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export type Dispatch = ThunkDispatch<ReduxState, void, AnyAction>;

export type ExpensesData = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: {
    USD: {
      name: string,
      ask: string,
    },
    CAD: {
      name: string,
      ask: string,

    },
    GBP: {
      name: string,
      ask: string,
    },
    ARS: {
      name: string,
      ask: string,
    },
    BTC: {
      name: string,
      ask: string,
    },
    LTC: {
      name: string,
      ask: string,
    },
    EUR: {
      name: string,
      ask: string,
    },
    JPY: {
      name: string,
      ask: string,
    },
    CHF: {
      name: string,
      ask: string,
    },
    AUD: {
      name: string,
      ask: string,
    },
    CNY: {
      name: string,
      ask: string,
    },
    ILS: {
      name: string,
      ask: string,
    },
    ETH: {
      name: string,
      ask: string,
    },
    XRP: {
      name: string,
      ask: string,
    },
    DOGE: {
      name: string,
      ask: string,
    }
  }
};
