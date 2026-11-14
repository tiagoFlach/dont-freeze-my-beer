export type Language = "en" | "pt" | "es";

type TranslationKey =
    | "appName"
    | "metaTitle"
    | "metaDescription"
    | "metaKeywords"
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
    | "chartAlreadyCool"
    | "chartUnreachable"
    | "formDrinkTypeLabel"
    | "formDrinkTypePlaceholder"
    | "formInitialTempLabel"
    | "formSizeLabel"
    | "formSizePlaceholder"
    | "formMaterialLabel"
    | "formMethodLabel"
    | "formMethodTempNote"
    | "formMethodTempHelp"
    | "languageSelectLabel"
    | "languageSelectPlaceholder"
    | "themeToggleLabel"
    | "githubLabel"
    | "minutesShort"
    | "formulaTitle"
    | "formulaSubtitle"
    | "formulaDescriptionT"
    | "formulaDescriptionTs"
    | "formulaDescriptionTk"
    | "rateCalculationTitle"
    | "rateReference"
    | "rateCalibration"
    | "rateDrink"
    | "rateMaterial"
    | "rateVolume"
    | "rateExponent"
    | "rateRounded"
    | "formulaAssumptions"
    | "formulaEstimate"
    | "formulaSource"
    | "freezerSource"
    | "idealTempsTitle"
    | "freezeAlertTitle"
    | "freezeAlertDescription"
    | "freezeNeverLabel"
    | "fridgeMinTimeLabel";

const translations: Record<Language, Record<TranslationKey, string>> = {
    en: {
        appName: "Don't Freeze My Beer",
        metaTitle: "Don't Freeze My Beer | Perfect chill time calculator",
        metaDescription:
            "Estimate the time for your drink to reach the ideal temperature with a simplified cooling model.",
        metaKeywords:
            "beer cooling calculator, drink temperature, chill time, ideal temperature, Newton cooling, freezer time",
        heroTitle: "Don't Freeze Your Beer",
        heroSubtitle:
            "Estimate the time for your drink to reach the ideal temperature using a simplified cooling model.",
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
        chartAlreadyCool: "Already at or below the target temperature.",
        chartUnreachable:
            "The model cannot reach the target because it is at or below the surrounding temperature.",
        formDrinkTypeLabel: "Drink Type",
        formDrinkTypePlaceholder: "Select the drink",
        formInitialTempLabel: "Initial Drink Temperature",
        formSizeLabel: "Container Size",
        formSizePlaceholder: "Select the size",
        formMaterialLabel: "Container Material",
        formMethodLabel: "Cooling Method",
        formMethodTempNote: "Note:",
        formMethodTempHelp: "Reference temperatures may vary depending on the appliance.",
        languageSelectLabel: "Select language",
        languageSelectPlaceholder: "Language",
        themeToggleLabel: "Toggle theme",
        githubLabel: "Open GitHub",
        minutesShort: "min",
        formulaTitle: "How it works",
        formulaSubtitle: "Simplified model and its limitations",
        formulaDescriptionT: "T(t) = Temperature at time t",
        formulaDescriptionTs:
            "T_s = Surrounding temperature (fridge, freezer, or freezer compartment), assumed constant.",
        formulaDescriptionTk: "k = Estimated cooling constant (drink, material, and size)",
        rateCalculationTitle: "Cooling constant for the selected settings",
        rateReference: "Reference rate from the SINTEF experiment",
        rateCalibration: "Practical calibration factor",
        rateDrink: "Drink coefficients (selected / beer)",
        rateMaterial: "Material factors (selected / aluminum)",
        rateVolume: "Volumes (reference / selected)",
        rateExponent: "Volume exponent",
        rateRounded: "Values are rounded for display.",
        formulaAssumptions:
            "The model assumes a constant surrounding temperature and a uniform drink temperature.",
        formulaEstimate:
            "All methods use the same estimated rate with different surrounding temperatures. The rate starts from a test with water and is adjusted to a practical reference without thermometer validation: 30 min for a 350 ml aluminum can cooling from 25°C to 4°C in a freezer. Other estimates are unvalidated extrapolations; times can vary with the drink and equipment.",
        formulaSource: "Formula source: Newton's law of cooling (OpenStax)",
        freezerSource: "Freezer experiment: SINTEF (in English)",
        idealTempsTitle: "Ideal Temperatures",
        freezeAlertTitle: "Freezing Alert",
        freezeAlertDescription:
            "Estimated time to 0°C: {time} min; this is not a safe limit. Check regularly: the drink may freeze before the estimated cooling time.",
        freezeNeverLabel: "Not expected to freeze",
        fridgeMinTimeLabel: "Time to reach {temp}°C",
    },
    pt: {
        appName: "Don't Freeze My Beer",
        metaTitle: "Don't Freeze My Beer | Calculadora do tempo ideal de gelar",
        metaDescription:
            "Estime o tempo para sua bebida chegar à temperatura ideal com um modelo simplificado de resfriamento.",
        metaKeywords:
            "tempo para gelar cerveja, temperatura da bebida, calculadora de resfriamento, temperatura ideal, lei de Newton",
        heroTitle: "Não Congele Sua Cerveja",
        heroSubtitle:
            "Estime o tempo para sua bebida chegar à temperatura ideal usando um modelo simplificado de resfriamento.",
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
        chartAlreadyCool: "Já está na temperatura alvo ou abaixo dela.",
        chartUnreachable:
            "O modelo não atinge a temperatura alvo porque ela é igual ou inferior à temperatura do ambiente.",
        formDrinkTypeLabel: "Tipo de Bebida",
        formDrinkTypePlaceholder: "Selecione a bebida",
        formInitialTempLabel: "Temperatura Inicial da Bebida",
        formSizeLabel: "Tamanho do Recipiente",
        formSizePlaceholder: "Selecione o tamanho",
        formMaterialLabel: "Material do Recipiente",
        formMethodLabel: "Método de Resfriamento",
        formMethodTempNote: "Observação:",
        formMethodTempHelp: "Temperaturas de referência; podem variar conforme o aparelho.",
        languageSelectLabel: "Selecionar idioma",
        languageSelectPlaceholder: "Idioma",
        themeToggleLabel: "Alternar tema",
        githubLabel: "Abrir GitHub",
        minutesShort: "min",
        formulaTitle: "Como funciona",
        formulaSubtitle: "Modelo simplificado e suas limitações",
        formulaDescriptionT: "T(t) = Temperatura no tempo t",
        formulaDescriptionTs:
            "T_s = Temperatura ambiente (geladeira, freezer ou congelador), considerada constante.",
        formulaDescriptionTk:
            "k = Constante de resfriamento estimada (bebida, material e tamanho)",
        rateCalculationTitle: "Constante de resfriamento para as opções selecionadas",
        rateReference: "Taxa de referência do experimento da SINTEF",
        rateCalibration: "Fator de calibração prática",
        rateDrink: "Coeficientes de bebida (selecionada / cerveja)",
        rateMaterial: "Fatores de material (selecionado / alumínio)",
        rateVolume: "Volumes (referência / selecionado)",
        rateExponent: "Expoente do volume",
        rateRounded: "Valores arredondados para exibição.",
        formulaAssumptions:
            "O modelo supõe temperatura ambiente constante e temperatura uniforme na bebida.",
        formulaEstimate:
            "Todos os métodos usam a mesma taxa estimada, com temperaturas ambientes diferentes. A taxa parte de um teste com água e foi ajustada a uma referência prática, sem medição com termômetro: 30 min para uma lata de alumínio de 350 ml, de 25°C a 4°C no freezer. As demais estimativas são extrapolações não validadas; os tempos podem variar conforme a bebida e o equipamento.",
        formulaSource: "Fonte da fórmula: Lei do Resfriamento de Newton (OpenStax, em inglês)",
        freezerSource: "Experimento no freezer: SINTEF (em inglês)",
        idealTempsTitle: "Temperaturas Ideais",
        freezeAlertTitle: "Alerta de Congelamento",
        freezeAlertDescription:
            "Tempo estimado até 0°C: {time} min; não é um limite seguro. Confira regularmente: a bebida pode congelar antes mesmo do tempo estimado para gelar.",
        freezeNeverLabel: "Nao deve congelar",
        fridgeMinTimeLabel: "Tempo até {temp}°C",
    },
    es: {
        appName: "Don't Freeze My Beer",
        metaTitle: "Don't Freeze My Beer | Calculadora de enfriamiento ideal",
        metaDescription:
            "Estima el tiempo para que tu bebida alcance la temperatura ideal con un modelo simplificado de enfriamiento.",
        metaKeywords:
            "tiempo para enfriar cerveza, temperatura de bebida, calculadora de enfriamiento, temperatura ideal, ley de Newton",
        heroTitle: "No Congeles Tu Cerveza",
        heroSubtitle:
            "Estima el tiempo para que tu bebida alcance la temperatura ideal usando un modelo simplificado de enfriamiento.",
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
        chartAlreadyCool: "Ya está en la temperatura objetivo o por debajo de ella.",
        chartUnreachable:
            "El modelo no alcanza la temperatura objetivo porque es igual o inferior a la temperatura ambiente.",
        formDrinkTypeLabel: "Tipo de Bebida",
        formDrinkTypePlaceholder: "Selecciona la bebida",
        formInitialTempLabel: "Temperatura Inicial de la Bebida",
        formSizeLabel: "Tamano del Recipiente",
        formSizePlaceholder: "Selecciona el tamano",
        formMaterialLabel: "Material del Recipiente",
        formMethodLabel: "Metodo de Enfriamiento",
        formMethodTempNote: "Nota:",
        formMethodTempHelp: "Las temperaturas de referencia pueden variar según el equipo.",
        languageSelectLabel: "Seleccionar idioma",
        languageSelectPlaceholder: "Idioma",
        themeToggleLabel: "Cambiar tema",
        githubLabel: "Abrir GitHub",
        minutesShort: "min",
        formulaTitle: "Cómo funciona",
        formulaSubtitle: "Modelo simplificado y sus limitaciones",
        formulaDescriptionT: "T(t) = Temperatura en el tiempo t",
        formulaDescriptionTs:
            "T_s = Temperatura ambiente (nevera, congelador o compartimento congelador), considerada constante.",
        formulaDescriptionTk:
            "k = Constante de enfriamiento estimada (bebida, material y tamaño)",
        rateCalculationTitle: "Constante de enfriamiento para las opciones seleccionadas",
        rateReference: "Tasa de referencia del experimento de SINTEF",
        rateCalibration: "Factor de calibración práctica",
        rateDrink: "Coeficientes de bebida (seleccionada / cerveza)",
        rateMaterial: "Factores de material (seleccionado / aluminio)",
        rateVolume: "Volúmenes (referencia / seleccionado)",
        rateExponent: "Exponente del volumen",
        rateRounded: "Valores redondeados para mostrar.",
        formulaAssumptions:
            "El modelo supone una temperatura ambiente constante y una temperatura uniforme en la bebida.",
        formulaEstimate:
            "Todos los métodos usan la misma tasa estimada con distintas temperaturas ambiente. La tasa parte de una prueba con agua y se ajusta a una referencia práctica sin medición con termómetro: 30 min para una lata de aluminio de 350 ml, de 25°C a 4°C en el congelador. Las demás estimaciones son extrapolaciones no validadas; los tiempos pueden variar según la bebida y el equipo.",
        formulaSource: "Fuente de la fórmula: ley de enfriamiento de Newton (OpenStax, en inglés)",
        freezerSource: "Experimento en congelador: SINTEF (en inglés)",
        idealTempsTitle: "Temperaturas Ideales",
        freezeAlertTitle: "Alerta de Congelacion",
        freezeAlertDescription:
            "Tiempo estimado hasta 0°C: {time} min; no es un límite seguro. Compruébala con frecuencia: puede congelarse antes incluso del tiempo estimado de enfriamiento.",
        freezeNeverLabel: "No se espera que congele",
        fridgeMinTimeLabel: "Tiempo hasta {temp}°C",
    },
};

export const SUPPORTED_LANGUAGES: Language[] = ["pt", "en", "es"];

export const optionLabels = {
    drinkType: {
        beer: { en: "Beer", pt: "Cerveja", es: "Cerveza" },
        wine: { en: "Wine", pt: "Vinho", es: "Vino" },
        spirits: { en: "Spirits", pt: "Destilado", es: "Destilado" },
    },
    material: {
        glass: { en: "Glass", pt: "Vidro", es: "Vidrio" },
        aluminum: { en: "Can (Aluminum)", pt: "Lata (Alumínio)", es: "Lata (Alumínio)" },
        plastic: { en: "Plastic", pt: "Plástico", es: "Plastico" },
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
        freezerCompartment: { en: "Freezer compartment", pt: "Congelador", es: "Compartimento congelador" },
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
