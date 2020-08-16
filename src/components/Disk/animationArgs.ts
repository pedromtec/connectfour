export const dropArgs = (transform: string, mu: number) => {
  return {
    from: {
      transform,
    },
    to: {
      transform: 'translateY(0px)',
    },
    config: {
      mu,
      mass: 0.8,
      initialVelocity: 8,
    }
  }
}


export const winnerArgs = () => {

  return {
    from: {
      transform: 'scale(0.5) rotate(0deg)',
      borderRadius: '100%',
    },
    to: {
      transform: 'scale(1.2) rotate(360deg)',
      borderRadius: '50%',
    },
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 2,
    },
    infinite: true,
  }
  
}