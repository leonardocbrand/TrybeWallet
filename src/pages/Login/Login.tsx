import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
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
    { target }: React.ChangeEvent<HTMLInputElement>,
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
    <Container
      sx={ {
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://trybewallet-pied.vercel.app/static/media/backImg.bcb42ed8a853c9c806cc.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      } }
    >
      <Paper elevation={ 2 } sx={ { p: 4 } }>
        <Box mb={ 2 } component="img" src={ logoImg } alt="TrybeWallet Logo" />
        <Stack spacing={ 2 } component="form" onSubmit={ handleSubmit }>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleChange }
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ handleChange }
          />
          <Button
            sx={ { p: 1 } }
            variant="contained"
            type="submit"
            disabled={ !disableBtn }
          >
            Entrar
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Login;
