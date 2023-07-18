import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import logo from '../public/logo.svg';
import { ReduxState } from '../types';

function Header() {
  const [total, setTotal] = useState(0);
  const rootState = useSelector((state: ReduxState) => state);
  const { user, wallet } = rootState;

  const getTotal = () => {
    const totalData = wallet
      .expenses
      .reduce((acc, curr) => (
        acc + Number(curr.value) * Number(
          curr.exchangeRates[curr.currency as keyof typeof curr.exchangeRates].ask,
        )), 0);

    setTotal(totalData);
  };

  useEffect(() => {
    getTotal();
  }, [wallet.expenses]);

  return (
    <header>
      <img src={ logo } alt="" />
      <h2 data-testid="total-field">{total.toFixed(2)}</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
      <h2 data-testid="email-field">{user.email}</h2>
    </header>
  );
}

export default Header;
