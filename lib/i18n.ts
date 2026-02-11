export type Language = "en" | "pt" | "es";

type TranslationKey =
    | "appName"
    | "heroTitle"
    | "heroSubtitle"
    | "sectionSettings"
    | "sectionResult"
    | "estimatedTime"
    | "targetTemp"
    | "footnoteLine1"
    | "footnoteLine2"
    | "waitingParams"
    | "chartTitle"
    | "chartIdealBadge"
    | "chartXAxis"
    | "chartYAxis"
    | "chartIdealLabel"
    | "chartTooltipMin"
    | "formDrinkTypeLabel"
    | "formDrinkTypePlaceholder"
    | "formInitialTempLabel"
    | "formSizeLabel"
    | "formSizePlaceholder"
    | "formMaterialLabel"
    | "formMethodLabel"
    | "languageSelectLabel"
    | "languageSelectPlaceholder"
    | "themeToggleLabel"
    | "githubLabel"
    | "minutesShort";

const translations: Record<Language, Record<TranslationKey, string>> = {
    en: {
        appName: "Don't Freeze My Beer",
        heroTitle: "Don't Freeze Your Beer",
        heroSubtitle:
            "Calculate the exact time for your drink to reach the ideal temperature. Using real physics to guarantee the perfect sip.",
        sectionSettings: "Settings",
        sectionResult: "Result",
        estimatedTime: "Estimated Time",
        targetTemp: "Target Temperature",
        footnoteLine1: "* Calculations based on Newton's Law of Cooling.",
        footnoteLine2: "Results may vary depending on the equipment.",
        waitingParams: "Waiting for parameters to calculate...",
        chartTitle: "Temperature Curve",
        chartIdealBadge: "Ideal: {temp}°C in {time} min",
        chartXAxis: "Time (min)",
        chartYAxis: "Temp (°C)",
        chartIdealLabel: "Ideal",
        chartTooltipMin: "min",
        formDrinkTypeLabel: "Drink Type",
        formDrinkTypePlaceholder: "Select the drink",
        formInitialTempLabel: "Room Temperature",
        formSizeLabel: "Container Size",
        formSizePlaceholder: "Select the size",
        formMaterialLabel: "Container Material",
        formMethodLabel: "Cooling Method",
        languageSelectLabel: "Select language",
        languageSelectPlaceholder: "Language",
        themeToggleLabel: "Toggle theme",
        githubLabel: "Open GitHub",
        minutesShort: "min",
    },
    pt: {
        appName: "Don't Freeze My Beer",
        heroTitle: "Não Congele Sua Cerveja",
        heroSubtitle:
            "Calcule o tempo exato para sua bebida chegar na temperatura ideal. Utilizando física real para garantir o gole perfeito.",
        sectionSettings: "Configurações",
        sectionResult: "Resultado",
        estimatedTime: "Tempo Estimado",
        targetTemp: "Temperatura Alvo",
        footnoteLine1: "* Cálculos baseados na Lei do Resfriamento de Newton.",
        footnoteLine2: "Resultados podem variar conforme o equipamento.",
        waitingParams: "Aguardando parâmetros para calcular...",
        chartTitle: "Curva de Temperatura",
        chartIdealBadge: "Ideal: {temp}°C em {time} min",
        chartXAxis: "Tempo (min)",
        chartYAxis: "Temp (°C)",
        chartIdealLabel: "Ideal",
        chartTooltipMin: "min",
        formDrinkTypeLabel: "Tipo de Bebida",
        formDrinkTypePlaceholder: "Selecione a bebida",
        formInitialTempLabel: "Temperatura Ambiente",
        formSizeLabel: "Tamanho do Recipiente",
        formSizePlaceholder: "Selecione o tamanho",
        formMaterialLabel: "Material do Recipiente",
        formMethodLabel: "Método de Resfriamento",
        languageSelectLabel: "Selecionar idioma",
        languageSelectPlaceholder: "Idioma",
        themeToggleLabel: "Alternar tema",
        githubLabel: "Abrir GitHub",
        minutesShort: "min",
    },
    es: {
        appName: "Don't Freeze My Beer",
        heroTitle: "No Congeles Tu Cerveza",
        heroSubtitle:
            "Calcula el tiempo exacto para que tu bebida llegue a la temperatura ideal. Usando física real para garantizar el sorbo perfecto.",
        sectionSettings: "Configuración",
        sectionResult: "Resultado",
        estimatedTime: "Tiempo Estimado",
        targetTemp: "Temperatura Objetivo",
        footnoteLine1: "* Cálculos basados en la Ley de Enfriamiento de Newton.",
        footnoteLine2: "Los resultados pueden variar según el equipo.",
        waitingParams: "Esperando parámetros para calcular...",
        chartTitle: "Curva de Temperatura",
        chartIdealBadge: "Ideal: {temp}°C en {time} min",
        chartXAxis: "Tiempo (min)",
        chartYAxis: "Temp (°C)",
        chartIdealLabel: "Ideal",
        chartTooltipMin: "min",
        formDrinkTypeLabel: "Tipo de Bebida",
        formDrinkTypePlaceholder: "Selecciona la bebida",
        formInitialTempLabel: "Temperatura Ambiente",
        formSizeLabel: "Tamano del Recipiente",
        formSizePlaceholder: "Selecciona el tamano",
        formMaterialLabel: "Material del Recipiente",
        formMethodLabel: "Metodo de Enfriamiento",
        languageSelectLabel: "Seleccionar idioma",
        languageSelectPlaceholder: "Idioma",
        themeToggleLabel: "Cambiar tema",
        githubLabel: "Abrir GitHub",
        minutesShort: "min",
    },
};

export const optionLabels = {
    drinkType: {
        beer: { en: "Beer", pt: "Cerveja", es: "Cerveza" },
        wine: { en: "Wine", pt: "Vinho", es: "Vino" },
        spirits: { en: "Spirits", pt: "Destilado", es: "Destilado" },
    },
    material: {
        glass: { en: "Glass", pt: "Vidro", es: "Vidrio" },
        aluminum: { en: "Can (Aluminum)", pt: "Lata (Aluminio)", es: "Lata (Aluminio)" },
        plastic: { en: "Plastic", pt: "Plastico", es: "Plastico" },
    },
    size: {
        "330": { en: "330ml", pt: "330ml", es: "330ml" },
        "350": { en: "350ml", pt: "350ml", es: "350ml" },
        "473": { en: "473ml", pt: "473ml", es: "473ml" },
        "500": { en: "500ml", pt: "500ml", es: "500ml" },
        "750": { en: "750ml", pt: "750ml", es: "750ml" },
        "1000": { en: "1 L", pt: "1 L", es: "1 L" },
        "1500": { en: "1.5 L", pt: "1,5 L", es: "1,5 L" },
        "2000": { en: "2 L", pt: "2 L", es: "2 L" },
    },
    method: {
        fridge: { en: "Fridge", pt: "Geladeira", es: "Nevera" },
        freezer: { en: "Freezer", pt: "Freezer", es: "Congelador" },
    },
} as const;

export function t(
    language: Language,
    key: TranslationKey,
    vars: Record<string, string | number> = {},
) {
    const template = translations[language]?.[key] ?? translations.en[key];

    return template.replace(/\{(\w+)\}/g, (_, name) => {
        const value = vars[name];
        return value === undefined ? "" : String(value);
    });
}
