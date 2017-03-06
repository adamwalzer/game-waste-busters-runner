import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    var left = 0;
    var groundOpts = [];
    var waterOpts = [];
    var random = 2;

    let crops = [
        [20, 0, 380, 210],
        [545, 0, 200, 210],
        [865, 0, 380, 210],
        [1405, 0, 200, 210],
    ];

    let bodies = [
        [380, 140, 0, 60],
        [200, 140, 0, 60],
        [380, 140, 0, 60],
        [200, 140, 0, 60],
    ];

    while (left < this.game.world.width) {
        random = _.random(random > 1 || left > this.game.world.width - 600 ?
            crops.length / 2 - 1 : crops.length - 1);
        let crop = crops[random];
        let body = bodies[random];

        if (random < 2) {
            groundOpts.push({
                left,
                crop,
                body,
            });
        } else {
            waterOpts.push({
                left,
                crop,
                body,
            });
        }

        left += crop[2] - 3;
    }

    let defaultOpts = {
        top: 330,
        collideWorldBounds: false,
        image: 'ground',
    };

    delete this.ground;

    addItems.call(this, {
        group: 'ground', defaultOpts
    }, groundOpts);

    addItems.call(this, {
        group: 'water', defaultOpts
    }, waterOpts);
}
