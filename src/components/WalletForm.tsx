import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Stack, TextField } from '@mui/material';
import { Dispatch, ReduxState, WalletFormData } from '../types';
import { fetchCurrencies, updateExpense, updateWalletForm } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function WalletForm() {
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState<WalletFormData>(INITIAL_STATE);

  const dispatch: Dispatch = useDispatch();
  const {
    currencies,
    expenses,
    editor,
    idToEdit,
  } = useSelector((state: ReduxState) => state.wallet);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  useEffect(() => {
    if (editor) {
      const editExpense = expenses.find((expense) => expense.id === idToEdit);
      if (editExpense) setFormData(editExpense);
    }
  }, [editor, expenses, idToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const getAllCurrencies = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = response.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editor) {
      const data = {
        id,
        ...formData,
        exchangeRates: await getAllCurrencies(),
      };

      setId(id + 1);
      dispatch(updateWalletForm(data));
    } else {
      dispatch(updateExpense(formData));
    }
    setFormData(INITIAL_STATE);
  };

  return (
    <Paper
      component="section"
      elevation={ 5 }
      sx={ { p: '20px', background: 'rgba(225, 229, 235, 0.49)' } }
    >
      <Stack
        component="form"
        onSubmit={ handleSubmit }
        spacing={ 2 }
        direction="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          spacing={ 2 }
          direction={ { xs: 'column', md: 'row' } }
        >
          <TextField
            type="text"
            id="value"
            name="value"
            label="Valor"
            data-testid="value-input"
            value={ formData.value }
            onChange={ handleChange }
            size="small"
          />
          <TextField
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            value={ formData.description }
            onChange={ handleChange }
            label="Descrição da despessa"
            size="small"
          />
          <TextField
            select
            id="currency"
            name="currency"
            label="Moedas"
            data-testid="currency-input"
            value={ formData.currency }
            SelectProps={ { native: true } }
            onChange={ handleChange }
            size="small"
            helperText="Escolha a moeda"
          >
            {currencies?.map((currency) => (
              <option key={ currency }>
                {currency}
              </option>
            ))}
          </TextField>
          <TextField
            id="method"
            label="Método de pagamento"
            name="method"
            select
            data-testid="method-input"
            onChange={ handleChange }
            SelectProps={ { native: true } }
            value={ formData.method }
            size="small"
            helperText="Escolha o método de pagamento"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </TextField>
          <TextField
            id="tag"
            label="Categoria da despesa"
            name="tag"
            select
            data-testid="tag-input"
            onChange={ handleChange }
            value={ formData.tag }
            SelectProps={ { native: true } }
            size="small"
            helperText="Escolha a categoria da despesa"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </TextField>
        </Stack>
        <Button
          variant="contained"
          size="medium"
          color="success"
          type="submit"
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </Button>
      </Stack>
    </Paper>
  );
}

export default WalletForm;
