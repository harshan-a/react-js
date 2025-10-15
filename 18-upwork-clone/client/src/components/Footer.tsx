import type { FooterType } from "../utils/types"
import instagramIcon from "../assets/social-media-icons/instagram.svg"
import facebookIcon from "../assets/social-media-icons/facebook.svg"
import xIcon from "../assets/social-media-icons/x.svg"
import linkedinIcon from "../assets/social-media-icons/linkedin.svg"

import "./Footer.css"

type FooterProps = {
  footerContent: FooterType
}

export default function Footer({ footerContent }: FooterProps) {
  return (
    <div className="footer">
      <div className="services-container">
        {Object.keys(footerContent).map((key, index) => {
          return (
            <div className="service" key={index}>
              <span>{key.split("_").join(" ")}</span>
              <ul>
                {footerContent[key as keyof FooterType]?.map((c: string, i) => {
                  return (
                    <li title={c} key={i}>
                      <a href={c}>{c}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="social-media-container">
        <span>Follow me </span>
        <a href="http://instagram.com/hars._an_">
          <img src={instagramIcon} alt="instagram" />
        </a>
        <a href="http://instagram.com/hars._an_">
          <img src={xIcon} alt="x" />
        </a>
        <a href="http://instagram.com/hars._an_">
          <img src={facebookIcon} alt="facebook" />
        </a>
        <a href="http://instagram.com/hars._an_">
          <img src={linkedinIcon} alt="linkedin" />
        </a>
      </div>
    </div>
  )
}
