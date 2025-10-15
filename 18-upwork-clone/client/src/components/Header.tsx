import logo from "../assets/logo/logo.png"
import "./Header.css"

export default function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="upwork logo" className="logo" />
      </div>
      <nav className="links-container">
        <a>
          <span>Find talent </span>
          <span className="material-symbols-outlined links-arrow">
            keyboard_arrow_up
          </span>
        </a>
        <a>
          <span>Find work </span>
          <span className="material-symbols-outlined links-arrow">
            keyboard_arrow_up
          </span>
        </a>
        <a>
          <span>Why Upwork </span>
          <span className="material-symbols-outlined links-arrow">
            keyboard_arrow_up
          </span>
        </a>
        <a>
          <span>What's new </span>
          <span className="material-symbols-outlined links-arrow">
            keyboard_arrow_up
          </span>
        </a>
      </nav>
      <div className="buttons-container">
        <button className="login-btn">Log in</button>
        <button className="signup-btn green-btn">Sign up</button>
      </div>
    </div>
  )
}
