import { AnyAction } from 'redux';
import { UPDATE_LOGIN_FORM } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_LOGIN_FORM:
      return {
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
