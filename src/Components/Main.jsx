// import { useEffect, useState,useRef } from "react";
// import Dice from "./Dice.jsx";
// import { nanoid } from "nanoid";
// import Confetti from "react-confetti";
// import { useWindowSize } from "@react-hook/window-size";

// export default function Main() {
//   const [diceNum, setDiceNum] = useState(()=>getRandomNumber()); //state to hold dice numbers
//   const gameWon= diceNum.every((die) => die.isHeld) && diceNum.every((die) => die.value === diceNum[0].value);
//   const [width, height] = useWindowSize();
//   const buttonref = useRef(null);
//   console.log("buttonref",buttonref.current);

//   // useEffect(() => {
//   //   if (gameWon) {
//   //     console.log("Game Won");
//   //   }
//   // }, [diceNum]);
//   useEffect(()=>
//   {
//     if(buttonref.current)
//     {
//       buttonref.current.focus();
//     }
//   },[gameWon])

//   function getRandomNumber() {
//     return new Array(10).fill(0).map(() => ({
//       value: Math.floor(Math.random() * 6) + 1,
//       isHeld: false,
//       id: nanoid(),
//     }));
//   }

//   function rollDice() {
//     if(!gameWon)
//     {

//       setDiceNum((oldDice) =>
//         oldDice.map((die) =>
//           die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
//     )
//   );
// }else{
//   setDiceNum(getRandomNumber());
// }
//   }
//   function hold(id) {
//     setDiceNum((oldDice) => {
//       return oldDice.map((DieObj) => {
//         return DieObj.id === id
//           ? { ...DieObj, isHeld: !DieObj.isHeld }
//           : DieObj;
//       });
//     });
//   }
//   const diceElements = diceNum.map((DieObj) => (
//     <Dice
//       key={DieObj.id}
//       value={DieObj.value}
//       isHeld={DieObj.isHeld}
//       hold={() => hold(DieObj.id)}
//     />
//   ));

//   return (
//     <main className="container">
//       {gameWon && <Confetti width={width} height={height} />}

//       <p>
//         Roll until all dice are the same .Click each die to freeze it at current
//         value between rolls.
//       </p>
//       <div className="dice-sec">{diceElements}</div>
//       <button ref={buttonref} className="roll-btn" onClick={rollDice}>
//         <span>{gameWon ? "Next Game":"Roll"}</span>
//       </button>
//     </main>
//   );
// }





// import { useEffect, useState, useRef } from "react";
// import Dice from "./Dice.jsx";
// import { nanoid } from "nanoid";
// import Confetti from "react-confetti";
// import { useWindowSize } from "@react-hook/window-size";

// export default function Main() {
//   function getRandomNumber() {
//     return new Array(10).fill(0).map(() => ({
//       value: Math.floor(Math.random() * 6) + 1,
//       isHeld: false,
//       id: nanoid(),
//     }));
//   }

//   const [diceNum, setDiceNum] = useState(() => getRandomNumber());
//   const gameWon = diceNum.every((die) => die.isHeld) && diceNum.every((die) => die.value === diceNum[0].value);
//   const [width, height] = useWindowSize();
//   const buttonRef = useRef(null);

//   // 🕒 TIMER STATES
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(true);

//   // ⏱ Start/stop timer
//   useEffect(() => {
//     let interval;
//     if (isRunning && !gameWon) {
//       interval = setInterval(() => setTime(prev => prev + 1), 1000);
//     } else if (gameWon) {
//       setIsRunning(false);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, gameWon]);

//   // 🎯 Focus button on win
//   useEffect(() => {
//     if (buttonRef.current) {
//       buttonRef.current.focus();
//     }
//   }, [gameWon]);

//   // 🔄 Roll or Reset
//   function rollDice() {
//     if (!gameWon) {
//       setDiceNum(oldDice =>
//         oldDice.map(die =>
//           die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
//         )
//       );
//     } else {
//       setDiceNum(getRandomNumber());
//       setTime(0);
//       setIsRunning(true);
//     }
//   }

//   function hold(id) {
//     setDiceNum(oldDice =>
//       oldDice.map(die =>
//         die.id === id ? { ...die, isHeld: !die.isHeld } : die
//       )
//     );
//   }

//   const diceElements = diceNum.map(die => (
//     <Dice
//       key={die.id}
//       value={die.value}
//       isHeld={die.isHeld}
//       hold={() => hold(die.id)}
//     />
//   ));

//   return (
//     <main className="container">
//       {gameWon && <Confetti width={width} height={height} />}
      
//       {/* 👇 Add Timer Display */}
//       <div className="timer">⏱ Time: {time}s</div>

//       <p>
//         Roll until all dice are the same. Click each die to freeze it at current
//         value between rolls.
//       </p>

//       <div className="dice-sec">{diceElements}</div>

//       <button ref={buttonRef} className="roll-btn" onClick={rollDice}>
//         <span>{gameWon ? "Next Game" : "Roll"}</span>
//       </button>
//     </main>
//   );
// }



import { useEffect, useState, useRef } from "react";
import Dice from "./Dice.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

// Import sound files
import rollSound from "../assets/sounds/dice.wav";
import winSound from "../assets/sounds/win.wav";
import holdSound from "../assets/sounds/hold.mp3";

export default function Main() {
  const [diceNum, setDiceNum] = useState(() => getRandomNumber());
  const gameWon = diceNum.every(die => die.isHeld) && diceNum.every(die => die.value === diceNum[0].value);
  const [width, height] = useWindowSize();
  const buttonRef = useRef(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Audio instances
  const rollAudio = useRef(new Audio(rollSound));
  const winAudio = useRef(new Audio(winSound));
  const holdAudio = useRef(new Audio(holdSound));

  useEffect(() => {
    let interval;
    if (isRunning && !gameWon) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    } else if (gameWon) {
      setIsRunning(false);
      winAudio.current.play(); // Play win sound
    }
    return () => clearInterval(interval);
  }, [isRunning, gameWon]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function getRandomNumber() {
    return new Array(10).fill(0).map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

 function rollDice() {
  if (!gameWon) {
    rollAudio.current.play();
    setDiceNum(oldDice =>
      oldDice.map(die =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  } else {
    // 🛑 Stop win sound if playing
    winAudio.current.pause();
    winAudio.current.currentTime = 0;

    setDiceNum(getRandomNumber());
    setTime(0);
    setIsRunning(true);
  }
}


  function hold(id) {
    holdAudio.current.play(); // Play hold sound
    setDiceNum(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = diceNum.map(die => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ));

  return (
    <main className="container">
      {gameWon && <Confetti width={width} height={height} />}

      <div className="timer">⏱ Time: {time}s</div>

      <p>
        Roll until all dice are the same. Click each die to freeze it at current
        value between rolls.
      </p>

      <div className="dice-sec">{diceElements}</div>

      <button ref={buttonRef} className="roll-btn" onClick={rollDice}>
        <span>{gameWon ? "Next Game" : "Roll"}</span>
      </button>
    </main>
  );
}

