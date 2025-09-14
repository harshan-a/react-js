import { useState, } from "react"
import Cards from "./components/Cards"
import Header from "./components/Header"
import GameDetails from "./components/GameDetails"
import YouWon from "./components/YouWon"


export default function App() {
  const [passCount, setPassCount] = useState(0)
  const [attemptCount, setAttemptCount] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [restartGame, setRestartGame] = useState(false)


  if (gameWon)
    return (
      <YouWon
        setRestartGame={setRestartGame}
        setGameWon={setGameWon}
      />
    )

  else
    return (
      <>
        <Header />
        <GameDetails 
          passCount={passCount} 
          attemptCount={attemptCount} 
          setRestartGame={setRestartGame}
        />
        <Cards 
          restartGame={restartGame} 
          passCount={passCount}
          setPassCount={setPassCount} 
          setGameWon={setGameWon}
          setAttemptCount={setAttemptCount} 
        />
      </>
    )

}