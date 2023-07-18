import { useSelector } from 'react-redux';
import { useState } from 'react';
import logo from '../public/logo.svg';

function Header() {
  const [total, setTotal] = useState(0);
  const { email } = useSelector((state: any) => state.user);

  return (
    <header>
      <img src={ logo } alt="" />
      <h2 data-testid="total-field">{`Total de despesas: ${total}`}</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
      <h2 data-testid="email-field">{email}</h2>
    </header>
  );
}

export default Header;
