import {
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
  useState,
} from "react"

import Setting, { type Settings } from "./Setting"

import "./Header.css"

type HeaderProps = {
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export default function Header({ settings, setSettings }: HeaderProps) {
  const [settingToggle, setSettingToggle] = useState(false)
  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    if (e.target === e.currentTarget) {
      setSettingToggle((p) => !p)
    }
  }

  return (
    <div className="header">
      <span className="title">Activate your fingers!! ({settings.mode})</span>
      <button>
        <span onClick={handleClick} className="material-symbols-outlined">
          settings
        </span>
        {settingToggle && (
          <Setting
            settings={settings}
            setSettings={setSettings}
            setSettingToggle={setSettingToggle}
          />
        )}
      </button>
    </div>
  )
}
