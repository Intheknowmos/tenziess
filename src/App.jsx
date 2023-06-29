import { useEffect, useState } from 'react'
import Die from "./Die"
import './App.css'
import {nanoid} from "../node_modules/nanoid"
import Confetti from 'react-confetti'

function App() {

  const generateNewDie = () => {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    return new Array(10).fill(0).map(()=> {
      return generateNewDie()
    })
  }

  const [state, setState] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=> {
    const allHeld = state.every(each => each.isHeld)
    const firstValue = state[1].value
    const allValue = state.every(each => each.value === firstValue)
    if (allHeld && allValue) {
      setTenzies(true)
      console.log("Game won")
    }
    console.log("Dice state changed!")
  }, [state])

  

  const holdDice = (id) => {
    setState(prevState => {
      return prevState.map((each)=> {
        return each.id === id ? {...each, isHeld: !each.isHeld} : each
      })
    })
  }


  const diceElements = state.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} handleClick={()=> holdDice(die.id)}/>)


  const rollDice = () => {
    if (!tenzies) {
      setState(prevDice => {
        return prevDice.map((die)=> {
          return die.isHeld ? 
                  die : 
                  generateNewDie()
        })
      })
    } else {
      setTenzies(false)
      setState(allNewDice)
    }
  }

  

  return (
    <div className="App">
      {tenzies && <Confetti   />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-div">
        {diceElements}
      </div>
      <button className="btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  )
}

export default App
