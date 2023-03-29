import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/src/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { api } from '../../lib/axios'
import { TransactionsContext } from './../../contexts/TransactionsContex'
import { useContext } from 'react'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.createTransactions;
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    const { description, category, price, type } = data
    await createTransactions({
      description,
      category,
      price,
      type,
    })
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            placeholder='Descrição'
            required
            {...register('description')}
          />
          <input
            type='text'
            placeholder='Preço'
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type='text'
            placeholder='Categoria'
            required
            {...register('category')}
          />
          <Controller
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value='income' variant='income'>
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeButton>
                  <TransactionTypeButton value='outcome' variant='outcome'>
                    <ArrowCircleDown size={24} />
                    Outcome
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type='submit' disabled={isSubmitting}>
            Register
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
