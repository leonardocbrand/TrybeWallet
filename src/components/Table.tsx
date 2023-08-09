import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ExpensesData, ReduxState } from '../types';
import { deleteExpense, editExpense } from '../redux/actions';

function ExpensesTable() {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  const dispatch = useDispatch();

  return (
    <TableContainer
      component={ Paper }
      sx={ { background: '#003BE5', width: '100%', margin: '10px 0' } }
    >
      <Table
        sx={ { minWidth: 650 } }
        size="small"
        arial-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Descrição

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Tag

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Método de pagamento

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Valor

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Moeda

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Câmbio utilizado

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Valor convertido

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Moeda de conversão

            </TableCell>
            <TableCell
              sx={ { color: 'white', fontWeight: '700' } }
            >
              Editar/Excluir

            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense: ExpensesData) => (
            <TableRow
              key={ expense.id }
              sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
            >
              <TableCell sx={ { color: ' #2FC18C' } }>{expense.description}</TableCell>
              <TableCell sx={ { color: ' #2FC18C' } }>{expense.tag}</TableCell>
              <TableCell sx={ { color: ' #2FC18C' } }>{expense.method}</TableCell>
              <TableCell
                sx={ { color: ' #2FC18C' } }
              >
                {Number(expense.value).toFixed(2)}

              </TableCell>
              <TableCell sx={ { color: ' #2FC18C' } }>
                {expense
                  .exchangeRates[expense.currency as keyof typeof expense.exchangeRates]
                  .name}
              </TableCell>
              <TableCell sx={ { color: ' #2FC18C' } }>
                {Number(expense
                  .exchangeRates[expense.currency as keyof typeof expense.exchangeRates]
                  .ask).toFixed(2)}
              </TableCell>
              <TableCell sx={ { color: ' #2FC18C' } }>
                {(
                  Number(expense.value) * Number(expense
                    .exchangeRates[expense.currency as keyof typeof expense.exchangeRates]
                    .ask)).toFixed(2) }
              </TableCell>
              <TableCell sx={ { color: ' #2FC18C' } }>Real</TableCell>
              <TableCell>
                <IconButton
                  data-testid="edit-btn"
                  onClick={ () => dispatch(editExpense(expense)) }
                >
                  <EditIcon sx={ { color: 'white' } } />
                </IconButton>
                <IconButton
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpense(expense)) }
                >
                  <DeleteIcon sx={ { color: 'white' } } />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpensesTable;
