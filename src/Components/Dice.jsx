export default function Dice(props) {
  const pipPatterns = {
    1: [[1,1]],
    2: [[0,0], [2,2]],
    3: [[0,0], [1,1], [2,2]],
    4: [[0,0], [0,2], [2,0], [2,2]],
    5: [[0,0], [0,2], [1,1], [2,0], [2,2]],
    6: [[0,0], [0,2], [1,0], [1,2], [2,0], [2,2]],
  };

  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "#f0f0f0",
    borderRadius: "12px",
    width: "60px",
    height: "60px",
    display: "grid",
    gridTemplateRows: "repeat(3, 1fr)",
    gridTemplateColumns: "repeat(3, 1fr)",
    placeItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.2s ease",
  };

  // Create 3x3 grid of pips, mark active according to pattern
  const pips = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const isActive = pipPatterns[props.value]?.some(
        ([r, c]) => r === row && c === col
      );
      pips.push(
        <span
          key={`${row}-${col}`}
          className={`pip ${isActive ? "active" : ""}`}
        />
      );
    }
  }

  return (
    <div className="dice" style={style} onClick={props.hold}>
      {pips}
    </div>
  );
}
