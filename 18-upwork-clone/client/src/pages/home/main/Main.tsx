import { useState } from "react"

import TopSection from "./TopSection"
import ProsSection from "./ProsSection"
import ProcessSection from "./ProcessSection"
import "./Main.css"

export default function Main() {
  const [isFreelancer, setIsFreelancer] = useState(true)
  return (
    <main>
      <TopSection
        isFreelancer={isFreelancer}
        setIsFreelancer={setIsFreelancer}
      />
      <ProsSection />
      <ProcessSection
        isFreelancer={isFreelancer}
        setIsFreelancer={setIsFreelancer}
      />
    </main>
  )
}
