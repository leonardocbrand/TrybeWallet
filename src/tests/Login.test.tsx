import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { Login } from '../pages/Login';
import App from '../App';

describe('Testando página de Login', () => {
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';

  test('Testa se contém os campos para digitar email o input e o botão de entrar', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testa se o botão está desabilitado quando o email e a senha são inválidos', async () => {
    renderWithRouterAndRedux(<Login />);

    const EMAIL = 'email@teste';
    const PASSWORD = '12345';

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    await userEvent.type(email, EMAIL);
    await userEvent.type(password, PASSWORD);

    expect(button).toBeDisabled();
  });
  test('Testa se o botão está habilitado quando o email e a senha são válidos', async () => {
    renderWithRouterAndRedux(<Login />);

    const EMAIL = 'email@teste.com';
    const PASSWORD = '1234567';

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    await userEvent.type(email, EMAIL);
    await userEvent.type(password, PASSWORD);

    expect(button).toBeEnabled();
  });
  test('Testa se ao clicar no botão passa para a rota "/carteira" e se atualiza o estado global do Form', async () => {
    renderWithRouterAndRedux(<App />);

    const EMAIL = 'email@teste.com';
    const PASSWORD = '1234567';

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    await userEvent.type(email, EMAIL);
    await userEvent.type(password, PASSWORD);

    expect(button).toBeEnabled();

    await userEvent.click(button);

    const emailHeading = screen.getByRole('heading', { name: /email@teste\.com/i });
    expect(emailHeading).toBeInTheDocument();
  });
});
