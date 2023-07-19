import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, ReduxState, WalletFormData } from '../types';
import { fetchCurrencies, updateWalletForm } from '../redux/actions';

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
  const { currencies } = useSelector((state: ReduxState) => state.wallet);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
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

    const data = {
      id,
      ...formData,
      exchangeRates: await getAllCurrencies(),
    };

    setId(id + 1);
    dispatch(updateWalletForm(data));
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="value">
        Valor
        <input
          type="text"
          id="value"
          name="value"
          data-testid="value-input"
          value={ formData.value }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="description">
        Descrição da despesa
        <input
          type="text"
          id="description"
          name="description"
          data-testid="description-input"
          value={ formData.description }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="currency">
        Moeda
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          value={ formData.currency }
          onChange={ handleChange }
        >
          {currencies?.map((currency) => (
            <option key={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="method">
        Método de pagamento
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ handleChange }
          value={ formData.method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Categoria da despesa
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          onChange={ handleChange }
          value={ formData.tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
