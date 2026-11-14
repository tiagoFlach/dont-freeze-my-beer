/**
 * Newton's Law of Cooling: T(t) = Ts + (T0 - Ts) * e^(-kt)
 * 
 * Ts: Ambient temperature (surrounding environment)
 * T0: Initial temperature of the drink
 * k: Cooling constant
 * t: Time elapsed
 */

export const DRINK_TYPES = {
    beer: { idealTemp: 4, kBase: 0.04 },
    wine: { idealTemp: 10, kBase: 0.035 },
    spirits: { idealTemp: -5, kBase: 0.03 },
};

export const CONTAINER_MATERIALS = {
    glass: { mult: 0.95 },
    aluminum: { mult: 1 },
    plastic: { mult: 0.95 },
};

export const COOLING_METHODS = {
    fridge: { ambientTemp: 4 },
    freezerCompartment: { ambientTemp: -6 },
    freezer: { ambientTemp: -18 },
};

// Margin above the fridge ambient temperature used as its practical minimum,
// since Newton's model only approaches the ambient temperature asymptotically.
export const FRIDGE_MIN_MARGIN = 0.5;

// SINTEF measured water cooling from 21°C to 5°C in a -20°C freezer.
const FREEZER_REFERENCE = {
    ambientTemp: -20,
    initialTemp: 21,
    targetTemp: 5,
    canSize: 330,
    canMinutes: 60,
    bottleSize: 1500,
    bottleMinutes: 90,
};

const FREEZER_REFERENCE_K = Math.log(
    (FREEZER_REFERENCE.initialTemp - FREEZER_REFERENCE.ambientTemp) /
    (FREEZER_REFERENCE.targetTemp - FREEZER_REFERENCE.ambientTemp),
) / FREEZER_REFERENCE.canMinutes;

// The two samples differ in material as well as size; the material factors are assumptions.
const FREEZER_SIZE_EXPONENT = Math.log(
    (FREEZER_REFERENCE.bottleMinutes / FREEZER_REFERENCE.canMinutes) *
    (CONTAINER_MATERIALS.plastic.mult / CONTAINER_MATERIALS.aluminum.mult),
) / Math.log(FREEZER_REFERENCE.bottleSize / FREEZER_REFERENCE.canSize);

// Practical reference without thermometer validation, separate from the SINTEF measurements.
const FREEZER_CALIBRATION = {
    size: 350,
    initialTemp: 25,
    targetTemp: 4,
    minutes: 30,
};

const CALIBRATION_FACTOR = (
    Math.log(
        (FREEZER_CALIBRATION.initialTemp - COOLING_METHODS.freezer.ambientTemp) /
        (FREEZER_CALIBRATION.targetTemp - COOLING_METHODS.freezer.ambientTemp),
    ) / FREEZER_CALIBRATION.minutes
) / (
    FREEZER_REFERENCE_K *
    Math.pow(FREEZER_REFERENCE.canSize / FREEZER_CALIBRATION.size, FREEZER_SIZE_EXPONENT)
);

export const COOLING_RATE_MODEL = {
    referenceK: FREEZER_REFERENCE_K,
    calibrationFactor: CALIBRATION_FACTOR,
    referenceVolume: FREEZER_REFERENCE.canSize,
    volumeExponent: FREEZER_SIZE_EXPONENT,
} as const;

// Available container sizes in milliliters
export const CONTAINER_SIZES = {
    beer: {
        "330": true,
        "350": true,
        "473": true,
        "500": true,
        "750": true,
        "1000": true,
        "1500": true,
        "2000": true,
    },
    wine: {
        "350": true,
        "473": true,
        "500": true,
        "750": true,
        "1000": true,
        "1500": true,
    },
    spirits: {
        "350": true,
        "500": true,
        "750": true,
        "1000": true,
        "1500": true,
    },
};

export interface CoolingParams {
    drinkType: keyof typeof DRINK_TYPES;
    initialTemp: number;
    material: keyof typeof CONTAINER_MATERIALS;
    size: string; // Size key depends on drinkType
    method: keyof typeof COOLING_METHODS;
}

export const calculateK = (params: CoolingParams) => {
    const baseK = DRINK_TYPES[params.drinkType].kBase;
    const material = CONTAINER_MATERIALS[params.material];
    const volume = Number(params.size);

    if (!Number.isFinite(volume) || volume <= 0) {
        throw new RangeError("Container size must be a positive number");
    }

    return COOLING_RATE_MODEL.referenceK * COOLING_RATE_MODEL.calibrationFactor *
        (baseK / DRINK_TYPES.beer.kBase) *
        (material.mult / CONTAINER_MATERIALS.aluminum.mult) *
        Math.pow(COOLING_RATE_MODEL.referenceVolume / volume, COOLING_RATE_MODEL.volumeExponent);
};

export const getTemperatureAtTime = (t: number, params: CoolingParams) => {
    const Ts = COOLING_METHODS[params.method].ambientTemp;
    const T0 = params.initialTemp;
    const k = calculateK(params);

    return Ts + (T0 - Ts) * Math.exp(-k * t);
};

export const getTimeToTarget = (targetTemp: number, params: CoolingParams) => {
    const Ts = COOLING_METHODS[params.method].ambientTemp;
    const T0 = params.initialTemp;
    const k = calculateK(params);

    // No additional cooling is needed when the drink is already at or below the target.
    if (T0 <= targetTemp) return 0;

    // A drink above the target cannot reach a temperature at or below ambient.
    if (targetTemp <= Ts) return Infinity;

    // T = Ts + (T0 - Ts)e^-kt
    // (T - Ts) / (T0 - Ts) = e^-kt
    // ln((T - Ts) / (T0 - Ts)) = -kt
    // t = -ln((T - Ts) / (T0 - Ts)) / k

    const time = -Math.log((targetTemp - Ts) / (T0 - Ts)) / k;
    return Math.max(0, time);
};

export const generateCoolingData = (params: CoolingParams) => {
    const idealTemp = DRINK_TYPES[params.drinkType].idealTemp;
    const timeToIdeal = getTimeToTarget(idealTemp, params);

    const isTimeFinite = Number.isFinite(timeToIdeal);

    const chartTime = isTimeFinite
        ? timeToIdeal
        : params.method === "fridge"
            ? getTimeToTarget(COOLING_METHODS.fridge.ambientTemp + FRIDGE_MIN_MARGIN, params)
            : 0;

    // Generate data points up to 20% past the relevant time, or at least 60 mins.
    const maxTime = Math.max(60, chartTime * 1.2);
    const data = [];
    const steps = 20;
    for (let index = 0; index <= steps; index++) {
        const t = maxTime * index / steps;
        data.push({
            time: Math.round(t),
            temp: parseFloat(getTemperatureAtTime(t, params).toFixed(1)),
        });
    }

    return {
        data,
        timeToIdeal: isTimeFinite ? Math.round(timeToIdeal) : Infinity,
        idealTemp
    };
};
