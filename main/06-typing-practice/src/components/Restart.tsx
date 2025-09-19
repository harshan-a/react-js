import { type Dispatch, type SetStateAction } from "react"

import "./Restart.css"

export default function Restart({
  setRestart,
}: {
  setRestart: Dispatch<SetStateAction<boolean>>
}) {
  function handleClick() {
    setRestart((p) => !p)
  }
  return (
    <div className="restart">
      <button onClick={handleClick}>
        <span className="material-symbols-outlined">cached</span>
      </button>
    </div>
  )
}
