import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}
