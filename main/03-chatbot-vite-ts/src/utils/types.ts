import type { JSX } from "react"

export type ChatMessage = {
  message: string | JSX.Element
  time?: number
  id: string
  sender: string
}

export type ChatMessagesType = Array<ChatMessage>