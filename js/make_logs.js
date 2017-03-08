import addItems from 'shared/phaser/methods/add_items/0.1';

const CROPS = [
    [100, 0, 220, 100],
    [460, 0, 350, 100],
    [830, 0, 415, 100],
];

const BODIES = [
    [220, 100, 0, 0],
    [350, 100, 0, 0],
    [415, 100, 0, 0],
];

const OFFSETS = {
    platforms: 0,
    ground: 40
};

export default function () {
    _.each(OFFSETS, (offset, location) => {
        _.each(this[location].children, platform => {
            let index;
            if (platform.hasLog) {
                index = Math.floor(Math.random() *
                    (platform.width > 300 ? 3 : platform.width > 150 ? 2 : 1));
                addItems.call(this, {
                    group: 'logs',
                    defaultOpts: {
                        image: 'logs',
                        scale: [.5, .5],
                        alpha: .8,
                        collideWorldBounds: false,
                        checkCollisionLeft: false,
                        checkCollisionRight: false,
                    }
                }, [{
                    top: platform.top + offset - 35,
                    left: platform.left,
                    crop: CROPS[index],
                    body: BODIES[index],
                }]);
            }
        });
    });
}
