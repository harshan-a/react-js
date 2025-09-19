import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react"

import "./Setting.css"

export type Settings = {
  isSec: boolean
  duration: number
  mode: "easy" | "moderate" | "hard"
}

type SettingProps = {
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  setSettingToggle: Dispatch<SetStateAction<boolean>>
}

export default function Setting({
  settings,
  setSettings,
  setSettingToggle,
}: SettingProps) {
  const [isSec, setIsSec] = useState(settings.isSec)
  const [mode, setMode] = useState(settings.mode)
  const [timeInput, setTimeInput] = useState(settings.duration)

  function handleSelectTime(e: ChangeEvent<HTMLSelectElement>) {
    const { value: timeUnit } = e.target
    setIsSec(timeUnit === "seconds")
  }
  function handleSelectMode(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as "easy" | "moderate" | "hard"
    setMode(value)
  }
  function handleTimeInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    // const duration = Number(value)
    // console.log(duration)
    // if (Number(value)) {
    setTimeInput(Number(value))
    // }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setSettings({ isSec, mode, duration: timeInput })
    setSettingToggle((p) => !p)
  }

  return (
    <form className="setting" onSubmit={handleSubmit}>
      <div className="timer-container">
        <label htmlFor="timer" className="timer-label">
          Timer:{" "}
        </label>
        <input
          value={timeInput}
          onChange={handleTimeInput}
          type="number"
          min={isSec ? 10 : 1}
          max={isSec ? 60 : 10}
          required
        />

        <select
          onChange={handleSelectTime}
          value={isSec ? "seconds" : "minutes"}>
          <option value="seconds">sec</option>
          <option value="minutes">min</option>
        </select>
      </div>
      <div className="paragraph-mode-container">
        <label htmlFor="mode" className="mode-label">
          Mode:{" "}
        </label>
        <select onChange={handleSelectMode} value={mode}>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <input type="submit" value="Save" className="btn" />
    </form>
  )
}
