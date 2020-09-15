import styled, { keyframes } from 'styled-components'

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
  time?: string
  height?: number
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

const scale = keyframes`
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.5, 0.5);
  }
`

export const WinnerDisk = styled(Disk)`
  animation: ${scale} 1s linear alternate infinite;
`

const moveVertically = (y: number) => {
  console.log('caled')
  return keyframes`
    0% {
      transform: translateY(${y}px);
    }
    100% {
      transform: translateY(0);
    }
  `
}

export const DropDisk = styled(Disk)`
  animation: ${(props: DiskProps) => moveVertically(props.height!)}
    ${(props: DiskProps) => props.time};
`
