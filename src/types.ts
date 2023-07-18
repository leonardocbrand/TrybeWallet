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
    expenses: [],
    editor: boolean,
    idToEdit: number,
  }
};
