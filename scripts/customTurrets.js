const salvo2 = extend(ItemTurret, "discharge", {});

salvo2.buildType = () => extend(ItemTurret.ItemTurretBuild, salvo2, {
    updateTile(){
        this.super$updateTile()

        if(this.isShooting() && this.hasAmmo()){
            this.block.inaccuracy -= 0.1
            if(this.block.inaccuracy < 5){this.block.inaccuracy = 5}
        }
        else{
            this.block.inaccuracy = 80
        }
    },
});

const sparkle = extend(ItemTurret, "sparkle", {});

let items = require("ammoVanilla");

const sparkleTrail = new Effect(30, e => {
    for(let i = 0; i < 2; i++){
        Draw.color(i == 0 ? Color.valueOf("ffffff") : Color.valueOf("ffffff"));
        let m = i == 0 ? 1 : 0.5;
        let rot = e.rotation + 180;
        let w = 15 * e.fout();
        Drawf.tri(e.x, e.y, w, (30 + Mathf.randomSeedRange(e.id, 1)) * m, rot);
        Drawf.tri(e.x, e.y, w, 120, rot + 180);
    }
});
const sparkleShine = new Effect(15, 100, e => {
    Draw.color(Color.valueOf("ffffff"));
    for(let i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 6, 80 * e.fout(), i*90 + 45);
    }
    for(let i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 3, 30 * e.fout(), i*90 + 45);
    }
});
const laminaSparkleBomb = extend(BombBulletType, {
    damage: 50,
    height: 0,
    width : 0,
    speed:3,
    lifetime: 15,
    splashDamage: 25,
    splashDamageRadius: 25,
    hitEffect: sparkleShine,
    hitSound: Sounds.none,
    status : StatusEffects.slow,
	statusDuration : 5,
    collidesAir: true,
    collidesGround: false
});
const laminaSparkle = extend(PointBulletType, {
    damage: 10,
    speed: 500,
    hitEffect : Fx.none,
    trailEffect : sparkleTrail,
    despawnEffect : sparkleShine,
    trailSpacing : 50,
    fragLifeMin : 0.1,
    fragBullets: 5,
    fragBullet: laminaSparkleBomb
});
sparkle.ammoTypes.put(
    items.LaminaGlass, laminaSparkle
);



const undo = extend(ItemTurret, "undo", {});
const cloud = extend(BasicBulletType, {
    type : "BasicBulletType",
    height: 8,
    width : 8,
    damage: 2,
    lifetime: 120,
    speed : 0.5,
    sprite: "solar-works-bubble",
    frontColor: Color.valueOf("bf92f980"),
    backColor: Color.clear,
    status: StatusEffects.sporeSlowed,
    statusDuration : 30,
    despawnEffect: Fx.none,
    hitEffect: Fx.none,
    pierce: true,
    shrinkY: 0,
});
const toxicBubble = extend(BasicBulletType, {
    type : "BasicBulletType",
    height: 12,
    width : 12,
    damage: 15,
    speed : 2.5,
    lifetime : 120,
    status: StatusEffects.sapped,
    statusDuration : 30,
    shrinkY: 0,
    pierce: true,
    pierceCap: 3,
    frontColor: Color.valueOf("bf92f9"),
    backColor: Color.valueOf("bf92f980"),
    sprite: "solar-works-bubble",
    update(b){
        if(Mathf.chance(0.5)){
            cloud.create(b, b.x, b.y, b.rotation() + 175 + Mathf.range(10), Mathf.random(0.5, 2), 1);
        }
    }
});
undo.ammoTypes.put(
    Items.sporePod, toxicBubble
);

const dazzle = extend(ItemTurret, "dazzle", {});
const sharp = extend(ShrapnelBulletType, {
    damage: 10,
    length: 50,
    lifetime: 5,
    width : 12,
    serrations: 0
});
const shardBomb = extend(BasicBulletType, {
    type : "BasicBulletType",
    height: 12,
    width : 8,
    damage: 15,
    speed : 4,
    shrinkY: 0,
    pierce: true,
    pierceCap: 3,
    update(b){
        sharp.create(b, b.x, b.y, b.rotation() + 120, Mathf.random(0.5, 2), 1);
        sharp.create(b, b.x, b.y, b.rotation() - 120, Mathf.random(0.5, 2), 1);
        sharp.create(b, b.x, b.y, b.rotation() + 180, Mathf.random(0.5, 2), 1);
    }
});
dazzle.ammoTypes.put(
    items.LaminaGlass, shardBomb
);

const shard = extend(BasicBulletType, {
    damage: 35,
    speed: 4,
    lifetime: 70,
    height: 10,
    width : 8,
    pierce: true,
    backColor: Color.valueOf("ffc999"),
    hitEffect: Fx.absorb,
    sprite: "solar-works-shard",
    shrinkY: 0
});
const vega = extend(PowerTurret, "vega", {});
vega.buildType = () => extend(PowerTurret.PowerTurretBuild, vega, {
    updateTile(){
        this.super$updateTile();
        let rx = this.x + Mathf.range(-15, 15)
        let ry = this.y + Mathf.range(-15, 15)
        if(this.isShooting() && this.power.status > 0.5 && this.hasAmmo() && Mathf.chance(0.05)){
            shard.create(this, this.team, rx, ry, this.rotation)
            Fx.absorb.at(rx, ry)
            Sounds.lasershoot.at(this)
        }
    },
});

const laser = extend(LaserBulletType, {
    colors : [Color.valueOf("ffe18f"),Color.valueOf("ffc999"),Color.valueOf("ffffff")],
    hitEffect : Fx.absorb,
    despawnEffect : Fx.none,
    damage: 80,
    hitSize : 16,
    lifetime : 36,
    length : 180,
    width : 10,
});

const antares = extend(PowerTurret, "antares", {});
antares.buildType = () => extend(PowerTurret.PowerTurretBuild, antares, {
    updateTile(){
        this.super$updateTile();
        let rx = this.x + Mathf.range(-15, 15)
        let ry = this.y + Mathf.range(-15, 15)
        if(this.isShooting() && this.power.status > 0.5 && this.hasAmmo() && Mathf.chance(0.05)){
            laser.create(this, this.team, rx, ry, this.rotation)
            Fx.absorb.at(rx, ry)
            Sounds.sap.at(this)
        }
    },
});