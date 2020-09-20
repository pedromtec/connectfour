import React from 'react'

import { Container } from './styles'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/" style={{ textDecoration: 'none', color: '#FFF' }}>
        ConnectFour
      </Link>
    </Container>
  )
}

export default Header
