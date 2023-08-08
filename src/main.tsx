import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import App from './App';
import store from './redux';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <Provider store={ store }>
        <CssBaseline />
        <App />
      </Provider>
    </BrowserRouter>,
  );

if (window.Cypress) {
  window.store = store;
}
