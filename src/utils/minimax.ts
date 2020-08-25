const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getMove = async (board: number[][]) => {
  console.log(board)
  await sleep(7000)
  return Math.floor(Math.random() * 7)
}
