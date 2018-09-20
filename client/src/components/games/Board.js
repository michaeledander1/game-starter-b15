import React from 'react'
import './Board.css'

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
    ><img alt="ball-red" src='https://cdn8.bigcommerce.com/s-j9ozu27b9o/images/stencil/500x500/products/243/562/ping-pong-ball-red__01202__61456.1513025206__06721.1521746280.jpg?c=2'/></button>
  ) 
  } else if (symbol === 'x'){
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      ><img alt="ball-blue" src='https://images-na.ssl-images-amazon.com/images/I/31WyE7degAL._SY355_.jpg'/></button>
    )
  } else if (symbol === 'O'){
      return (
        <button
          className="board-tile"
          disabled={hasTurn}
          onClick={() => makeMove(rowIndex, cellIndex)}
          key={`${rowIndex}-${cellIndex}`}
        ><img alt="beer-red" src='https://www.a2deals.nl/wp-content/uploads/2017/09/669236881-1.jpg'/></button>
      )
  } else if (symbol === 'X'){
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      ><img alt="beer-blue" src='http://beeriton.nl/wp-content/uploads/2015/04/Beer-Pong-Cups-blauw.jpg'/></button>
    )
  } else {
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      >{'try and hit me!'}</button>
    )
  }
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
