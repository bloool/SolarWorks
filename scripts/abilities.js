//suport tier 1
const t1s = extend(UnitType, "ranae", {});
t1s.constructor = () => extend(LegsUnit, {})
t1s.abilities.add(new RepairFieldAbility(15, 60, 15));
// RepairFieldAbility(PERCENT, TIME, RADIUS));

//suport tier 2
const t2s = extend(UnitType, "tempo", {});
t2s.constructor = () => extend(LegsUnit, {})
t2s.abilities.add(
    new RepairFieldAbility(5, 15, 32), 
    new ForceFieldAbility(38, 0.3, 60, 240));
// ForceFieldAbility(RADIUS, REGEN, MAX, COOLDOWN)

//suport tier 3
const t3s = extend(UnitType, "sylva", {});
t3s.constructor = () => extend(LegsUnit, {})
t3s.abilities.add(
    new RepairFieldAbility(10, 30, 58), 
    new ForceFieldAbility(58, 0.4, 240, 240), 
    new ShieldRegenFieldAbility(10, 40, 240, 58));
// ShieldRegenFieldAbility(AMOUNT, MAX, RELOAD, RANGE)

//suport tier 4
const t4s = extend(UnitType, "marina", {});
t4s.constructor = () => extend(LegsUnit, {})
t4s.abilities.add(
    new RepairFieldAbility(30, 45, 65), 
    new ForceFieldAbility(65, 0.6, 600, 1000), 
    new ShieldRegenFieldAbility(15, 40, 120, 65), 
    new StatusFieldAbility(StatusEffects.overclock, 500, 500, 65));
//new StatusFieldAbility(EFFECT, DURATION, RELOAD, RANGE)

//suport tier 5
const t5s = extend(UnitType, "chrysos", {});
t5s.constructor = () => extend(LegsUnit, {})
t5s.abilities.add(
    new RepairFieldAbility(100, 30, 100), 
    new ForceFieldAbility(100, 0.8, 15000, 1200), 
    new ShieldRegenFieldAbility(100, 100, 1200, 100), 
    new StatusFieldAbility(StatusEffects.overclock, 500, 500, 100)
    ); 

//unit that tier 5 spawns
const fowl = extend(UnitType, "fowl", {});
fowl.constructor = () => extend(LegsUnit, {})
fowl.abilities.add(
    new RepairFieldAbility(15, 60, 15),
    new ForceFieldAbility(50, 1, 180, 120),
);

t5s.abilities.add(new UnitSpawnAbility(fowl, 150, 0, -15)); 

//Miner t1

const t1m = extend(UnitType, "vein", {});
t1m.constructor = () => extend(UnitEntity, {})
t1m.defaultController = () => extend(MinerAI, {});

const omega = extend(UnitType, "omega", {
    update(unit){
        this.super$update(unit);

        let b;

        b = Groups.bullet.intersect(5, 5, 5, 5);

        if(b != null){
            unit.set(this.x + Mathf.range(-2, 2), this.y + Mathf.range(-2, 2));
            unit.snapInterpolation();
        }
    }
});
omega.constructor = () => extend(UnitEntity, {})