import React from 'react'
import './Board.css'

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  )
}

// const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
//   if (symbol === 'x'){
//   return (
//     <button
//       className="board-tile"
//       disabled={hasTurn}
//       onClick={() => makeMove(rowIndex, cellIndex)}
//       key={`${rowIndex}-${cellIndex}`}
//     ><img alt="pingpongball" src='https://rlv.zcache.co.uk/pro_beer_pong_champion_ping_pong_balls-r201ee545b4444b99917d0dcc247d364d_6y0d3_540.jpg?rlvnet=1'/></button>
//   )} else if (symbol === 'o'){
//     return (
//       <button
//         className="board-tile"
//         disabled={hasTurn}
//         onClick={() => makeMove(rowIndex, cellIndex)}
//         key={`${rowIndex}-${cellIndex}`}
//       >{'ooo'}</button>
//     )
//   } else {
//     return (
//       <button
//         className="board-tile"
//         disabled={hasTurn}
//         onClick={() => makeMove(rowIndex, cellIndex)}
//         key={`${rowIndex}-${cellIndex}`}
//       >{'empty'}</button>
//     )
//   }
// }

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
