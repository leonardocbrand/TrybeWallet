import { AnyAction } from 'redux';
import { DELETE_EXPENSE, EDIT_EXPENSE, REQUEST_CURRENCIES_SUCCESS,
  UPDATE_EXPENSE,
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
    case EDIT_EXPENSE:
      return {
        ...state,
        editor: true,
        idToEdit: action.payload.id,
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        editor: false,
        expenses: state.expenses.map((expense: ExpensesData) => (
          expense.id === state.idToEdit ? action.payload : expense
        )),
      };
    default:
      return state;
  }
};

export default wallet;
