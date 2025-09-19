import { useState, useEffect } from "react"

import Header from "./components/Header"
import Content from "./components/Content"
import Details from "./components/Details"
import Restart from "./components/Restart"

import { type Settings } from "./components/Setting"

import "./App.css"

function App() {
  const [wordsStatus, setWordsStatus] = useState<
    { word: string; status: "correct" | "wrong" }[]
  >([])
  const [start, setStart] = useState(false)
  const [stop, setStop] = useState(false)
  const [restart, setRestart] = useState(false)
  const [settings, setSettings] = useState<Settings>((): Settings => {
    const settingsString = localStorage.getItem("settings")
    return settingsString
      ? JSON.parse(settingsString)
      : {
          isSec: true,
          mode: "easy",
          duration: 60,
        }
  })
  const [duration, setDuration] = useState(
    settings.isSec ? settings.duration : settings.duration * 60
  )

  useEffect(() => {
    setWordsStatus([])
    setStart(false)
    setStop(false)
  }, [restart])

  useEffect(() => {
    setRestart((p) => !p)
    const duration = settings.isSec ? settings.duration : settings.duration * 60
    setDuration(duration)
    localStorage.setItem("settings", JSON.stringify(settings))
  }, [settings])

  return (
    <>
      <Header settings={settings} setSettings={setSettings} />
      <Content
        wordsStatus={wordsStatus}
        setWordsStatus={setWordsStatus}
        stop={stop}
        setStop={setStop}
        start={start}
        setStart={setStart}
        restart={restart}
        mode={settings.mode}
      />
      <Details
        start={start}
        stop={stop}
        setStop={setStop}
        wordsStatus={wordsStatus}
        restart={restart}
        duration={duration}
      />
      <Restart setRestart={setRestart} />
    </>
  )
}

export default App
