import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction
} from "react"
import Card from "./Card"

import type { Cards, Card as CardType } from "../utils/types"

import "./Cards.css"

type CardsProps = {
  restartGame: boolean
  passCount: number
  setPassCount: Dispatch<SetStateAction<number>>
  setGameWon: Dispatch<SetStateAction<boolean>>
  setAttemptCount: Dispatch<SetStateAction<number>>
}

export default function Cards({
  restartGame,
  passCount,
  setPassCount,
  setGameWon,
  setAttemptCount
}: CardsProps) {
  const [cards, setCards] = useState<Cards>([])
  const [count, setCount] = useState(0)
  const [flippedCards, setFlippedCards] = useState<[CardType | null, CardType | null]>([null, null])
  const [matchedCards, setMatchedCards] = useState<Array<CardType>>([])
  const [shake, setShake] = useState(false)
  const [flipAll, setFlipAll] = useState(false)


  useEffect(() => {
    const numbers = [...Array(8).keys()].map(n => n + 1)
    const suffleCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((num, i) => ({ id: i, img: `images/img-${num}.png` }))

    setCards(suffleCards)
    setAttemptCount(0)
    setPassCount(0)
    setFlipAll(true)
    const timeoutId = setTimeout(() => {
      setFlipAll(false)
    }, 3000)

    return () => clearTimeout(timeoutId)

    // console.log(Array(8).keys())
    // console.log(Object.values(numbers))
    // console.log(suffleCards)
  }, [restartGame, setAttemptCount, setPassCount])
  

  // function controlFlippedCards (id: number) {
  //   return flippedCards.includes(id)
  //     ? flippedCards.filter(flipId => flipId !== id)
  //     : [...flippedCards, id]
  // }

  function handleCardClick(
    // setIsClicked: Dispatch<SetStateAction<boolean>>,
    card: CardType
  ) {
    if (count < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
      // setIsClicked((prev: boolean) => !prev)

      const flippedCardsDummy: [CardType | null, CardType | null] = [...flippedCards]
      flippedCardsDummy[count] = card
      setFlippedCards(flippedCardsDummy)

      const [card1, card2] = flippedCardsDummy
      if (card1 && card2) {
        setAttemptCount(p => p + 1)
        if (card1.img === card2.img) {
          setMatchedCards([...matchedCards, card1, card2])
          setFlippedCards([null, null])
          setCount(0)
          setPassCount(p => p + 1)
          if(passCount + 1 === 8) {
            setTimeout(() => {
              setGameWon(true)
            }, 500)
          }
          return

        } else {
          setTimeout(() => {
            setShake(true)
          }, 400)

          setTimeout(() => {
            setShake(false)
            setFlippedCards([null, null])
            setCount(0)
          }, 800)
        }
      }
      setCount(p => p + 1)
    }
  }

  return (
    <div className="cards-grid">
      {
        cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              handleCardClick={handleCardClick}
              flippedCards={flippedCards}
              matchedCards={matchedCards}
              shake={shake}
              flipAll={flipAll}
            />
          )
        })
      }
    </div>
  )
}