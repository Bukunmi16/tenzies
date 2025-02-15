import Die from "./Die"
import { useState } from "react";
import { nanoid } from "nanoid";
import {useWindowSize} from "react-use"
import ReactConfetti from "react-confetti";

export default function Main() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  
  const isGameWon = dice.every(die => die.value === dice[0].value) && dice.every(die => die.isHeld)
  

  function generateAllNewDice() {
    return new Array(10)
    .fill(0)
    .map(() =>  ({
      value: Math.floor(Math.random()*6) + 1,
      isHeld: false,
      id: nanoid()
    }))
    
  }  
  
  function regenerateAllNewDice() {
    setDice(oldDice => oldDice.map(die =>  die.isHeld === true ? 
      {...die} : 
      {...die, value: Math.floor(Math.random()*6) + 1}
    ))
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die =>  die.id === id ? 
      {...die, isHeld: !die.isHeld} : die
    ))
  }  


  const diceElements = dice.map((die) => 
    <Die 
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdFunc={() => hold(die.id)}
    />)

    const { width, height } = useWindowSize()

    function newGame() {
      window.location.reload()
    }

    return(
    <main>
      {isGameWon && 
      <ReactConfetti
      width={width}
      height={height}
      />
      }
      <div className='background'>
      <div className="game-board">
      { isGameWon && <p className="game-won">You Won!!!</p>}
        <div className="game-info">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it
            at its current value between rolls.
          </p>
        </div>
        <div className="die-container">
          {diceElements}
        </div>
      <button onClick={ isGameWon ?  newGame : regenerateAllNewDice  } className="roll-die">{isGameWon ? "New Game" : "Roll"}</button>
      </div>
      
      </div>
    </main> 
    )
}