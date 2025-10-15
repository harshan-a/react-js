import { useState, useRef } from "react"

import "./Video.css"

type VideoProps = {
  url: string
  autoPlay?: boolean
  loop?: boolean
}
export default function Video({
  url,
  autoPlay = true,
  loop = true,
}: VideoProps) {
  const [isPlay, setIsPlay] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  function videoHandle() {
    if (videoRef.current)
      if (videoRef.current.paused || !isPlay) {
        videoRef.current.play()
        setIsPlay(true)
      } else {
        videoRef.current.pause()
        setIsPlay(false)
      }
  }

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="pic"
        src={`/process-media/${url}`}
        autoPlay={autoPlay && isPlay}
        // controls
        loop={loop}
        muted
      />
      <button
        className={isPlay ? "play" : "pause"}
        onClick={videoHandle}></button>
    </div>
  )
}
