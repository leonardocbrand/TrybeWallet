import { useDispatch, useSelector } from 'react-redux';
import { ExpensesData, ReduxState } from '../types';
import { deleteExpense } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  const dispatch = useDispatch();

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: ExpensesData) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2)}</td>
            <td>
              {expense
                .exchangeRates[expense.currency as keyof typeof expense.exchangeRates]
                .name}
            </td>
            <td>
              {Number(expense
                .exchangeRates[expense.currency as keyof typeof expense.exchangeRates]
                .ask).toFixed(2)}
            </td>
            <td>
              {(
                Number(expense.value) * Number(expense
                  .exchangeRates[expense.currency as keyof typeof expense.exchangeRates]
                  .ask)).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                data-testid="delete-btn"
                onClick={ () => dispatch(deleteExpense(expense)) }
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
