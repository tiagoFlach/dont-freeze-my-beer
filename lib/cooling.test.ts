import assert from "node:assert/strict";
import { test } from "node:test";
import {
    calculateK,
    CONTAINER_MATERIALS,
    COOLING_METHODS,
    COOLING_RATE_MODEL,
    DRINK_TYPES,
    FRIDGE_MIN_MARGIN,
    generateCoolingData,
    getTemperatureAtTime,
    getTimeToTarget,
    type CoolingParams,
} from "./cooling";

const defaultParams: CoolingParams = {
    drinkType: "beer",
    initialTemp: 25,
    material: "aluminum",
    size: "350",
    method: "freezer",
};

test("no additional cooling is needed at or below the target", () => {
    const fridgeBeer = { ...defaultParams, method: "fridge" } as const;
    assert.equal(generateCoolingData({ ...fridgeBeer, initialTemp: 4 }).timeToIdeal, 0);
    assert.equal(generateCoolingData({ ...fridgeBeer, initialTemp: 0 }).timeToIdeal, 0);
    assert.equal(
        generateCoolingData({ ...fridgeBeer, drinkType: "wine", initialTemp: 0 }).timeToIdeal,
        0,
    );
});

test("a target at or below the ambient temperature is unreachable from above", () => {
    const params = { ...defaultParams, method: "fridge" } as const;
    assert.equal(getTimeToTarget(4, params), Infinity);
    assert.equal(getTimeToTarget(3, params), Infinity);
});

test("the fridge chart covers the estimated time to its practical minimum", () => {
    const params = { ...defaultParams, method: "fridge" } as const;
    const practicalMin = COOLING_METHODS.fridge.ambientTemp + FRIDGE_MIN_MARGIN;
    const practicalTime = getTimeToTarget(practicalMin, params);
    const result = generateCoolingData(params);

    assert.equal(result.timeToIdeal, Infinity);
    assert.equal(Math.round(practicalTime), 167);
    assert.ok(result.data[result.data.length - 1].time > practicalTime);
    assert.ok(result.data[result.data.length - 1].temp < practicalMin);
});

test("the measured can and bottle retain their relative cooling times", () => {
    const can = { ...defaultParams, method: "freezerCompartment", initialTemp: 21, size: "330" } as const;
    const bottle = { ...can, material: "plastic", size: "1500" } as const;

    const canTime = getTimeToTarget(5, can);
    const bottleTime = getTimeToTarget(5, bottle);

    assert.ok(Math.abs(bottleTime / canTime - 90 / 60) < 1e-10);
    assert.ok(Math.abs(getTemperatureAtTime(canTime, can) - 5) < 1e-10);
    assert.ok(Math.abs(getTemperatureAtTime(bottleTime, bottle) - 5) < 1e-10);
});

test("the freezer reaches the requested target in 30 minutes for the reference can", () => {
    const time = getTimeToTarget(4, defaultParams);
    const freezingTime = getTimeToTarget(0, defaultParams);
    const result = generateCoolingData(defaultParams);

    assert.ok(Number.isFinite(time));
    assert.ok(Math.abs(time - 30) < 1e-10);
    assert.equal(Math.round(freezingTime), 39);
    assert.ok(freezingTime > time);
    assert.ok(Math.abs(getTemperatureAtTime(time, defaultParams) - 4) < 1e-10);
    assert.ok(Math.abs(getTemperatureAtTime(freezingTime, defaultParams)) < 1e-10);
    assert.equal(result.timeToIdeal, Math.round(time));
    assert.ok(result.data.some((point) => point.time > time));
    for (const point of result.data) {
        assert.ok(Math.abs(point.temp - getTemperatureAtTime(point.time, defaultParams)) < 0.3);
    }
});

test("larger containers and glass take longer in the freezer", () => {
    const larger = { ...defaultParams, size: "2000" };
    const glass = { ...defaultParams, material: "glass" } as const;

    assert.ok(getTimeToTarget(4, larger) > getTimeToTarget(4, defaultParams));
    assert.ok(getTimeToTarget(4, glass) > getTimeToTarget(4, defaultParams));
});

test("all methods use the same rate and differ by their ambient temperatures", () => {
    const scenarios: CoolingParams[] = [
        defaultParams,
        { ...defaultParams, drinkType: "wine", material: "glass", size: "750" },
        { ...defaultParams, drinkType: "spirits", material: "plastic", size: "1500" },
    ];

    for (const scenario of scenarios) {
        const freezer = { ...scenario, method: "freezer" } as const;
        const compartment = { ...scenario, method: "freezerCompartment" } as const;
        const fridge = { ...scenario, method: "fridge" } as const;

        assert.equal(calculateK(fridge), calculateK(freezer));
        assert.equal(calculateK(compartment), calculateK(freezer));
        assert.ok(getTimeToTarget(5, freezer) < getTimeToTarget(5, compartment));
        assert.ok(getTimeToTarget(5, compartment) < getTimeToTarget(5, fridge));
    }
});

test("the factors displayed in the formula reproduce the cooling rate", () => {
    const scenarios: CoolingParams[] = [
        defaultParams,
        { ...defaultParams, drinkType: "wine", material: "glass", size: "750" },
    ];

    for (const params of scenarios) {
        const displayedRate = COOLING_RATE_MODEL.referenceK * COOLING_RATE_MODEL.calibrationFactor *
            (DRINK_TYPES[params.drinkType].kBase / DRINK_TYPES.beer.kBase) *
            (CONTAINER_MATERIALS[params.material].mult / CONTAINER_MATERIALS.aluminum.mult) *
            Math.pow(COOLING_RATE_MODEL.referenceVolume / Number(params.size), COOLING_RATE_MODEL.volumeExponent);
        assert.ok(Math.abs(displayedRate - calculateK(params)) < 1e-12);
    }
});

test("the freezer compartment uses the fixed -6°C ambient temperature", () => {
    const compartment = { ...defaultParams, method: "freezerCompartment" } as const;
    const time = getTimeToTarget(4, compartment);

    assert.equal(Math.round(time), 51);
    assert.ok(time > getTimeToTarget(4, defaultParams));
    assert.ok(Math.abs(getTemperatureAtTime(time, compartment) - 4) < 1e-10);
    assert.equal(generateCoolingData(compartment).timeToIdeal, Math.round(time));
    assert.ok(getTimeToTarget(0, compartment) > time);
    const extraTemperature = { ...compartment, ambientTemp: -18 };
    assert.equal(getTimeToTarget(4, extraTemperature), time);
});

test("the freezer compartment cannot reach its ambient temperature", () => {
    const compartment = { ...defaultParams, method: "freezerCompartment" } as const;
    assert.equal(getTimeToTarget(-6, compartment), Infinity);
    assert.equal(getTimeToTarget(-7, compartment), Infinity);
});

test("cooling methods list the freezer compartment before the freezer", () => {
    assert.deepEqual(Object.keys(COOLING_METHODS), [
        "fridge",
        "freezerCompartment",
        "freezer",
    ]);
});

test("all methods reject container sizes that cannot represent a positive volume", () => {
    for (const method of ["fridge", "freezerCompartment", "freezer"] as const) {
        for (const size of ["0", "-330", "not-a-number", "Infinity"]) {
            assert.throws(
                () => calculateK({ ...defaultParams, method, size }),
                { name: "RangeError", message: "Container size must be a positive number" },
            );
        }
    }
});

test("cooling data starts at the initial temperature and decreases over time", () => {
    const result = generateCoolingData(defaultParams);

    assert.equal(result.data.length, 21);
    assert.deepEqual(result.data[0], { time: 0, temp: defaultParams.initialTemp });
    assert.ok(result.data.every((point, index, data) =>
        index === 0 || point.time > data[index - 1].time && point.temp <= data[index - 1].temp,
    ));
});

test("a drink whose ideal temperature is below fridge ambient has no finite estimate", () => {
    const spirits = { ...defaultParams, drinkType: "spirits", method: "fridge" } as const;
    const result = generateCoolingData(spirits);

    assert.equal(result.idealTemp, -5);
    assert.equal(result.timeToIdeal, Infinity);
    assert.ok(result.data.every((point) => Number.isFinite(point.time) && Number.isFinite(point.temp)));
});
