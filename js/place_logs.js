const OFFSETS = {
    platforms: 0,
    ground: 40
};

export default function () {
    _.each(OFFSETS, (offset, location) => {
        _.each(this[location].children, platform => {
            if (platform.left < 400 || platform.left > this.game.world.width - 400) return;
            if (Math.random() < this.opts[location + 'LogChance']) {
                platform.hasLog = true;
            }
        });
    });
}
