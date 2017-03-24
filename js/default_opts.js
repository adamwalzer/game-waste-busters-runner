const crops = [
    [0, 0, 155, 140],
    [155, 0, 155, 140],
    [310, 0, 155, 140],
    [465, 0, 155, 140],
    [620, 0, 155, 140],
    [775, 0, 155, 140],
    [930, 0, 155, 140],
    [0, 0, 300, 360],
    [300, 0, 300, 360],
    [600, 0, 300, 360],
    [900, 0, 300, 360],
    [1200, 0, 300, 360],
    [1500, 0, 300, 360],
    [1800, 0, 300, 360],
];

const generalDefaultProps = {
    image: 'items',
    gravityY: 12,
    body: [115, 100, 20, 20],
    scale: [.5, .5],
    collideWorldBounds: false,
};

const treeDefaultProps = {
    image: 'trees',
    gravityY: 12,
    body: [300, 325, 0, 0],
    scale: [.5, .5],
    collideWorldBounds: false,
};

const defaultItemAmounts = {
    squareBush: 0,
    roundBush: 0,
    hole: 0,
    snake: 0,
    bag: 0,
    blank: 0,
    rock: 0,
    stump: 0,
    heart: 0,
    recycle: 0,
    raibowRecycle: 0,
    lightening: 0,
    tree1: 0,
    tree2: 0,
    tree3: 0,
    tree4: 0,
    tree5: 0,
    tree6: 0,
    tree7: 0,
    truck: 0,
};

export default {
    level: 1,
    hitVelocity: 200,
    recyclingScore: 100,
    rainbowRecyclyingScore: 300,
    hitsPerLife: 4,
    maxLives: 3,
    maxBags: 5,
    maxTrucks: 3,
    bounceY: .2,
    gravityY: 400,
    playerImage: 'turtle',
    playerBody: [315, 396, 100, 150],
    leftFrames: [5, 4, 3, 2, 1, 0],
    leftFrameRate: 10,
    leftLoop: true,
    rightFrames: [6, 7, 8, 9, 10, 11],
    rightFrameRate: 10,
    rightLoop: true,
    boostLeftFrames: [2, 1, 0],
    boostLeftFrameRate: 10,
    boostLeftLoop: true,
    boostRightFrames: [3, 4, 5],
    boostRightFrameRate: 10,
    boostRightLoop: true,
    playerAnchor: [.5, .8],
    playerScale: [.15, .15],
    playerLogScale: [.1, .1],
    upSpeed: -350,
    downSpeed: 500,
    leftSpeed: -150,
    rightSpeed: 150,
    boostUpSpeed: -350,
    boostDownSpeed: 500,
    boostLeftSpeed: -300,
    boostRightSpeed: 300,
    playerStopFrame: 6,
    boostPlayerStopFrame: 6,
    boostTime: 3000,
    platformsLogChance: 0,
    groundLogChance: 0,
    setPlatforms: [],
    locations: [],
    groups: {
        squareBush: 'bushes',
        roundBush: 'bushes',
        snake: 'snakes',
        hole: 'holes',
        bag: 'bags',
        rock: 'obstacles',
        stump: 'obstacles',
        heart: 'hearts',
        recycle: 'recycles',
        raibowRecycle: 'rainbowRecycles',
        lightening: 'lightening',
        truck: 'trucks',
        tree1: 'trees',
        tree2: 'trees',
        tree3: 'trees',
        tree4: 'trees',
        tree5: 'trees',
        tree6: 'trees',
        tree7: 'trees',
    },
    itemProps: {
        squareBush: _.defaults({
            crop: crops[0],
        }, generalDefaultProps),
        roundBush: _.defaults({
            crop: crops[1],
        }, generalDefaultProps),
        hole: _.defaults({
            crop: crops[2],
            body: [115, 20, 20, 50],
            gravityY: 10000,
        }, generalDefaultProps),
        bag: _.defaults({
            crop: crops[3],
        }, generalDefaultProps),
        rock: _.defaults({
            crop: crops[4],
        }, generalDefaultProps),
        stump: _.defaults({
            crop: crops[5],
            body: [115, 120, 20, 50],
        }, generalDefaultProps),
        lightening: _.defaults({
            crop: crops[6],
            gravityY: 0,
        }, generalDefaultProps),
        heart: {
            image: 'heart',
            scale: [.15, .15],
        },
        recycle: {
            image: 'recycle',
            scale: [.15, .15],
        },
        raibowRecycle: {
            image: 'rainbowRecycle',
            scale: [.15, .15],
        },
        truck: {
            image: 'truck',
            scale: [.5, .5],
            collideWorldBounds: false,
        },
        tree1: _.defaults({
            crop: crops[7],
            body: null,
        }, treeDefaultProps),
        tree2: _.defaults({
            crop: crops[8]
        }, treeDefaultProps),
        tree3: _.defaults({
            crop: crops[9]
        }, treeDefaultProps),
        tree4: _.defaults({
            crop: crops[10],
            body: null,
        }, treeDefaultProps),
        tree5: _.defaults({
            crop: crops[11]
        }, treeDefaultProps),
        tree6: _.defaults({
            crop: crops[12]
        }, treeDefaultProps),
        tree7: _.defaults({
            crop: crops[13]
        }, treeDefaultProps),
        snake: {
            scale: [.25, .25],
            gravityY: 12,
            collideWorldBounds: false,
        }
    },
    platformItemAmounts: defaultItemAmounts,
    groundItemAmounts: defaultItemAmounts,
};
