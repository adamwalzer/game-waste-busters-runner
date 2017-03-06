import setGameStage from 'shared/phaser/methods/set_game_stage/0.1';
//import randomizeLocations from 'shared/phaser/methods/randomize_locations/0.1';
import addPlayer from 'shared/phaser/methods/add_player/0.1';

export default function () {
    this.controller = {};
    setGameStage.call(this, {
        width: 4000,
        height: 740,
        top: -200,
    });

    this.helpers.makeBackground.call(this);
    this.helpers.makeGround.call(this);
    this.helpers.makeDoor.call(this);
    this.helpers.makePlatforms.call(this);

    addPlayer.call(this, {
        left: 32,
        top: this.game.world.height - 385,
        image: this.opts.playerImage,
        bounceY: this.opts.bounceY,
        gravityY: this.opts.gravityY,
        body: this.opts.playerBody,
        rightFrames: this.opts.rightFrames,
        leftFrames: this.opts.leftFrames,
        scale: this.opts.playerScale,
        anchor: this.opts.playerAnchor,
    });

    this.helpers.makeLogs.call(this);
    this.helpers.makeItems.call(this);

    this.data = _.defaults({
        levels: {
            [this.opts.level]: {
                start: true,
                trucks: 0,
            }
        }
    }, this.data);

    this.audio = _.reduce(this.audio, (a, v, k) => {
        a[k] = this.game.add.audio(k);
        return a;
    }, {});

    this.helpers.emitData.call(this);
}
