import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react"
import clsx from "clsx"

import Paragraphs from "../data/paragraph"
import "./Content.css"

type ContentProps = {
  wordsStatus: { word: string; status: "correct" | "wrong" }[]
  setWordsStatus: Dispatch<
    SetStateAction<{ word: string; status: "correct" | "wrong" }[]>
  >
  stop: boolean
  setStop: Dispatch<SetStateAction<boolean>>
  start: boolean
  setStart: Dispatch<SetStateAction<boolean>>
  restart: boolean
  mode: "easy" | "moderate" | "hard"
}

export default function Content({
  wordsStatus,
  setWordsStatus,
  stop,
  setStop,
  start,
  setStart,
  restart,
  mode,
}: ContentProps) {
  const [words, setWords] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const [highlightIndex, setHighlightIndex] = useState(0)
  const [highlightMode, setHighlightMode] = useState<
    "highlight" | "highlight-wrong" | "highlight-correct"
  >("highlight")

  const { current: wordElements } = useRef<(HTMLSpanElement | null)[]>([])

  function setwordElementRefs(elem: HTMLSpanElement | null, index: number) {
    wordElements[index] = elem
  }

  useEffect(() => {
    setWords(new Paragraphs().selectParagraph(mode).split(" "))
    wordElements[0]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      // inline: "start", for horizontal alignment.
    })
  }, [mode, restart, wordElements])

  useEffect(() => {
    setInputValue("")
    setHighlightIndex(0)
    setHighlightMode("highlight")
  }, [stop, words])

  function handleChangeEvent(e: ChangeEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !start && setStart(true)
    // console.log(e)
    const { value } = e.target

    setInputValue(value)

    if (value.split("")[value.length - 1] === " ") {
      if (inputValue.trim()) {
        const wordStatus =
          words[highlightIndex] === inputValue ? "correct" : "wrong"
        setWordsStatus([
          ...wordsStatus,
          { word: words[highlightIndex], status: wordStatus },
        ])
        setHighlightIndex((p) => p + 1)
        setHighlightMode("highlight")
        wordElements[highlightIndex + 1]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          // inline: "start", for horizontal alignment.
        })
        if (highlightIndex + 1 === words.length) {
          setStop(true)
        }
      }
      setTimeout(() => {
        setInputValue("")
      }, 100)
      return
    }

    const highlightedWord = words[highlightIndex]

    if (highlightedWord.startsWith(value.trim())) {
      if (value.trim()) {
        setHighlightMode("highlight-correct")
      } else {
        setHighlightMode("highlight")
      }
    } else {
      setHighlightMode("highlight-wrong")
    }
  }

  // function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
  //   // console.log(e.key)
  //   // if (e.key === " ") {
  //   // }
  // }

  function getClassName(index: number) {
    return clsx(
      index === highlightIndex && !stop && highlightMode,
      wordsStatus[index]?.status // it return undefined if there is no value at index position, clsx will handle it and add no class;
    )
  }

  return (
    <div className="content">
      <div>
        <p>
          {words.map((word, index) => {
            return (
              <span
                key={index}
                ref={(elem) => setwordElementRefs(elem, index)}
                className={getClassName(index)}>
                {word}
              </span>
            )
          })}
        </p>
      </div>
      <input
        type="text"
        placeholder={stop ? "Refresh to start again" : "Start typing here..."}
        onInput={handleChangeEvent}
        // onKeyDown={handleKeyDown}
        value={inputValue}
        disabled={stop}
      />
    </div>
  )
}
