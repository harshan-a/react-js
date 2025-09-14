import { type Dispatch, type SetStateAction } from "react"
import "./GameDetails.css"

type GameDetailsProps = {
  passCount: number
  attemptCount: number
  setRestartGame: Dispatch<SetStateAction<boolean>>
}

export default function GameDetails({ passCount, attemptCount, setRestartGame }: GameDetailsProps) {
  function handleRestartGame() {
    setRestartGame(p => !p)
  }
  return (
    <div className="game-details">
      <span>Attempt: {attemptCount}</span>
      <button onClick={handleRestartGame}>
        <span className="material-symbols-outlined">
          refresh
        </span>
      </button>
      <span>Passed: {passCount}</span>
    </div>
  )
}