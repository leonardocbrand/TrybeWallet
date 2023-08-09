import { Container, Paper, Stack } from '@mui/material';
import Header from '../../components/Header';
import WalletForm from '../../components/WalletForm';
import ExpensesTable from '../../components/Table';

function Wallet() {
  return (
    <Container
      sx={ {
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: 'url(https://trybewallet-pied.vercel.app/static/media/backImg.bcb42ed8a853c9c806cc.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      } }
    >
      <Paper
        component={ Stack }
        p={ 2 }
        direction="column"
        elevation={ 4 }
        spacing={ 4 }
      >
        <Header />
        <WalletForm />
      </Paper>
      <ExpensesTable />
    </Container>
  );
}

export default Wallet;
