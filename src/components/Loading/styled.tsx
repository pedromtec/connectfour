import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  -webckit--webkit-box-reflect: below -12px linear-gradient(transparent, rgb(0, 0, 0, 0.2));
`

const animate = keyframes`
  0% {
    transform: translateY(0px);
  }

  20% {
    transform:  translateY(-20px);
  }
  40%, 100% {
    transform:  translateY(0);
  }
`

interface CharacterProps {
  delay: number
}

export const Character = styled.span`
  position: relative;
  display: inline-block;
  color: #f1fa8c;
  text-transform: uppercase;
  animation: ${animate} 1s ease-in-out infinite;
  animation-delay: ${(props: CharacterProps) => `calc(0.1s * ${props.delay})`};
`
