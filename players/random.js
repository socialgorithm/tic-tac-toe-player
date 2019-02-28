const ME = require("@socialgorithm/ultimate-ttt/dist/model/constants").ME;
const OPPONENT = require("@socialgorithm/ultimate-ttt/dist/model/constants").OPPONENT;
const SubBoard = require("@socialgorithm/ultimate-ttt/dist/SubBoard").default;

class GameLogic {
  constructor(player) {
    if (!player || player < ME || player > OPPONENT) {
      throw new Error('Invalid player');
    }

    this.player = player;
    this.opponent = 1 - player;

    this.init();
  }

  init() {
    this.game = new SubBoard(this.size);
  }

  onFirstMoveRequest() {
    const myMove = getRandomValidMove();
    this.game = this.game.addMyMove(myMove);

    return myMove;
  }

  onOpponentMove(opponentMove) {
    this.game = this.game.addOpponentMove(opponentMove);

    const myMove = getRandomValidMove();
    this.game = this.game.addMyMove(myMove);

    return myMove;
  }

  getRandomValidMove() {
    const move = this.findRandomPosition();

    return {
      move: move
    };
  }

  /**
   * Get a random position to play in a board
   * @returns {[number,number]} Position coordinates [row, col]
   */
  findRandomPosition() {
    if (game.isFull() || game.isFinished()) {
      console.error('This board is full/finished', board);
      console.error(game.prettyPrint());
      return;
    }
    const validMoves = game.getValidMoves();
    if (validMoves.length === 0) {
      // this case should never happen :)
      throw new Error('Error: There are no moves available on this board');
    }

    return validMoves[
      Math.floor(Math.random() * validMoves.length)
    ];
  }
}

module.exports = GameLogic;