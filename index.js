import Game from 'shared/phaser/components/game/0.2';
import states from './js/states';
import helpers from './js/helpers';

window.game = new Game({
    helpers,
    states,
});
