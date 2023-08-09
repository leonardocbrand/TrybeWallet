import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
    <Box
      component="header"
      display="flex"
      flexDirection={ { xs: 'column', sm: 'row' } }
      alignItems="center"
      justifyContent="space-around"
    >
      <Box component="img" src={ logo } alt="Trybewallet Logo" />
      <Box display="flex" alignItems="center">
        <MonetizationOnIcon />
        <Typography fontSize={ { xs: 14, md: 18 } } fontWeight={ 700 }>
          Total de despesas:
        </Typography>
        <Typography
          fontSize={ { xs: 14, md: 18 } }
          fontWeight={ 400 }
          variant="h3"
          ml={ 1 }
          data-testid="total-field"
        >
          {total.toFixed(2)}
        </Typography>
        <Typography
          fontSize={ { xs: 14, md: 18 } }
          fontWeight={ 400 }
          variant="h3"
          data-testid="header-currency-field"
        >
          BRL
        </Typography>
      </Box>
      <Typography
        fontSize={ { xs: 14, md: 18 } }
        fontWeight={ 600 }
        variant="h3"
        data-testid="email-field"
      >
        {user.email}
      </Typography>
    </Box>
  );
}

export default Header;
