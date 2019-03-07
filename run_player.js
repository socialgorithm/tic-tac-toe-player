const readline = require('readline');

function main() {
  const playerImplementation = process.argv[2] ? process.argv[2] : 'random';
  runPlayer(playerImplementation);
}

function runPlayer(playerImplementation) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Load player's code
  const PlayerImplementation = require(`./players/${playerImplementation}.js`);
  let player = new PlayerImplementation(1);

  rl.on('line', function (input) {
    const parts = input.split(' ');
    const action = parts[0];

    let next, coords;

    console.log('RECEIVED MESSAGE', input);

    switch (action) {
      case 'init':
        player.init();
        break;
      case 'move':
        try {
          coords = player.getMove();
          // player.addMove(coords.board, coords.move);
          writeMove(coords);
        } catch (e) {
          console.error('Player Error: Failed to get a move', e);
        }
        break;
      case 'opponent':
        // the move will be in the format row,col format
        const moveCoords = parts[1].split(',').map((coord) => parseInt(coord, 10));
        player.onOpponentMove(
          [
            moveCoords[0],
            moveCoords[1]
          ]
        );
        if (!player.game.isFinished()) {
          coords = player.getMove();
          writeMove(coords);
        }
        break;
    }
  });
}

function writeMove(coords) {
  console.log('write move', coords);
  const move = coords[0] + ',' + coords[1];
  write(move);
}

function write(output) {
  if (output) {
    console.log(output);
  }
}

main();