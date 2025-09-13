import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

import "./YouWon.css"

type YouWonProps = {
  setPassCount: Dispatch<SetStateAction<number>>
  setRestartGame: Dispatch<SetStateAction<boolean>>
}

export default function YouWon({ setRestartGame, setPassCount }: YouWonProps) {
  const [restartCount, setRestartCount] = useState(3)

  useEffect(() => {
    if (restartCount >= 0) {
      setTimeout(() => {
        setRestartCount(restartCount - 1)
      }, 1000)
    }
  
    setTimeout(() => {
      setPassCount(0)
      setRestartGame(pre => !pre)
    }, 3000)


  }, [restartCount, setPassCount, setRestartGame])


  return (
    <div className="you-won">
      <h1>You won &#127942;</h1>
      <p>Game will restart in: {restartCount}</p>
    </div>
  )
}