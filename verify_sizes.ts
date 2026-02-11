
import { CONTAINER_SIZES, calculateK, CoolingParams } from "./lib/cooling";
import { optionLabels } from "./lib/i18n";

console.log("Verifying Beverage Sizes...");

const drinks = ["beer", "wine", "spirits"] as const;

let errors = 0;

drinks.forEach(drink => {
    console.log(`\nChecking ${drink}...`);
    const sizes = CONTAINER_SIZES[drink];

    // Check if sizes exist
    if (!sizes) {
        console.error(`Missing sizes for ${drink}`);
        errors++;
        return;
    }

    Object.keys(sizes).forEach(size => {
        // Check if label exists
        const label = (optionLabels.size as any)[size];
        if (!label) {
            console.error(`Missing label for size: ${size}`);
            errors++;
        } else {
            console.log(`  - Size ${size}: OK (${label.en})`);
        }

        // Check calculation
        try {
            const params: CoolingParams = {
                drinkType: drink,
                initialTemp: 25,
                material: "glass",
                size: size,
                method: "fridge"
            };
            const k = calculateK(params);
            if (isNaN(k) || k <= 0) {
                console.error(`  - Calculation failed for ${drink} ${size}: k=${k}`);
                errors++;
            } else {
                // console.log(`  - k=${k.toFixed(4)}`);
            }
        } catch (e) {
            console.error(`  - Error calculating for ${drink} ${size}:`, e);
            errors++;
        }
    });
});

if (errors === 0) {
    console.log("\nVerification SUCCESS: All sizes definitions and calculations are valid.");
} else {
    console.error(`\nVerification FAILED with ${errors} errors.`);
    process.exit(1);
}
