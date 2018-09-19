import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, /*Row,*/ Player, Game } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null, 'c', 'a' ]
    return board.length === 5 &&
      board.every(row =>
        row.length === 3 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

export const isValidTransition = (playerSymbol: Symbol, gameSymbol: Symbol, from: Board, to: Board): boolean => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol, 
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a,b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length === 1 && 
    changes[0].to === (playerSymbol || gameSymbol) &&
    ((changes[0].from === null) || (changes[0].from === 'c'))
}

export const calculateWinner = (player: Player): boolean => {
  if (player.cupsclicked === 2) {
    return true
  } else {
    return false }
}

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)
