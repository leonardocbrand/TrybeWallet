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
      ask: string,
    },
    CAD: {
      ask: string,

    },
    GBP: {
      ask: string,
    },
    ARS: {
      ask: string,
    },
    BTC: {
      ask: string,
    },
    LTC: {
      ask: string,
    },
    EUR: {
      ask: string,
    },
    JPY: {
      ask: string,
    },
    CHF: {
      ask: string,
    },
    AUD: {
      ask: string,
    },
    CNY: {
      ask: string,
    },
    ILS: {
      ask: string,
    },
    ETH: {
      ask: string,
    },
    XRP: {
      ask: string,
    },
    DOGE: {
      ask: string,
    }
  }
};
