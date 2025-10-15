import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Main from "./main/Main"

import footerContent from "../../data/footer.json"

export default function HomePage() {
  return (
    <>
      <Header />
      <Main />
      <Footer footerContent={footerContent} />
    </>
  )
}
