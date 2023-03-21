import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form action=''>
          <input type='text' placeholder='Descrição' required />
          <input type='text' placeholder='Preço' required />
          <input type='text' placeholder='Categoria' required />
          <TransactionType>
            <TransactionTypeButton value='income' variant='income'>
              <ArrowCircleUp size={24} />
              Income
            </TransactionTypeButton>
            <TransactionTypeButton value='outcome' variant='outcome'>
              <ArrowCircleDown size={24} />
              Outcome
            </TransactionTypeButton>
          </TransactionType>
          <button type='submit'>Register</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
