import { useState } from "react";

import "./Input.css";

function Input() {
  const [showPassword, setShowPassword] = useState(false);

  function showPasswordHandler() {
    showPassword
      ? setShowPassword(false)
      : setShowPassword(true);
  }

  return (
    <div
      className="form-input-container"
    >
      <input
        type="text"
        placeholder="Email"
      />
      <div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <button
          className="pass-controller-btn"
          onClick={showPasswordHandler}
        >{showPassword ? "Hide" : "Show"}</button>
      </div>
    </div>
  );
}

export default Input;