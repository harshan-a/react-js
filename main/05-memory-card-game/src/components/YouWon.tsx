import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

import "./YouWon.css"

type YouWonProps = {
  setGameWon: Dispatch<SetStateAction<boolean>>
  setRestartGame: Dispatch<SetStateAction<boolean>>
}

export default function YouWon({ setRestartGame, setGameWon }: YouWonProps) {
  const [restartCount, setRestartCount] = useState(3)

  if (restartCount > 0) {
    setTimeout(() => {
      console.log("check");
      setRestartCount(restartCount - 1)
    }, 1000)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGameWon(false)
      setRestartGame(pre => !pre)
    }, 3000)

    return () => clearTimeout(timeoutId)

  }, [setGameWon, setRestartGame])


  return (
    <div className="you-won">
      <h1>You won &#127942;</h1>
      <p>Game will restart in: {restartCount}</p>
    </div>
  )
}