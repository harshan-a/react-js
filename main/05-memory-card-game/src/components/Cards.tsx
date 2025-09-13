import { 
  useState, 
  type Dispatch, 
  type SetStateAction 
} from "react"
import Card from "./Card"

import type { Cards, Card as CardType } from "../utils/types"

import "./Cards.css"

type CardsProps = {
  cards: Cards
  setPassCount: Dispatch<SetStateAction<number>>
  setAttemptCount: Dispatch<SetStateAction<number>>
}

export default function Cards({ 
  cards, 
  setPassCount, 
  setAttemptCount
}: CardsProps) {
  const [count, setCount] = useState(0)
  const [flippedCards, setFlippedCards] = useState<[CardType | null, CardType | null]>([null, null])
  const [matchedCards, setMatchedCards] = useState<Array<CardType>>([])
  const [shake, setShake] = useState(false)

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
      if(card1 && card2) {
        setAttemptCount(p => p + 1)
        if(card1.img === card2.img) {
          setMatchedCards([...matchedCards, card1, card2])
          setFlippedCards([null, null])
          setCount(0)
          setTimeout(() => {
            setPassCount(p => p + 1)
          }, 400)
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
            />
          )
        })
      }
    </div>
  )
}