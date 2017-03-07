import loadAssets from 'shared/phaser/methods/load_assets/0.1';

export default function () {
    loadAssets.call(this, 'image', [
    ['sky', `${CMWN.MEDIA.IMAGE}game.1.bkg.sky.jpg`],
    ['clouds', `${CMWN.MEDIA.IMAGE}game.1.bkg.clouds.png`],
    ['ground', `${CMWN.MEDIA.SPRITE}game1.ground.png`],
    ['platforms', `${CMWN.MEDIA.SPRITE}game1.platform.png`],
    // 930 x 140 pixels
    ['items', `${CMWN.MEDIA.SPRITE}game1.5.png`],
    // 1246 x 100 pixels
    ['logs', `${CMWN.MEDIA.SPRITE}game1.logs.png`],
    // 2100 x 360 pixels
    ['trees', `${CMWN.MEDIA.SPRITE}game1.trees.png`],
    ]);

    loadAssets.call(this, 'spritesheet', [
    // 6180 x 646 pixels
    ['turtle', `${CMWN.MEDIA.SPRITE}turtle.walk.0.png`, 515, 645],
    ['turtle3', `${CMWN.MEDIA.SPRITE}turtle.walk.3.png`, 515, 645],
    ['turtle5', `${CMWN.MEDIA.SPRITE}turtle.walk.5.png`, 515, 645],
    // 1830 x 276 pixels
    ['heart', `${CMWN.MEDIA.SPRITE}game1.hearts.png`, 305, 276],
    // 1726 x 310 pixels
    ['recycle', `${CMWN.MEDIA.SPRITE}recycle-01.png`, 345, 310],
    // 1380 x 310 pixels
    ['rainbowRecycle', `${CMWN.MEDIA.SPRITE}rainbow.recycle-01.png`, 345, 310],
    // 5750 x 286 pixels
    ['truck', `${CMWN.MEDIA.SPRITE}truck.png`, 575, 286],
    // 1320 x 226 pixels
    ['door', `${CMWN.MEDIA.SPRITE}door.open.png`, 220, 226],
    // 3600 x 326 pixels
    ['jet', `${CMWN.MEDIA.SPRITE}jet.pack.png`, 600, 326],
    // 7860 x 410 pixels
    ['snake0', `${CMWN.MEDIA.SPRITE}mother.slither-01.png`, 655, 410],
    // 7860 x 410 pixels
    ['snake1', `${CMWN.MEDIA.SPRITE}sister.slither-01.png`, 655, 410],
    // 7860 x 410 pixels
    ['snake2', `${CMWN.MEDIA.SPRITE}brother.slither-01.png`, 655, 410],
    ]);

    loadAssets.call(this, 'atlas', [
        [
            'snake0up',
            `${CMWN.MEDIA.SPRITE}Mom.leaving.hole.png`,
            `${CMWN.MEDIA.SPRITE}Mom.leaving.hole.json`
        ],
        [
            'snake0down',
            `${CMWN.MEDIA.SPRITE}mom.going.to.hole.png?v=3`,
            `${CMWN.MEDIA.SPRITE}mom.going.to.hole.json`
        ],
        [
            'snake1up',
            `${CMWN.MEDIA.SPRITE}Sister.leave.hole.png`,
            `${CMWN.MEDIA.SPRITE}Sister.leave.hole.json`
        ],
        [
            'snake1down',
            `${CMWN.MEDIA.SPRITE}sister.down.hole.png?v=3`,
            `${CMWN.MEDIA.SPRITE}sister.down.hole.json`
        ],
        [
            'snake2up',
            `${CMWN.MEDIA.SPRITE}brother.leave.hole.png`,
            `${CMWN.MEDIA.SPRITE}brother.leave.hole.json`
        ],
        [
            'snake2down',
            `${CMWN.MEDIA.SPRITE}brother.down.hole.png?v=3`,
            `${CMWN.MEDIA.SPRITE}brother.down.hole.json`
        ],
    ]);

    loadAssets.call(this, 'audio', [
        ['bush', `${CMWN.MEDIA.EFFECT}BumpOrLandOnBush.mp3`],
        ['stump', `${CMWN.MEDIA.EFFECT}BumpTreeStump.mp3`],
        ['truck', `${CMWN.MEDIA.EFFECT}DumpTruckZoom.mp3`],
        ['hole', `${CMWN.MEDIA.EFFECT}Fall_In_Hole.mp3`],
        ['log', `${CMWN.MEDIA.EFFECT}goInLog.mp3`],
        ['jump', `${CMWN.MEDIA.EFFECT}Jump.mp3`],
        ['water', `${CMWN.MEDIA.EFFECT}LandInWater.mp3`],
        ['heart', `${CMWN.MEDIA.EFFECT}LifeHeartCapture.mp3`],
        ['lightening', `${CMWN.MEDIA.EFFECT}LightingCapture.mp3`],
        ['bag', `${CMWN.MEDIA.EFFECT}PickUpTrashBag.mp3`],
        ['miss', `${CMWN.MEDIA.EFFECT}MissTrashBag.mp3`],
        ['rainbowRecycle', `${CMWN.MEDIA.EFFECT}RecycleColors.mp3`],
        ['recycle', `${CMWN.MEDIA.EFFECT}RecycleGreen.mp3`],
    ]);
}
