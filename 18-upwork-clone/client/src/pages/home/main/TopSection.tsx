import { type MouseEvent, type Dispatch, type SetStateAction } from "react"

import airbnbLogo from "../../../assets/logo/logo-airbnb-grey.svg"
import bissellLogo from "../../../assets/logo/logo-bissell-grey.svg"
import glassdoorLogo from "../../../assets/logo/logo-glassdoor.svg"
import microsoftLogo from "../../../assets/logo/logo-microsoft-grey.svg"
import searchIcon from "../../../assets/icons/search-icon.png"

import "./TopSection.css"

type TopSectionProps = {
  isFreelancer: boolean
  setIsFreelancer: Dispatch<SetStateAction<boolean>>
}

export default function TopSection({
  isFreelancer,
  setIsFreelancer,
}: TopSectionProps) {
  function handleChangeMode(e: MouseEvent<HTMLDivElement>) {
    const { mode } = e.currentTarget.dataset
    if (!isFreelancer && mode === "freelancer") setIsFreelancer(true)
    if (isFreelancer && mode === "client") setIsFreelancer(false)
  }

  return (
    <div className="top-section">
      <div className="container">
        <h1>Connecting clients in need to freelancers who deliver</h1>
        <div className="main">
          <div className="mode">
            <span
              className={!isFreelancer ? "active" : ""}
              data-mode="client"
              onClick={handleChangeMode}>
              Find talent
            </span>
            <span
              className={isFreelancer ? "active" : ""}
              data-mode="freelancer"
              onClick={handleChangeMode}>
              Browse jobs
            </span>
          </div>
          <div className="mode-content">
            {!isFreelancer ? (
              <div className="client">
                <div className="client-input-container">
                  <input
                    type="text"
                    placeholder="Search by role, skills, or keywords"
                  />
                  <button className="search-btn">
                    <img src={searchIcon} alt="" />
                  </button>
                </div>
                <div className="logo-container">
                  <img src={microsoftLogo} alt="microsoft-logo" />
                  <img src={airbnbLogo} alt="airbnb-logo" />
                  <img src={glassdoorLogo} alt="glassdoor-logo" />
                  <img src={bissellLogo} alt="bissell-logo" />
                </div>
              </div>
            ) : (
              <div className="freelancer-content">
                <p>
                  Build your freelancing career on Upwork, with thousands of
                  jobs posted every week.
                </p>
                <button className="green-btn">
                  Explore recently posted jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
