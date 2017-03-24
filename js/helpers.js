import scaleItem from 'shared/phaser/methods/scale_item/0.1';
import addItems from 'shared/phaser/methods/add_items/0.1';

import makeBackground from './make_background';
import makeGround from './make_ground';
import makePlatforms from './make_platforms';
import placeLogs from './place_logs';
import makeLogs from './make_logs';
import makeItems from './make_items';


export default {
    emitData() {
        //  emit event with data to skoash game
        this.emitEvent({
            updateGameState: {
                path: ['game'],
                data: this.data
            }
        });
    },
    onHitBush() {
        this.audio.bush.play();
    },
    hitEnemy(p, e) {
        if (!e.active) return;
        this.helpers.hitSomething.call(this, p);
        this.audio.hole.play();
    },
    hitObstacle(p) {
        this.helpers.hitSomething.call(this, p);
        this.audio.stump.play();
    },
    hitWater(p) {
        this.helpers.hitSomething.call(this, p, 1, 1);
        this.audio.water.play();
    },
    hitSomething(p, i = 1, d = -1) {
        if (this.isHit) return;
        this.isHit = true;
        p.body.velocity.y = -1 * this.opts.hitVelocity;

        p.body.velocity.x = (p.body.velocity.x === Math.abs(p.body.velocity.x) ?
            d : -1 * d) * this.opts.hitVelocity;

        setTimeout(() => {
            this.isHit = false;
        }, 1000);

        this.data.hits += i;
        this.helpers.emitData.call(this);
        setTimeout(() => {
            if (this.data.hits >= this.opts.hitsPerLife) {
                this.data.hits -= this.opts.hitsPerLife;
                this.data.lives--;
                this.helpers.emitData.call(this);
            }
        }, 250);
    },
    activateSnake(snake, hole) {
        var climb;
        var shouldClimbUp = !snake.active && !snake.climbing;
        var shouldClimbDown = (
            snake.active &&
            !snake.climbing &&
            snake.body.velocity.x > 0 &&
            snake.left < hole.left &&
            snake.left > hole.left - 80
        );

        if (shouldClimbUp) {
            snake.left = hole.left - 25;
            snake.loadTexture(snake.originalImage + 'up', 0);
            climb = snake.animations.add('hole', [0, 1, 2, 3, 4, 5, 6], 10, false);
            climb.onComplete.add(() => {
                snake.loadTexture(snake.originalImage, 5);
                snake.scale.setTo(.3, .3);
                snake.left = snake.left - 25;
                snake.top = snake.top - 25;
                snake.animations.add('left', [5, 4, 3, 2, 1, 0], 10, true);
                snake.animations.add('right', [6, 7, 8, 9, 10, 11], 10, true);
                snake.animations.play('left');
                snake.body.velocity.x = -100;
                setTimeout(() => {
                    snake.climbing = false;
                }, 5000);
            });
            snake.width = 140;
            snake.height = 100;
            snake.animations.play('hole');
            snake.active = true;
            snake.climbing = true;
        } else if (shouldClimbDown) {
            snake.left = hole.left - 75;
            snake.body.velocity.x = 0;
            snake.loadTexture(snake.originalImage + 'down', 0);
            snake.left = snake.left + 25;
            snake.top = snake.top + 25;
            climb = snake.animations.add('hole', [0, 1, 2, 3, 4, 5, 6], 10, false);
            climb.onComplete.add(() => {
                snake.loadTexture(null, 0);
                snake.scale.setTo(.3, .3);
                snake.left = snake.left - 25;
                setTimeout(() => {
                    snake.climbing = false;
                }, 5000);
            });
            snake.width = 140;
            snake.height = 100;
            snake.animations.play('hole');
            snake.active = false;
            snake.climbing = true;
        }
    },
    turnAround(enemy) {
        if (enemy.isTurning) return;
        enemy.isTurning = true;
        enemy.body.velocity.x = -1 * enemy.body.velocity.x;
        enemy.animations.play(enemy.body.velocity.x < 0 ? 'left' : 'right');
        setTimeout(() => {
            enemy.isTurning = false;
        }, 500);
    },
    inLog(player, log) {
        if (log.key !== 'logs' || !this.player.canJump) return;
        this.player.canJump = false;
        scaleItem(this.player, {
            scale: this.opts.playerLogScale,
            body: this.opts.playerBody,
        });
        this.audio.log.play();
        setTimeout(() => {
            if (!this.game.physics.arcade.overlap(this.player, this.logs)) {
                this.player.canJump = true;
                scaleItem(this.player, {
                    scale: this.opts.playerScale,
                    body: this.opts.playerBody,
                });
            }
        }, 100);
    },
    collectRecycling(player, recyclying) {
        // Removes the recyclying from the screen
        recyclying.kill();
        this.audio.recycle.play();
        //  update the lives
        this.data.score += this.opts.recyclingScore;
        this.helpers.emitData.call(this);
    },
    collectRainbowRecycling(player, recyclying) {
        // Removes the recyclying from the screen
        recyclying.kill();
        this.audio.rainbowRecycle.play();
        //  update the lives
        this.data.score += this.opts.rainbowRecyclyingScore;
        this.helpers.emitData.call(this);
    },
    collectHeart(player, heart) {
        if (this.data.lives === this.opts.maxLives) return;
        // Removes the heart from the screen
        heart.kill();
        this.audio.heart.play();
        //  update the lives
        this.data.lives++;
        this.helpers.emitData.call(this);
    },
    collectLightening(player, lightening) {
        player.boost = (player.boost + 1) || 1;
        lightening.kill();
        this.audio.lightening.play();
        this.helpers.updatePlayer.call(this);
        setTimeout(() => {
            player.boost--;
            this.helpers.updatePlayer.call(this);
        }, this.opts.boostTime);
    },
    collectBags(player, bag) {
        if (this.data.bagCount === this.opts.maxBags) {
            this.helpers.missBag.call(this);
            return;
        }
        // Removes the bag from the screen
        bag.kill();
        this.audio.bag.play();
        //  update the bagCount
        this.data.bagCount++;
        this.helpers.updatePlayer.call(this);
        this.helpers.emitData.call(this);
    },
    missBag: _.debounce(function () {
        this.audio.miss.play();
    }, 1000, {leading: true, trailing: false}),
    updatePlayer() {
        if (this.player.boost) {
            this.player.loadTexture('jet', 3);
            this.player.animations.add('left', this.opts.boostLeftFrames,
                this.opts.boostLeftFrameRate, this.opts.boostLeftLoop);
            this.player.animations.add('right', this.opts.boostRightFrames,
                this.opts.boostRightFrameRate, this.opts.boostRightLoop);
        } else {
            if (this.data.bagCount === this.opts.maxBags) {
                this.player.loadTexture('turtle5', this.player.frame);
            } else if (this.data.bagCount >= this.opts.maxBags / 2) {
                this.player.loadTexture('turtle3', this.player.frame);
            } else {
                this.player.loadTexture('turtle', this.player.frame);
            }
            this.player.animations.add('left', this.opts.leftFrames,
                this.opts.leftFrameRate, this.opts.leftLoop);
            this.player.animations.add('right', this.opts.rightFrames,
                this.opts.rightFrameRate, this.opts.rightLoop);
        }
    },
    stay(a) {
        a.body.gravity.y = 0;
        a.body.velocity.y = 0;
    },
    loadTruck(player, truck) {
        if (truck.driving || this.data.bagCount !== this.opts.maxBags) return;
        truck.driving = true;
        setTimeout(() => {
            this.audio.truck.play();
        }, 500);
        truck.animations.play('drive');
        this.data.bagCount = 0;
        this.data.levels[this.opts.level].trucks++;
        this.helpers.updatePlayer.call(this);
        if (this.data.levels[this.opts.level].trucks === this.opts.maxTrucks) {
            this.doors.children[0].animations.play('open');
            this.data.levels[this.opts.level].doorOpen = true;
        }
        this.helpers.emitData.call(this);
    },
    makeBackground,
    makeGround,
    makePlatforms,
    placeLogs,
    makeLogs,
    makeItems,
    makeDoor() {
        addItems.call(this, {
            group: 'doors'
        }, [{
            image: 'door',
            gravityY: 100,
            body: [200, 200, 25, 25],
            scale: [.5, .5],
            collideWorldBounds: false,
            left: this.game.world.width - 90,
            top: 0,
        }]);

        this.doors.children[0].animations.add('open', [5, 4, 3, 2, 1, 0], 10, false);
        this.doors.children[0].animations.add('close', [0, 1, 2, 3, 4, 5], 10, false);
        this.doors.children[0].animations.play('close');
    },
    exit() {
        if (this.data.levels[this.opts.level].trucks !== this.opts.maxTrucks) return;
        if (this.data.levels[this.opts.level].complete) return;
        this.data.levels[this.opts.level].complete = true;
        this.player.body.collideWorldBounds = false;
        this.helpers.emitData.call(this);
        setTimeout(() => {
            this.doors.children[0].animations.play('close');
            this.data.levels[this.opts.level].doorOpen = false;
            this.helpers.emitData.call(this);
            this.player.body.velocity.x = 0;
        }, 2500);
    }
};
