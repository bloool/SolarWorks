let LaminaGlass = extend(Item, "lamina-glass", {});
const Magnetite = extend(Item, "magnetite", {});

module.exports = {
    LaminaGlass : LaminaGlass,
}

const LaminaFrag = extend(BasicBulletType, {
    damage : 10,
    width : 8,
    height : 8,
    lifetime: 30,
    speed : 4,
    pierce: true,
    collidesGround: true,
});

const LaminaSmall = extend(FlakBulletType, {
    width : 10,
    height : 10,
    splashDamage: 25 * 1.5,
    splashDamageradius: 10,
    hitEffect : Fx.flakExplosion,
    ammoMultiplier : 2,
    reloadMultiplier : 0.6,
    fragBullet : LaminaFrag,
    fragBullets : 3,
    fragCone: 30,
    speed : 4,
    lifetime : 30,
    collidesGround: true,
});

const LaminaBig = extend(FlakBulletType, {
    width : 18,
    height : 18,
    damage: 50,
    splashDamage: 125 * 1.5,
    splashDamageradius: 50,
    hitEffect : Fx.flakExplosion,
    ammoMultiplier : 2,
    reloadMultiplier : 0.5,
    fragBullet : LaminaSmall,
    fragBullets : 3,
    fragCone: 30,
    speed : 5,
    lifetime : 45,
    collidesGround: true,
});

const LaminaShrapnelFrag = extend(ShrapnelBulletType, {
	damage: 10,
	length: 50,
	width : 14,
    toColor : Color.valueOf("ffffff"),
});

const LaminaShrapnelSmall = extend(ShrapnelBulletType, {
	damage: 50,
	length: 100,
	width : 18,
    toColor : Color.valueOf("51517a"),
    fragBullet : LaminaShrapnelFrag,
    fragBullets : 2,
    fragCone: 30,
});

const LaminaShrapnelBig = extend(ShrapnelBulletType, {
	damage: 125,
	length: 100,
	width : 25,
    toColor : Color.valueOf("51517a"),
    fragBullet : LaminaShrapnelFrag,
    fragBullets : 2,
    fragCone: 30,
});

const MagnetiteSmall = extend(BasicBulletType, {
	damage: 30,
	speed: 5,
	lifetime: 50,
	height: 12,
	width : 8,
    pierce: true,
    pierceCap: 2,
	ammoMultiplier: 5,
	weaveScale: 5,
	weaveMag: 4,
	homingPower: 0.01,
	homingRange: 25
});

const MagnetiteMedium = extend(BasicBulletType, {
	damage: 35,
	speed: 5,
	lifetime: 50,
	height: 14,
	width : 13,
    pierce: true,
    pierceCap: 2,
	ammoMultiplier: 5,
	weaveScale: 6,
	weaveMag: 5,
	homingPower: 0.1,
	homingRange: 25
});

Blocks.scatter.ammoTypes.put(
    LaminaGlass, LaminaSmall
);

Blocks.spectre.ammoTypes.put(
    LaminaGlass, LaminaBig
);

Blocks.fuse.ammoTypes.put(
    LaminaGlass, LaminaShrapnelSmall
);

Blocks.salvo.ammoTypes.put(
    Magnetite, MagnetiteSmall
);

Blocks.cyclone.ammoTypes.put(
    Magnetite, MagnetiteSmall
);

