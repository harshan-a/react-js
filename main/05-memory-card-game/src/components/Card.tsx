// import { useState, type Dispatch, type SetStateAction } from "react"
import clsx from "clsx"
import type { Card } from "../utils/types"
import "./Card.css"

type CardProps = {
  card: Card
  handleCardClick: (
    // setIsClicked: Dispatch<SetStateAction<boolean>>
    card: Card
  )  => void
  flippedCards: [Card | null, Card | null]
  matchedCards: Card[]
  shake: boolean
  flipAll: boolean
}

export default function Card({
  card, handleCardClick, flippedCards, matchedCards, shake, flipAll
}: CardProps) {
  
  // const [isClicked, setIsClicked] = useState<boolean>(false)

  const cardClassName = clsx(
    "card", 
    { flip: flippedCards.includes(card) || matchedCards.includes(card) || flipAll },
    {shake: shake && flippedCards.includes(card)}
  )

  return (
    <div
      className={cardClassName}
      onClick={() => handleCardClick(card)}
    >
      <div className="card-content back-side">
        <img src={card.img} alt="card" className="card-img" />
      </div>
      <div className="card-content front-side">
        <img src="/images/frontside.png" alt="card" className="card-img" />
      </div>
    </div>
  );
}