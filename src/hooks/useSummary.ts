// instead of having this long function inside Summary component

import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContex'

// we put it in a hook
export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  //acc is the transaction object, we can change it's property in each iteration
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }
      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  )
  return summary
}
