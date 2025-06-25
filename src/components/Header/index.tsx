import React from 'react'
import { Container } from './styles'
import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.2rem;
`

const Header: React.FC = () => {
  return (
    <Container>
      <Title>
        <Link href="/">
          <a style={{ textDecoration: 'none', color: '#FFF' }}>Connect 4</a>
        </Link>
      </Title>
    </Container>
  )
}

export default Header
