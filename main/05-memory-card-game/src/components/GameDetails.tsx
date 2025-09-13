import "./GameDetails.css"

type GameDetailsProps = {
  passCount: number
  attemptCount: number
}

export default function GameDetails({passCount, attemptCount}: GameDetailsProps) {
  return (
    <div className="game-details">
      <span>Attempt: {attemptCount}</span>
      <span>Passed: {passCount}</span>
    </div>
  )
}