import styled from 'styled-components'

export const Grid = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 330px;
  @media (min-width: 600px) {
    height: 420px;
    width: 490px;
    border-radius: 100px;
  }
`
export const Row = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`
