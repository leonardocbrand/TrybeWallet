import { AnyAction } from 'redux';
import { DELETE_EXPENSE, REQUEST_CURRENCIES_SUCCESS,
  UPDATE_WALET_FORM } from '../actions';
import { ExpensesData } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
      };
    case UPDATE_WALET_FORM:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense: ExpensesData) => expense.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export default wallet;
