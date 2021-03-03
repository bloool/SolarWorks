
//blast walls
const explosion = extend(BombBulletType, {
    hitEffect: Fx.massiveExplosion,
    lifetime: 10,
    speed: 1,
    splashDamageRadius: 80,
    splashDamage: 100, 
    instantDisappear: true,
    hittable: false,
    collidesAir: true,
    hitShake: 2,
});

const smolExplosion = extend(BombBulletType, {
    hitEffect: Fx.flakExplosion,
    lifetime: 10,
    speed: 1,
    splashDamageRadius: 20,
    splashDamage: 25, 
    instantDisappear: true,
    hittable: false,
    collidesAir: true,
    hitShake: 0.5,
});

const blast = extend(Wall, "blast-wall", {});
blast.buildType = () => extend(Wall.WallBuild, blast, {
    onDestroyed(){
        this.super$onDestroyed();
        explosion.create( this, Team.derelict, this.x, this.y, 0);
    }
});


const smolBlast = extend(Wall, "small-blast-wall", {});
smolBlast.buildType = () => extend(Wall.WallBuild, smolBlast, {
    onDestroyed(){
        this.super$onDestroyed();
        smolExplosion.create( this, Team.derelict, this.x, this.y, 0);
    }
});
//lamina walls

const sharp = extend(ShrapnelBulletType, {
    damage: 50,
    length: 50,
    width : 12,
    toColor: Color.valueOf("51517a"),
});

const smallSharp = extend(ShrapnelBulletType, {
    damage: 10,
    length: 10,
    width : 12,
    toColor: Color.valueOf("51517a"),
});

const lamina = extend(Wall, "laminated-wall", {});
lamina.buildType = () => extend(Wall.WallBuild, lamina, {
    collision(b){
        this.super$collision(b);
        b.remove()
        if(Mathf.chance(0.5)){
            sharp.create(this, this.team, this.x, this.y, b.rotation() + 175 + Mathf.range(10));
        }
    }
});

const smallLamina = extend(Wall, "small-laminated-wall", {});
smallLamina.buildType = () => extend(Wall.WallBuild, smallLamina, {
    collision(b){
        this.super$collision(b);
        b.remove()
        if(Mathf.chance(0.5)){
            sharp.create(this, this.team, this.x, this.y, b.rotation() + 175 + Mathf.range(10));
        }
    }
});

// energium walls

const shockExplosion = extend(BombBulletType, {
    hitEffect: Fx.massiveExplosion,
    lifetime: 10,
    speed: 1,
    splashDamageRadius: 80,
    splashDamage: 75, 
    instantDisappear: true,
    hittable: false,
    collidesAir: true,
    hitShake: 2,
    lightning : 5,
    lightningLength : 12
});

const smallShockExplosion = extend(BombBulletType, {
    hitEffect: Fx.flakExplosion,
    lifetime: 10,
    speed: 1,
    splashDamageRadius: 20,
    splashDamage: 25, 
    instantDisappear: true,
    hittable: false,
    collidesAir: true,
    hitShake: 2,
    lightning : 3,
    lightningLength : 6
});

const laser = extend(LaserBulletType, {
    colors : [Color.valueOf("ffe18f"),Color.valueOf("ffc999"),Color.valueOf("ffffff")],
    hitEffect : Fx.absorb,
    despawnEffect : Fx.none,
    damage: 20,
    hitSize : 16,
    lifetime : 36,
    length : 60,
    width : 18,
});

const energium = extend(Wall, "energium-wall", {});
energium.buildType = () => extend(Wall.WallBuild, energium, {
    onDestroyed(){
        this.super$onDestroyed();
        shockExplosion.create(this, this.team, this.x, this.y, 0);
    },
    collision(b){
        this.super$collision(b);
        b.remove()
        if(Mathf.chance(0.60)){
            laser.create(this, this.team, this.x, this.y, b.rotation() + Mathf.range(175, 185));
        }
    }
});

const smallEnergium = extend(Wall, "small-energium-wall", {});
smallEnergium.buildType = () => extend(Wall.WallBuild, smallEnergium, {
    onDestroyed(){
        this.super$onDestroyed();
        smallShockExplosion.create(this, this.team, this.x, this.y, 0);
    },
    collision(b){
        this.super$collision(b);
        b.remove()
        if(Mathf.chance(0.15)){
            laser.create(this, this.team, this.x, this.y, b.rotation() + Mathf.range(175, 185));
        }
    }
});

