import {
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
  // type RefObject,
} from "react"

import Video from "../../../components/Video"

import "./ProcessSection.css"

type ProcessSectionProps = {
  isFreelancer: boolean
  setIsFreelancer: Dispatch<SetStateAction<boolean>>
}

type Process = {
  isVideo: boolean
  url: string
  title: string
  description: string
  btnText: string
}

export default function ProcessSection({
  isFreelancer,
  setIsFreelancer,
}: ProcessSectionProps) {
  const clientProcess: Process[] = [
    {
      isVideo: true,
      url: "/process-videos/hiw-client.mp4",
      title: "Posting jobs is always free",
      description:
        "Generate a job post with AI or create your own and filter talent matches.",
      btnText: "Create a job",
    },
    {
      isVideo: false,
      url: "/process-images/for_hiring_1.webp",
      title: "Get proposals and hire",
      description:
        "Screen, interview, or book a consult with an expert before hiring.",
      btnText: "Explore experts",
    },
    {
      isVideo: false,
      url: "/process-images/for_hiring_2.webp",
      title: "Pay when work is done",
      description:
        "Release payments after approving work, by milestone or upon project completion.",
      btnText: "View pricing",
    },
  ]
  const freelancerProcess: Process[] = [
    {
      isVideo: true,
      url: "/process-videos/hiw-freelancer.mp4",
      title: "Find clients and remote jobs",
      description:
        "Create your profile to highlight your best work and attract top clients.",
      btnText: "Create a profile",
    },
    {
      isVideo: false,
      url: "/process-images/for_finding_work_1.webp",
      title: "Submit proposals for work",
      description:
        "Negotiate rates for the projects you want or reply to invites from clients.",
      btnText: "Search jobs",
    },
    {
      isVideo: false,
      url: "/process-images/for_finding_work_2.webp",
      title: "Get paid as you deliver work",
      description:
        "Land a contract, do the work you love, and get paid on time.",
      btnText: "Estimate earnings",
    },
  ]

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const { mode } = e.currentTarget.dataset
    if (!isFreelancer && mode === "freelancer") setIsFreelancer(true)
    if (isFreelancer && mode === "client") setIsFreelancer(false)
  }

  return (
    <div className="process-section">
      <div className="process-section-header">
        <h4>How it works</h4>
        <div className="process-mode">
          <button
            className={"hire " + `${isFreelancer ? "" : "active"}`}
            onClick={handleClick}
            data-mode="client">
            For hiring
          </button>
          <button
            className={"jobs " + `${!isFreelancer ? "" : "active"}`}
            onClick={handleClick}
            data-mode="freelancer">
            For finding jobs
          </button>
        </div>
      </div>
      <div className="process-container">
        {(isFreelancer ? freelancerProcess : clientProcess).map(
          (process, i) => {
            return (
              <div className="process" key={i}>
                {process.isVideo ? (
                  <Video url={process.url} />
                ) : (
                  <img
                    className="pic"
                    src={`/process-media/${process.url}`}
                    alt={process.title}
                  />
                )}
                <div className="details">
                  <h5>{process.title}</h5>
                  <div className="content">
                    <p>{process.description}</p>
                    <button className="green-btn">{process.btnText}</button>
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
