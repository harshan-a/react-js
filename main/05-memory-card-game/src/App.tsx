import { useState, useEffect } from "react"
import Cards from "./components/Cards"
import Header from "./components/Header"
import GameDetails from "./components/GameDetails"
import YouWon from "./components/YouWon"

import type { Cards as CardsType } from "./utils/types"
import "./App.css"


export default function App() {
  const [cards, setCards] = useState<CardsType>([])
  const [passCount, setPassCount] = useState(8)
  const [attemptCount, setAttemptCount] = useState(0)
  const [restartGame, setRestartGame] = useState(false)

  useEffect(() => {
    const numbers = [...Array(8).keys()].map(n => n + 1)
    const suffleCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((num, i) => ({ id: i, img: `images/img-${num}.png` }))

    setCards(suffleCards)
    setAttemptCount(0)

    // console.log(Array(8).keys())
    // console.log(Object.values(numbers))
    // console.log(suffleCards)
  }, [restartGame])

  if (passCount === 8)
    return (
      <YouWon
        setRestartGame={setRestartGame}
        setPassCount={setPassCount}
      />
    )

  else
    return (
      <>
        <Header />
        <Cards cards={cards} setPassCount={setPassCount} setAttemptCount={setAttemptCount} />
        <GameDetails passCount={passCount} attemptCount={attemptCount} />
      </>
    )

}