import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding-right: 2rem;
  padding-left: 2rem;
  @media (min-width: 600px) {
    padding-right: 13rem;
    padding-left: 13rem;
    max-width: 90rem;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
export const FieldMessage = styled.span`
  padding-bottom: 1rem;
`
export const InfoContainer = styled.div`
  border-radius: 0.5rem;
  background-color: #44475a;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`
