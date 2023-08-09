import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
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
        <MonetizationOnIcon sx={ { color: '#003BE5' } } />
        <Typography fontSize={ { xs: 14, md: 16 } } fontWeight={ 700 } color="#003BE5">
          Total de despesas:
        </Typography>
        <Typography
          fontSize={ { xs: 14, md: 16 } }
          fontWeight={ 400 }
          variant="h3"
          color="#003BE5"
          ml={ 1 }
          data-testid="total-field"
        >
          {total.toFixed(2)}
        </Typography>
        <Typography
          fontSize={ { xs: 14, md: 16 } }
          fontWeight={ 400 }
          variant="h3"
          color="#003BE5"
          data-testid="header-currency-field"
        >
          BRL
        </Typography>
      </Box>
      <Typography
        fontSize={ { xs: 14, md: 16 } }
        fontWeight={ 600 }
        variant="h3"
        color="#2FC18C"
        data-testid="email-field"
        display="flex"
        alignItems="center"
      >
        <PersonIcon />
        {user.email}
      </Typography>
    </Box>
  );
}

export default Header;
