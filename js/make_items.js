import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    const defaultProps = this.opts.itemProps;
    const groups = this.opts.groups;

    var truckNumber = 1;
    var truckTotal = this.opts.maxTrucks;

    var getObjects = function (objects = [], amounts = {}) {
        return objects.concat(_.shuffle(_.reduce(amounts, (a, v, k) =>
            a.concat(_.times(v || 0, () => k)), [])));
    };

    var objects = getObjects([], this.opts.platformItemAmounts);

    var locations = _.defaults(_.reduce(this.opts.platformItemAmounts, (a, v, k) => {
        a[k] = [];
        delete this[k];
        return a;
    }, {}), _.reduce(this.opts.groundItemAmounts, (a, v, k) => {
        a[k] = [];
        delete this[k];
        return a;
    }, {}));

    var placeObject = function (platform, up, over) {
        var object = objects.shift();
        switch (object) {
            case 'tree1':
                up += 110;
                break;
            case 'tree2':
            case 'tree3':
            case 'tree5':
            case 'tree7':
                up += 90;
                break;
            case 'tree4':
                up += 105;
                break;
            case 'tree6':
                up += 95;
                break;
        }
        if (platform.hasLog && !(object === 'bag' || object === 'blank')) {
            objects.unshift(object);
            object = 'blank';
        }
        if (locations[object]) {
            locations[object].push({
                top: platform.top - up,
                left: platform.left + over,
            });
        }
    };

    _.every(this.platforms.children, platform => {
        placeObject(platform, 50, 30);
        if (platform.width > 120) placeObject(platform, 50, 80);
        if (platform.width > 200) placeObject(platform, 50, 170);
        return objects.length;
    });

    objects = getObjects(objects, this.opts.groundItemAmounts);
    objects.unshift('blank');
    objects.unshift('blank');

    _.every(this.ground.children, platform => {
        if (truckNumber <= truckTotal &&
            platform.left > this.game.world.width * truckNumber / (truckTotal + 1.5)) {
            locations.truck.push({
                top: platform.top - 50,
                left: platform.left,
            });
            truckNumber++;
            return true;
        }
        if (platform.left > this.game.world.width - 200) return false;
        placeObject(platform, 20, 30);
        return objects.length;
    });

    // this makes sure that all the bags are placed
    while (~objects.indexOf('bag')) {
        locations.bag.push(locations.blank.shift());
        objects[objects.indexOf('bag')] = 'blank';
    }

    _.each(locations, (locationArray, key) => {
        var holeLocations;
        var snakeLocations;
        if (key === 'blank') return;
        if (key === 'snake') {
            holeLocations = _.map(locationArray, opts => {
                return {
                    top: opts.top,
                    left: opts.left + 80,
                };
            });
            addItems.call(this, {
                group: groups.hole, defaultOpts: defaultProps.hole
            }, holeLocations);
            snakeLocations = _.map(locationArray, opts => {
                return {
                    top: opts.top - 10,
                    left: opts.left + 70,
                    image: 'snake' + _.random(2)
                };
            });
            addItems.call(this, {
                group: groups.snake, defaultOpts: defaultProps.snake
            }, snakeLocations);
            return;
        }
        addItems.call(this, {
            group: groups[key], defaultOpts: defaultProps[key]
        }, locationArray);
    });

    _.each(_.get(this, 'hearts.children'), heart => {
        heart.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        heart.animations.play('spin');
    });

    _.each(_.get(this, 'recycles.children'), recycle => {
        recycle.animations.add('spin', [0, 1, 2, 3, 4], 10, true);
        recycle.animations.play('spin');
    });

    _.each(_.get(this, 'rainbowRecycles.children'), recycle => {
        recycle.animations.add('spin', [0, 1, 2, 3], 10, true);
        recycle.animations.play('spin');
    });

    _.each(_.get(this, 'trucks.children'), truck => {
        var drive = truck.animations.add('drive', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
        drive.onComplete.add(() => {
            truck.body.velocity.x = 200;
        });
    });

    _.each(_.get(this, 'trees.children'), tree => {
        tree.sendToBack();
    });

    _.each(_.get(this, 'snakes.children'), snake => {
        snake.loadTexture(null, 0);
    });
}
