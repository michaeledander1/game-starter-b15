import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities'
import {IsBoard, getTransitions, isValidTransition, calculateWinner, /*finished*/} from './logic'
import { Validate } from 'class-validator'
import {io} from '../index'

class GameUpdate {

  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
}

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity, 
      user,
      symbol: 'x'
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game, 
      user,
      symbol: 'o'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    // The 'update' here contains the from json text decoded new board, that we 
    // provided to the REST request in the .send method of the client
    @Body() update: GameUpdate
  ) {
    // Game = Game at server side
    // .findOneById is a method that is inhereted from the magic BaseEntity class (see controller)
    // So: 'const game' we can see as 'const oldgame' actually
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    //Player is a combi of a user at a game, so that's why we need 2 arguments
    const player = await Player.findOne({ user, game })

    // PROBABLY, NOT SURE, the Errors 'thrown' in this code are caught on the client-side
    // by the .catch methods.

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    
    if (!isValidTransition(player.symbol, game.board, update.board)) {
      throw new BadRequestError(`Invalid move`)
    }    

    const changes = getTransitions(game.board, update.board)
    // here we know that changes is an array with exactly ONE object
    // The row and column number where the change occurred are
    // in changes[0].rowIndex and changes[0].colIndex
    const rowNum = changes[0].rowIndex
    const colNum = changes[0].colIndex
    if (game.board[rowNum][colNum] === 'c') {
      if (player.symbol == 'x') {
      update.board[rowNum][colNum] = 'X'
      } else if (player.symbol == 'o') {
      update.board[rowNum][colNum] = 'O'
      }
    }

    const winner = calculateWinner(update.board)
    if (winner) {
      game.winner = player.symbol
      game.status = 'finished'
    }
    // else if (finished(update.board)) {
    //   game.status = 'finished'
    // }
    else {
      game.turn = player.symbol === 'x' ? 'o' : 'x'
    }
    // Next line stores board as received via the REST call into the
    // board of the current game IN MEMORY
    game.board = update.board
    // Below really SAVES the game status FROM MEMORY TO THE DATABASE
    await game.save()
    
    // The REST call has to give feedback to the client side.
    // it's either the emit thing, or the return
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

