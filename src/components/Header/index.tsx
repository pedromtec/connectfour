import React from 'react'
import { Container } from './styles'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a style={{ textDecoration: 'none', color: '#FFF' }}>ConnectFour</a>
      </Link>
    </Container>
  )
}

export default Header
