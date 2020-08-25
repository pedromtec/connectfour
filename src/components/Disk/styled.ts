import styled from 'styled-components'

export const DiskWrapper = styled.div`
  background-color: #bd93f9;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
  margin: 1px;
`

interface DiskProps {
  diskColor: string
}

export const Disk = styled.div`
  height: 85%;
  width: 85%;
  border-radius: 100px;
  background-color: ${(props: DiskProps) => props.diskColor || '#bd93f9'};
  @media (min-width: 600px) {
    height: 85%;
    width: 85%;
    border-radius: 100px;
  }
`
