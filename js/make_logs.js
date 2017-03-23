import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    const crops = [
        [100, 0, 220, 100],
        [460, 0, 350, 100],
        [830, 0, 415, 100],
    ];

    const bodies = [
        [220, 100, 0, 0],
        [350, 100, 0, 0],
        [415, 100, 0, 0],
    ];

    const offsets = {
        platforms: 0,
        ground: 40
    };

    _.each(offsets, (offset, location) => {
        _.each(this[location].children, platform => {
            var index;
            if (platform.left < 400 || platform.left > this.game.world.width - 400) return;
            if (Math.random() < this.opts[location + 'LogChance']) {
                platform.hasLog = true;
                index = Math.floor(Math.random() *
                    (platform.width > 300 ? 3 : platform.width > 150 ? 2 : 1));
                addItems.call(this, {
                    group: 'logs',
                    defaultOpts: {
                        image: 'logs',
                        scale: [.5, .5],
                        alpha: .8,
                        collideWorldBounds: false,
                        checkCollisionRight: false,
                        checkCollisionLeft: false,
                    }
                }, [{
                    top: platform.top + offset - 35,
                    left: platform.left,
                    crop: crops[Math.floor(index)],
                    body: bodies[index],
                }]);
            }
        });
    });
}
