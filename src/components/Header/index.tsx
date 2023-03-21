import { HeaderContent, NewTransactionButton } from './styles'
import { HeaderContainer } from './styles'
import logoImg from '../../assets/Logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt='' />
        <NewTransactionButton>New Transaction</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
