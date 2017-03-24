import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    const crops = [
        [200, 0, 240, 96],
        [790, 0, 350, 96],
        [1290, 0, 645, 96],
    ];

    const bodies = [
        [200, 28, 0, 40],
        [310, 28, 0, 40],
        [605, 28, 0, 40],
    ];

    const platformParams = this.opts.setPlatforms || [];

    const locations = this.opts.locations || [];

    var platformOpts = [];

    function addPlatform(location, i) {
        platformOpts.push({
            left: location[0],
            top: location[1],
            crop: crops[i],
            body: bodies[i],
        });
    }

    _.each(platformParams, params => {
        addPlatform(...params);
    });

    _.each(locations, location => {
        addPlatform(location, _.random(crops.length - 1));
    });

    addItems.call(this, {
        group: 'platforms',
        defaultOpts: {
            top: 300,
            collideWorldBounds: false,
            image: 'platforms',
            scale: [.5, .5],
            checkCollisionDown: false,
            checkCollisionRight: false,
            checkCollisionLeft: false,
        }
    }, platformOpts);
}
