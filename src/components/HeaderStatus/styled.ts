import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 330px;
  align-items: center;
  @media (min-width: 600px) {
    width: 490px;
  }
`

interface Props {
  withColor: boolean
}

export const AvatarContainer = styled.div`
  border: ${(props: Props) =>
    props.withColor ? 'solid 2px green' : 'solid 0px'};
  padding: 0.5rem;
  border-radius: 50%;
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
`
