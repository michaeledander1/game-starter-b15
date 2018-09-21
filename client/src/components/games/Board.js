import React from 'react'
import './Board.css'

import ballRed from '../../images/pingPongBallRedSmall.png'
import ballBlue from '../../images/pingPongBallBlueSeaSmall.png'
import cupRed from '../../images/beerPongCupRed.png'
import cupBlue from '../../images/beerPongCupBlueSea.png'
import nothing from '../../images/nothing.png'

// const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
//   return (
//     <button
//       className="board-tile"
//       disabled={hasTurn}
//       onClick={() => makeMove(rowIndex, cellIndex)}
//       key={`${rowIndex}-${cellIndex}`}
//     >{symbol || '-'}</button>
//   )
// }

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  if (symbol === 'o'){
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >
    <img className="beerpongballs" src={ballRed} alt="ballRed" />
    </button>
  ) 
  } else if (symbol === 'x'){
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      ><img className="beerpongballs" src={ballBlue} alt="ballBlue" /></button>
    )
  } else if (symbol === 'O'){
      return (
        <button
          className="board-tile"
          disabled={hasTurn}
          onClick={() => makeMove(rowIndex, cellIndex)}
          key={`${rowIndex}-${cellIndex}`}
        >
        <img className="beerpongcups" src={cupRed} alt="cupRed" />
        </button>
      )
  } else if (symbol === 'X'){
    return (
      <button 
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      ><img className="beerpongcups" src={cupBlue} alt="cupBlue" /></button>
    )
  } else {
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      >
      <img className="invisible" src={nothing} alt="nothing"/>
      </button>
    )
  }
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex} className='rows'>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
