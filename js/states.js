import setGameStage from 'shared/phaser/methods/set_game_stage/0.1';

import opts from './opts';
import getState from './get_state';

export default _.reduce(opts, (a, v, k) => {
    a[k] = getState(v);
    return a;
}, {
    default: {
        preload: function () {
        },
        create: function () {
            setGameStage.call(this, {
                width: 4000,
                height: 740,
                top: -200,
            });
        },
        update: function () {
            if (!this.shouldUpdate) {
                setTimeout(() => {
                    this.shouldUpdate = true;
                    this.emitEvent({ ready: true });
                }, 100);
                return;
            }
        },
    }
});
