import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, /*Row,*/ } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null, 'c', 'a', '-', 'X', 'O']
    return board.length === 10 &&
      board.every(row =>
        row.length === 5 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

// Next function returns changes as an array of objects, each with 4 fields:
// rowIndex (number), colIndex(number), from (symbol), to (symbol)
//
// Example values:
// (1) In case only one of the 3x5 fields was change one could have:
//     [{rowIndex: 0, colIndex: 2, from: '-', to: 'x'}]
// (2) In case two of the 3x5 fields have been changed one could have:
//     [{rowIndex: 1, colIndex:0, from: '-', to: 'x'},
//      {rowIndex: 2, colIndex:2, from: 'c', to: 'o'}
//     ]

export const getTransitions = (from: Board, to: Board) => {
  return from.map(
    (row, rowIndex) => row.map((symbol, columnIndex) => ({
      rowIndex: rowIndex,
      colIndex: columnIndex,
      from: symbol, 
      to: to[rowIndex][columnIndex]
    }))
  )
  .reduce((a,b) => a.concat(b))
  .filter(change => change.from !== change.to)
}

export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
  const changes = getTransitions(from, to)
  console.log(`this is changes[0]!!!!!!!!!!!!!!!!!!! ${changes[0].from}`)
  return changes.length === 1 && 
    changes[0].to === (playerSymbol) && (
      (changes[0].from === null) || 
      (changes[0].from === 'c') ||
      (changes[0].from === '-')
    )
}

export const calculateWinner = (updatedBoard: Board): boolean => {
  const winnerScoreX = updatedBoard
    .map(array => array.includes('X'))
    .filter(trueOrFalse => trueOrFalse)
    .length
  const winnerScoreO = updatedBoard
    .map(array => array.includes('O'))
    .filter(trueOrFalse => trueOrFalse)
    .length
  if (winnerScoreX === 3 || winnerScoreO === 3) {
    return true
  } else {
    return false
  }
}

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)
