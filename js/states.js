import loadAssets from 'shared/phaser/methods/load_assets/0.1';
import setGameStage from 'shared/phaser/methods/set_game_stage/0.1';

import opts from './opts';
import getState from './get_state';

export default _.reduce(opts, (a, v, k) => {
    a[k + 1] = getState(v);
    return a;
}, {
    default: {
        preload: function () {
            loadAssets.call(this, 'image', [
            ['sky', `${CMWN.MEDIA.IMAGE}game.1.bkg.sky.jpg`],
            ['clouds', `${CMWN.MEDIA.IMAGE}game.1.bkg.clouds.png`],
            ]);
        },
        create: function () {
            setGameStage.call(this, {
                width: 4000,
                height: 740,
                top: -200,
            });
            this.helpers.makeBackground.call(this);
        },
        update: function () {
            if (!this.shouldUpdate) {
                this.shouldUpdate = true;
                this.emitEvent({ ready: true });
            }
        },
    }
});
