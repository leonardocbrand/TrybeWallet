import { FormData } from '../../types';

// Coloque aqui suas actions
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';

export const updateForm = (data: FormData) => ({
  type: UPDATE_LOGIN_FORM,
  payload: data.email,
});
