import Game from 'shared/phaser/components/game/0.1';
import preload from './js/preload';
import create from './js/create';
import update from './js/update';
import helpers from './js/helpers';

import optsArray from './js/opts';

var opts = optsArray[location.search.split('v=')[1] - 1 || 0];

ENVIRONMENT.MEDIA += 'Games/WasteBusters/';

new Game({
    width: 960,
    height: 540,
    preload,
    create,
    update,
    helpers,
    opts,
});
