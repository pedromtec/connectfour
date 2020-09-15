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
  paddingBottom: boolean
}

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
`

export const AvatarContainer = styled.div`
  width: 30px;
  height: 30px;
  @media (min-width: 600px) {
    width: 70px;
    height: 70px;
  }
  padding-bottom: ${(props: Props) => (props.paddingBottom ? '0.8rem' : '0')};
`
