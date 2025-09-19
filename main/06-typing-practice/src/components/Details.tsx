import { useState, useEffect, type Dispatch, type SetStateAction } from "react"

import "./Details.css"

type DetailsProps = {
  start: boolean
  stop: boolean
  setStop: Dispatch<SetStateAction<boolean>>
  wordsStatus: { word: string; status: "correct" | "wrong" }[]
  restart: boolean
  duration: number
}
export default function Details({
  start,
  stop,
  setStop,
  wordsStatus,
  restart,
  duration,
}: DetailsProps) {
  const [counter, setCounter] = useState(duration)

  useEffect(() => {
    let timeoutId: number
    if (counter > 0 && start && !stop) {
      timeoutId = setTimeout(() => {
        setCounter((p) => p - 1)
      }, 1000)
    }
    if (counter === 0) setStop(true)

    return () => clearTimeout(timeoutId)
  }, [counter, setStop, start, stop, restart])

  useEffect(() => {
    setCounter(duration)
  }, [duration, restart])

  let correctKeys = 0
  let mistakeKeys = 0

  wordsStatus.forEach((wordStatus) => {
    if (wordStatus.status === "wrong") {
      mistakeKeys += wordStatus.word.length
    }
    if (wordStatus.status === "correct") {
      correctKeys += wordStatus.word.length + 1
    }
  })
  // const mistake = wordsStatus.filter(
  //   (wordStatus) => wordStatus.toLocaleLowerCase() === "wrong"
  // ).length

  // const correct = wordsStatus.filter(
  //   (wordStatus) => wordStatus.toLocaleLowerCase() === "correct"
  // ).length

  const wpm = Math.round((correctKeys / 5 / (duration - counter)) * 60) || 0
  const cpm = Math.round((correctKeys / (duration - counter)) * 60) || 0
  const min = String(Math.floor(counter / 60)).padStart(2, "0")
  const sec = String(counter % 60).padStart(2, "0")

  return (
    <div className="details">
      <span className="detail">Timer: {min + ":" + sec}</span>
      <span className="detail">Mistake: {mistakeKeys}</span>
      <span className="detail">CPM: {cpm === Infinity ? 0 : cpm}</span>
      <span className="detail">WPM: {wpm === Infinity ? 0 : wpm}</span>
    </div>
  )
}
