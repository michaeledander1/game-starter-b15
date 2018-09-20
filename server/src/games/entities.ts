import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne, BeforeInsert } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o' | 'c' | 'a' | '-' | 'X' | 'O'
export type Row = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row, Row, Row, Row, Row, Row, Row, Row]

const cupRowFarFarRight: Row = [null, null, null, null, 'c']
const cupRowFarRight: Row = [null, null, null, 'c', null]
const cupRowCenter: Row = [null, 'c', null, null, null]
const cupRowLeft: Row = ['c', null, null, null, null]
const cupRowRight: Row = [null, null,  'c', null, null]
const emptyRow: Row = [null, null, null, null, null]
const emptyBoard: Board = [ cupRowLeft, emptyRow, cupRowRight, emptyRow, cupRowFarRight, emptyRow, 
  emptyRow, cupRowFarFarRight, cupRowCenter, emptyRow ]

type Status = 'pending' | 'started' | 'finished'

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function makeNewBoard() {
  const newBoard = shuffle(emptyBoard)
  return newBoard
}


@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  // OUR DEFAULT WILL BE A RANDOMIZED BOARD 
  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
  
  @BeforeInsert()
    newBoard() {
      this.board = makeNewBoard();
    }
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol

}
