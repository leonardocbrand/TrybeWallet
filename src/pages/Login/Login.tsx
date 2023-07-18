import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../public/logo.svg';
import { updateForm } from '../../redux/actions';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = form;

  const validateForm = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^[a-z0-9]{5,}$/i;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    return isEmailValid && isPasswordValid;
  };

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = target;

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setDisableBtn(validateForm());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateForm(form));
    navigate('/carteira');
  };

  return (
    <div>
      <img src={ logoImg } alt="" />
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button type="submit" disabled={ !disableBtn }>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
