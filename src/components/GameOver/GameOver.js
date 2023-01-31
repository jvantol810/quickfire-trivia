import React from 'react'
import './GameOver.css'

function GameOver(props) {
  
  return (
    <div className='game-over-container'>
        <h1 className='game-over-text'>Game Over</h1>
        <p className='game-over-description'>Thank you for playing!</p>
        <button className='play-again-button' onClick={props.handlePlayAgain}>Play Again</button>
    </div>
  )
}

export default GameOver