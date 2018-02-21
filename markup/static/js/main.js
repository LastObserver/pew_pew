import Game from 'components/game/game';

const game = document.querySelector('.game');
const field = document.querySelector('.field');

if (game && field) {
  new Game(game, field);
}
