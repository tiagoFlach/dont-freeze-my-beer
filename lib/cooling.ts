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
    glass: { mult: 0.8 },
    aluminum: { mult: 1.5 },
    plastic: { mult: 0.7 },
};

export const COOLING_METHODS = {
    fridge: { ambientTemp: 4 },
    freezer: { ambientTemp: -18 },
};

// Simplified volume multiplier
// Smaller volume = faster cooling = higher multiplier
export const CONTAINER_SIZES = {
    beer: {
        "330": { mult: 1.12 },
        "350": { mult: 1.1 },
        "473": { mult: 1.05 },
        "500": { mult: 1.02 },
        "750": { mult: 0.9 },
        "1000": { mult: 0.8 },
        "1500": { mult: 0.7 },
        "2000": { mult: 0.6 },
    },
    wine: {
        "350": { mult: 1.1 },
        "473": { mult: 1.05 },
        "500": { mult: 1.02 },
        "750": { mult: 0.9 },
        "1000": { mult: 0.8 },
        "1500": { mult: 0.7 },
    },
    spirits: {
        "350": { mult: 1.1 },
        "500": { mult: 1.02 },
        "750": { mult: 0.9 },
        "1000": { mult: 0.8 },
        "1500": { mult: 0.7 },
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
    const materialMult = CONTAINER_MATERIALS[params.material].mult;

    // Get size multiplier safely
    const drinkSizes = CONTAINER_SIZES[params.drinkType] as Record<string, { mult: number }>;
    const sizeData = drinkSizes[params.size];

    // Fallback if size not found (shouldn't happen with correct form)
    const sizeMult = sizeData ? sizeData.mult : 1.0;

    // k is higher (faster cooling) for aluminum and smaller containers
    return baseK * materialMult * sizeMult;
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

    // If target temperature is lower than ambient, it will never reach it
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

    // Generate data points up to 20% past the ideal time, or at least 60 mins
    const maxTime = isTimeFinite ? Math.max(60, timeToIdeal * 1.2) : 60;
    const data = [];
    const steps = 20;
    const interval = maxTime / steps;

    for (let t = 0; t <= maxTime; t += interval) {
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
