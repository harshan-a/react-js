import "./PositionSwitcher.css";

function PositionSwitcher (props) {
  const { textboxPosition, setTextboxPosition } = props;

  const positionToChange = textboxPosition === "top" ? "bottom" : "top";

  function handleChangePosition () {
    setTextboxPosition(positionToChange);
    localStorage.setItem("position", positionToChange);
  }

  return (
    <div
      className="position-switcher-container"
    >
      <a
        className="position-switcher"
        onClick={handleChangePosition}
      >Move textbox to {positionToChange}</a>
    </div>
  )
}

export default PositionSwitcher;