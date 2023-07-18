import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import { Wallet } from '../pages/Wallet';

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/carteira" element={ <Wallet /> } />
    </Routes>
  );
}
