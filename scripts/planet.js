const hera = extend(Planet, "hera", Planets.sun, 1, 0.5, {
    generator: new SerpuloPlanetGenerator(),
    bloom: true,
    radius: 1,
    accessible: true,
    hasAtmosphere: true,
    atmosphereColor: Color.valueOf("8da1e3"),
    atmosphereRadIn: 0.02,
    atmosphereRadOut: 0.3,
    localizedName: "Hera",
    startSector: 5
});
hera.meshLoader = () => new SunMesh(hera, 4, 5, 0.3, 1.7, 1.2, 1, 1.5, Color.valueOf("8da1e3"), Color.valueOf("c2bffb"), Color.valueOf("8da1e3"));


const WinterWasteland = extend(SectorPreset, "winter-wasteland", hera, 5, {
    captureWave: 15,
    localizedName: "Winter Wasteland",
    difficulty: 2,
    alwaysUnlocked: true
});


module.exports = {
    hera: hera,
    WinterWasteland: WinterWasteland,
}


/*
    Color.valueOf("8da1e3"),
    Color.valueOf("e1e9f0"),
    Color.valueOf("ffffff"),
    Color.valueOf("ffffff"),
    Color.valueOf("c2bffb"),
    Color.valueOf("e9ebff")
*/