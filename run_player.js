const readline = require('readline');
const GameLogic = require('./players/random.js');

function input() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Load player's code
  let player = new GameLogic(1);

  rl.on('line', function (input) {
    const parts = input.split(' ');
    const action = parts[0];

    let next, coords;

    switch (action) {
      case 'init':
        player.init();
        break;
      case 'move':
        try {
          coords = player.getMove();
          player.addMove(coords.board, coords.move);
          writeMove(coords);
        } catch (e) {
          console.error('Player Error: Failed to get a move', e);
        }
        break;
      case 'opponent':
        // the move will be in the format row,col format
        const moveCoords = parts[1].split(',').map((coord) => parseInt(coord, 10));
        player.addOpponentMove(
          [
            boardCoords[0],
            boardCoords[1]
          ],
          [
            moveCoords[0],
            moveCoords[1]
          ]
        );
        if (!player.game.isFinished()) {
          coords = player.getMove();
          player.addMove(coords.board, coords.move);
          writeMove(coords);
        }
        break;
    }
  });
}

function writeMove(coords) {
  const move = coords.board[0] + ',' + coords.board[1];
  write(move);
}

function player() {
  input();
}

function write(output) {
  if (output) {
    console.log(output);
  }
}

player();