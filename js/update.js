import addResponses from 'shared/phaser/methods/add_responses/0.1';
import movePlayer from 'shared/phaser/methods/move_player/0.1';

export default function () {
    this.player.canJump = true;

    addResponses.call(this, 'collide', [
    [this.player, this.ground],
    [this.player, this.water, this.helpers.hitWater],
    [this.player, this.platforms],
    [this.player, this.bushes, this.helpers.hitBush],
    [this.player, this.obstacles, this.helpers.hitObstacle],
    [this.player, this.logs],
    [this.bushes, this.ground, this.helpers.stay],
    [this.bushes, this.platforms, this.helpers.stay],
    [this.trees, this.ground, this.helpers.stay],
    [this.trees, this.platforms, this.helpers.stay],
    [this.snakes, this.ground, this.helpers.stay],
    [this.snakes, this.platforms, this.helpers.stay],
    [this.snakes, this.water, this.helpers.turnAround],
    [this.holes, this.ground, this.helpers.stay],
    [this.bags, this.ground, this.helpers.stay],
    [this.bags, this.platforms, this.helpers.stay],
    [this.obstacles, this.ground, this.helpers.stay],
    [this.obstacles, this.platforms, this.helpers.stay],
    [this.doors, this.ground, this.helpers.stay],
    ]);

    addResponses.call(this, 'overlap', [
    [this.player, this.logs, this.helpers.inLog],
    ]);

    if (!_.get(this, `data.levels.${this.opts.level}.complete`)) {
        if (this.player.boost) {
            movePlayer.call(this, {
                upSpeed: this.opts.boostUpSpeed,
                downSpeed: this.opts.boostDownSpeed,
                leftSpeed: this.opts.boostLeftSpeed,
                rightSpeed: this.opts.boostRightSpeed,
                stopFrame: this.opts.boostPlayerStopFrame,
                jumpSound: this.audio.jump,
            });
        } else {
            movePlayer.call(this, {
                upSpeed: this.opts.upSpeed,
                downSpeed: this.opts.downSpeed,
                leftSpeed: this.opts.leftSpeed,
                rightSpeed: this.opts.rightSpeed,
                stopFrame: this.opts.playerStopFrame,
                jumpSound: this.audio.jump,
            });
        }
    } else if (_.get(this, `data.levels.${this.opts.level}.doorOpen`)) {
        this.player.body.velocity.x = 150;
        this.player.body.collideWorldBounds = false;
        this.player.animations.play('right');
        this.game.physics.arcade.enable(this.player);
    }

    if (this.controller.pause) {
        this.controller = { pause: true };
        return;
    }

    addResponses.call(this, 'overlap', [
    [this.player, this.bags, this.helpers.collectBags],
    [this.player, this.hearts, this.helpers.collectHeart],
    [this.player, this.recycles, this.helpers.collectRecycling],
    [this.player, this.rainbowRecycles, this.helpers.collectRainbowRecycling],
    [this.player, this.trucks, this.helpers.loadTruck],
    [this.player, this.doors, this.helpers.exit],
    [this.player, this.lightening, this.helpers.collectLightening],
    [this.player, this.snakes, this.helpers.hitEnemy],
    [this.snakes, this.holes, this.helpers.activateSnake],
    ]);

    this.game.camera.x =
        Math.min(Math.max(this.player.centerX - 400, 0), this.game.world.width - 800);

    this.clouds.children[0].position.x = -.25 * this.player.centerX;
    this.clouds.children[1].position.x = 2975.5 - .25 * this.player.centerX;
}
