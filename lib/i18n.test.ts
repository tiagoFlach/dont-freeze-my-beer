import assert from "node:assert/strict";
import { test } from "node:test";
import { optionLabels, SUPPORTED_LANGUAGES, t } from "./i18n";

test("each supported language provides core interface labels", () => {
    for (const language of SUPPORTED_LANGUAGES) {
        assert.ok(t(language, "appName").length > 0);
        assert.ok(t(language, "formDrinkTypeLabel").length > 0);
        assert.ok(t(language, "chartTitle").length > 0);
    }
});

test("translation templates interpolate supplied values", () => {
    assert.equal(
        t("pt", "freezeAlertDescription", { time: 12 }),
        "Tempo estimado até 0°C: 12 min; não é um limite seguro. Confira regularmente: a bebida pode congelar antes mesmo do tempo estimado para gelar.",
    );
    assert.equal(
        t("en", "fridgeMinTimeLabel", { temp: 4.5 }),
        "Time to reach 4.5°C",
    );
});

test("missing interpolation values are replaced with an empty string", () => {
    assert.equal(t("es", "freezeAlertDescription"), "Tiempo estimado hasta 0°C:  min; no es un límite seguro. Compruébala con frecuencia: puede congelarse antes incluso del tiempo estimado de enfriamiento.");
});

test("option labels are available in every supported language", () => {
    for (const language of SUPPORTED_LANGUAGES) {
        assert.ok(optionLabels.drinkType.beer[language].length > 0);
        assert.ok(optionLabels.material.aluminum[language].length > 0);
        assert.ok(optionLabels.method.freezer[language].length > 0);
        assert.ok(optionLabels.method.freezerCompartment[language].length > 0);
    }
});

test("the Portuguese options distinguish the freezer and its compartment", () => {
    assert.equal(optionLabels.method.freezer.pt, "Freezer");
    assert.equal(optionLabels.method.freezerCompartment.pt, "Congelador");
});
