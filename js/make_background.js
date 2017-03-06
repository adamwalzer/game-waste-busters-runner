import addItems from 'shared/phaser/methods/add_items/0.1';

export default function () {
    delete this.sky;

    addItems.call(this, {
        group: 'sky', enableBody: false, defaultOpts: {
            collideWorldBounds: false,
            top: 0,
            image: 'sky',
            scale: [.5, .5],
        }
    }, [
        { left: 0 },
        { left: 2975.5 }
    ]);

    addItems.call(this, {
        group: 'clouds', enableBody: false, defaultOpts: {
            collideWorldBounds: false,
            top: 0,
            image: 'clouds',
            scale: [.5, .5],
        }
    }, [
        { left: 0 },
        { left: 2975.5 }
    ]);
}
