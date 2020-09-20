import styled from 'styled-components'

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`
export const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`

export const SpinnerWrapper = styled.div`
  padding-bottom: 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
