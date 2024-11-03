import React from 'react'
import { Container } from './styles'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a style={{ textDecoration: 'none', color: '#FFF' }}>Connect 4</a>
      </Link>
    </Container>
  )
}

export default Header
