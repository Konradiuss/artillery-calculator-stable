export const translations = {
  en: {
    // Navigation & Main Titles
    title: "Artillery Spotter Calculator",
    directMode: "Direct Fire",
    triangulationMode: "Triangulation",
    groupMode: "Group Fire",

    // Common Terms
    distance: "Distance",
    azimuth: "Azimuth",
    calculate: "Calculate",
    meters: "m",
    degrees: "°",
    coordinates: "Coordinates",
    error: "Error",
    warning: "Warning",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    

    // Artillery Types
    artilleryType: "Artillery Type",
    type120mm: "120mm Artillery",
    type150mm: "150mm Artillery",
    typeRocket: "Rocket Artillery",
    type300mm: "300mm Artillery",

    // Direct Fire Mode
    artilleryDistance: "Distance to Artillery",
    artilleryAzimuth: "Azimuth to Artillery",
    targetDistance: "Distance to Target",
    targetAzimuth: "Azimuth to Target",
    calculateFiring: "Calculate Firing Solution",

    // Wind Settings
    windLevel: "Wind Level",
    windDirection: "Wind Direction",
    noWind: "No Wind",
    level1: "Level 1",
    level2: "Level 2",
    level3: "Level 3",
    level4: "Level 4 ",
    level5: " 5",

    // Compass Directions
    north: "N",
    south: "S",
    east: "E",
    west: "W",
    northeast: "NE",
    northwest: "NW",
    southeast: "SE",
    southwest: "SW",

    // Calculation Results
    setOnArtillery: "Set on Artillery:",
    baseParameters: "Base Parameters:",
    windCorrections: "Wind Corrections:",
    finalParameters: "Final Parameters:",
    rangeCorrection: "Range Correction",
    deflectionCorrection: "Deflection Correction",
    firingDistance: "Firing Distance",
    firingAzimuth: "Firing Azimuth",

    // Map Elements
    artillery: "Artillery",
    target: "Target",
    spotter: "Spotter",
    impact: "Impact Point",
    firingDirection: "Firing Direction",
    windIndicator: "Wind Direction",
    gridScale: "1 grid = 1 meter",
    legendArtillery: "Artillery",
    legendSpotter: "Spotter",
    legendTarget: "Target",
    legendImpact: "Impact",

    // Triangulation Mode
    impactDistance: "Impact Distance",
    impactAzimuth: "Impact Azimuth",
    corrections: "Corrections",
    changeDistance: "Change Distance by",
    changeAzimuth: "Change Azimuth by",
    correctionNote: "⚠️ Corrections indicate how much to change current artillery settings",
    requiredCorrections: "Required Corrections",
    calculationResults: "Calculation Results",
    calculateCorrections: "Calculate Corrections",

    // Group Fire Mode
    centralArtillery: "Central Artillery",
    artilleryGroup: "Artillery Group",
    artilleryUnit: "Artillery Unit",
    centralDistance: "Central Artillery Distance",
    centralAzimuth: "Central Artillery Azimuth",
    noCorrections: "No Corrections Needed",
    calculateGroup: "Calculate Group Corrections",
    artilleryCorrections: "Artillery Corrections",

    // Shot History
    shotHistory: "Shot History",
    downloadHistory: "Download History",
    shot: "Shot",
    timestamp: "Time",
    settings: "Settings",
    results: "Results",
    clearHistory: "Clear History",
    noHistory: "No shots recorded",
    mode: "Mode",

    // Instructions and Help
    directFireInstructions: [
      '1. Look at artillery through binoculars and note distance and azimuth',
      '2. Look at target and note its distance and azimuth',
      '3. Set wind strength and direction from Wind Sock',
      '4. Calculator will provide parameters for artillery setup'
    ].join('\n'),

    triangulationInstructions: [
      '1. Enter distance and azimuth to target',
      '2. Enter distance and azimuth to impact point',
      '3. Calculator will determine necessary corrections for accurate hit'
    ].join('\n'),

    groupFireInstructions: [
      '1. Double click empty cell to place artillery',
      '2. Double click existing artillery to remove it',
      '3. Central artillery (red) can only be moved',
      '4. Drag artillery to change its position'
    ].join('\n'),

    // Wind Guide
    windGuide: "Wind Level Guide:",
    windLevels: "Visual Wind Level References",
    windDeviation: "Wind Deviation Guide:",
    deviationNote: "Deviation per wind level:",
    maximum: "maximum",
    windEffectNote: "Wind affects both firing distance and lateral shell deviation.",
    windDirections: "Wind directions: 0° = North, 90° = East, 180° = South, 270° = West.",
    windLevelGuide: "Visual wind level reference:",


    // Tooltips
    dragToMove: "Drag to move",
    doubleClickToRemove: "Double click to remove",
    clickToPlace: "Click to place artillery",

    // Errors and Notifications
    invalidInput: "Invalid input",
    requiredField: "Required field",
    outOfRange: "Value out of range",
    calculationError: "Error in calculations",
    successCalculation: "Calculation successful",

    // Additional UI Elements
    loading: "Loading...",
    processing: "Processing...",
    calculated: "Calculated",
    reset: "Reset",
    update: "Update",
    apply: "Apply",
    remove: "Remove",
    add: "Add",
    moveUp: "Move Up",
    moveDown: "Move Down",
    result: "Result",
  },

  ua: {
    // Navigation & Main Titles
    title: "Калькулятор навідника артилерії",
    directMode: "Прямий вогонь",
    triangulationMode: "Тріангуляція",
    groupMode: "Груповий вогонь",

    // Common Terms
    distance: "Дистанція",
    azimuth: "Азимут",
    calculate: "Розрахувати",
    meters: "м",
    degrees: "°",
    coordinates: "Координати",
    error: "Помилка",
    warning: "Попередження",
    confirm: "Підтвердити",
    cancel: "Скасувати",
    save: "Зберегти",
    delete: "Видалити",
    edit: "Редагувати",
    close: "Закрити",

    // Artillery Types
    artilleryType: "Тип артилерії",
    type120mm: "120мм Артилерія",
    type150mm: "150мм Артилерія",
    typeRocket: "Реактивна артилерія",
    type300mm: "300мм Артилерія",

    // Direct Fire Mode
    artilleryDistance: "Дистанція до артилерії",
    artilleryAzimuth: "Азимут до артилерії",
    targetDistance: "Дистанція до цілі",
    targetAzimuth: "Азимут до цілі",
    calculateFiring: "Розрахувати рішення для стрільби",

    // Wind Settings
    windLevel: "Рівень вітру",
    windDirection: "Напрямок вітру",
    noWind: "Без вітру",
    level1: "Рівень 1",
    level2: "Рівень 2",
    level3: "Рівень 3",
    level4: "Рівень 4 ",
    level5: " 5",

    // Compass Directions
    north: "N",
    south: "S",
    east: "E",
    west: "W",
    northeast: "NE",
    northwest: "NW",
    southeast: "SE",
    southwest: "SW",

    // Calculation Results
    setOnArtillery: "Встановити на артилерії:",
    baseParameters: "Базові параметри:",
    windCorrections: "Поправки на вітер:",
    finalParameters: "Фінальні параметри:",
    rangeCorrection: "Коригування дальності",
    deflectionCorrection: "Коригування відхилення",
    firingDistance: "Дистанція стрільби",
    firingAzimuth: "Азимут стрільби",

    // Map Elements
    artillery: "Артилерія",
    target: "Ціль",
    spotter: "Навідник",
    impact: "Точка влучання",
    firingDirection: "Напрямок стрільби",
    windIndicator: "Напрямок вітру",
    gridScale: "1 клітинка = 1 метр",
    legendArtillery: "Артилерія",
    legendSpotter: "Навідник",
    legendTarget: "Ціль",
    legendImpact: "Падіння",

    // Triangulation Mode
    impactDistance: "Дистанція влучання",
    impactAzimuth: "Азимут влучання",
    corrections: "Поправки",
    changeDistance: "Змінити дистанцію на",
    changeAzimuth: "Змінити азимут на",
    correctionNote: "⚠️ Поправки вказують, на скільки потрібно змінити поточні налаштування артилерії",
    requiredCorrections: "Необхідні поправки",
    calculationResults: "Результати розрахунку",
    calculateCorrections: "Розрахувати поправки",

    // Group Fire Mode
    centralArtillery: "Центральна артилерія",
    artilleryGroup: "Група артилерії",
    artilleryUnit: "Артилерійська одиниця",
    centralDistance: "Дистанція центральної артилерії",
    centralAzimuth: "Азимут центральної артилерії",
    noCorrections: "Поправки не потрібні",
    calculateGroup: "Розрахувати групові поправки",
    artilleryCorrections: "Поправки артилерії",

    // Shot History
    shotHistory: "Історія пострілів",
    downloadHistory: "Завантажити історію",
    shot: "Постріл",
    timestamp: "Час",
    settings: "Налаштування",
    results: "Результати",
    clearHistory: "Очистити історію",
    noHistory: "Немає записаних пострілів",
    mode: "Режим",

    // Instructions and Help
    directFireInstructions: [
      '1. Подивіться на артилерію через бінокль та запишіть дистанцію і азимут',
      '2. Подивіться на ціль та запишіть її дистанцію і азимут',
      '3. Встановіть силу та напрямок вітру за конусом-вітровказівником',
      '4. Калькулятор надасть параметри для налаштування артилерії'
    ].join('\n'),
    triangulationInstructions: [
      '1. Введіть дистанцію та азимут до цілі',
      '2. Введіть дистанцію та азимут до точки влучання',
      '3. Калькулятор визначить необхідні поправки для точного влучання'
    ].join('\n'),

    // Групповая наводка
    groupFireInstructions: [
      '1. Подвійний клік по пустій клітинці для розміщення артилерії',
      '2. Подвійний клік по існуючій артилерії для її видалення',
      '3. Центральну артилерію (червону) можна тільки переміщувати',
      '4. Перетягніть артилерію для зміни її позиції'
    ].join('\n'),

    // Wind Guide
    windGuide: "Довідник по рівнях вітру:",
    windLevels: "Візуальні позначення рівнів вітру",
    windDeviation: "Довідник відхилень від вітру:",
    deviationNote: "Відхилення на кожен рівень вітру:",
    maximum: "максимум",
    windEffectNote: "Вітер впливає як на дистанцію стрільби, так і на бічне відхилення снаряда.",
    windDirections: "Напрямок вітру: 0° = північний, 90° = східний, 180° = південний, 270° = західний.",
    windLevelGuide: "Візуальні підказки по рівнях вітру:",

    // Tooltips
    dragToMove: "Перетягніть для переміщення",
    doubleClickToRemove: "Подвійний клік для видалення",
    clickToPlace: "Клікніть для розміщення артилерії",

    // Errors and Notifications
    invalidInput: "Невірні дані",
    requiredField: "Обов'язкове поле",
    outOfRange: "Значення поза діапазоном",
    calculationError: "Помилка в розрахунках",
    successCalculation: "Розрахунок успішний",

    // Additional UI Elements
    loading: "Завантаження...",
    processing: "Обробка...",
    calculated: "Розраховано",
    reset: "Скинути",
    update: "Оновити",
    apply: "Застосувати",
    remove: "Видалити",
    add: "Додати",
    moveUp: "Перемістити вгору",
    moveDown: "Перемістити вниз",
    result: "Результат",
  },
  ru: {
    // Navigation & Main Titles
    title: "Калькулятор наводчика артиллерии",
    directMode: "Прямой огонь",
    triangulationMode: "Триангуляция",
    groupMode: "Групповой огонь",

    // Common Terms
    distance: "Дистанция",
    azimuth: "Азимут",
    calculate: "Рассчитать",
    meters: "м",
    degrees: "°",
    coordinates: "Координаты",
    error: "Ошибка",
    warning: "Предупреждение",
    confirm: "Подтвердить",
    cancel: "Отмена",
    save: "Сохранить",
    delete: "Удалить",
    edit: "Редактировать",
    close: "Закрыть",

    // Artillery Types
    artilleryType: "Тип артиллерии",
    type120mm: "120мм Артиллерия",
    type150mm: "150мм Артиллерия",
    typeRocket: "Реактивная артиллерия",
    type300mm: "300мм Артиллерия",

    // Direct Fire Mode
    artilleryDistance: "Дистанция до артиллерии",
    artilleryAzimuth: "Азимут до артиллерии",
    targetDistance: "Дистанция до цели",
    targetAzimuth: "Азимут до цели",
    calculateFiring: "Рассчитать решение для стрельбы",

    // Wind Settings
    windLevel: "Уровень ветра",
    windDirection: "Направление ветра",
    noWind: "Без ветра",
    level1: "Уровень 1",
    level2: "Уровень 2",
    level3: "Уровень 3",
    level4: "Уровень 4 ",
    level5: " 5",

    // Compass Directions
    north: "N",
    south: "S",
    east: "E",
    west: "W",
    northeast: "NE",
    northwest: "NW",
    southeast: "SE",
    southwest: "SW",

    // Calculation Results
    setOnArtillery: "Установить на артиллерии:",
    baseParameters: "Базовые параметры:",
    windCorrections: "Поправки на ветер:",
    finalParameters: "Финальные параметры:",
    rangeCorrection: "Корректировка дальности",
    deflectionCorrection: "Корректировка отклонения",
    firingDistance: "Дистанция стрельбы",
    firingAzimuth: "Азимут стрельбы",

    // Map Elements
    artillery: "Артиллерия",
    target: "Цель",
    spotter: "Наводчик",
    impact: "Точка попадания",
    firingDirection: "Направление стрельбы",
    windIndicator: "Направление ветра",
    gridScale: "1 клетка = 1 метр",
    legendArtillery: "Артиллерия",
    legendSpotter: "Наводчик",
    legendTarget: "Цель",
    legendImpact: "Падение",

    // Triangulation Mode
    impactDistance: "Дистанция попадания",
    impactAzimuth: "Азимут попадания",
    corrections: "Поправки",
    changeDistance: "Изменить дистанцию на",
    changeAzimuth: "Изменить азимут на",
    correctionNote: "⚠️ Поправки указывают, на сколько нужно изменить текущие настройки артиллерии",
    requiredCorrections: "Необходимые поправки",
    calculationResults: "Результаты расчета",
    calculateCorrections: "Рассчитать поправки",

    // Group Fire Mode
    centralArtillery: "Центральная артиллерия",
    artilleryGroup: "Группа артиллерии",
    artilleryUnit: "Артиллерийская единица",
    centralDistance: "Дистанция центральной артиллерии",
    centralAzimuth: "Азимут центральной артиллерии",
    noCorrections: "Поправки не требуются",
    calculateGroup: "Рассчитать групповые поправки",
    artilleryCorrections: "Поправки артиллерии",

    // Shot History
    shotHistory: "История выстрелов",
    downloadHistory: "Скачать историю",
    shot: "Выстрел",
    timestamp: "Время",
    settings: "Настройки",
    results: "Результаты",
    clearHistory: "Очистить историю",
    noHistory: "Нет записанных выстрелов",
    mode: "Режим",

    // Instructions and Help
    directFireInstructions: [
      '1. Посмотрите на артиллерию через бинокль и запишите дистанцию и азимут',
      '2. Посмотрите на цель и запишите её дистанцию и азимут',
      '3. Укажите силу и направление ветра по конусу-ветроуказателю',
      '4. Калькулятор выдаст параметры для установки на артиллерии'
    ].join('\n'),
    triangulationInstructions: [
      '1. Введите дистанцию и азимут до цели',
      '2. Введите дистанцию и азимут до точки падения снаряда',
      '3. Калькулятор определит необходимые поправки для точного попадания'
    ].join('\n'),

    // Групповая наводка
    groupFireInstructions: [
      '1. Двойной клик по пустой клетке для размещения артиллерии',
      '2. Двойной клик по существующей артиллерии для её удаления',
      '3. Центральную артиллерию (красную) можно только перемещать',
      '4. Перетащите артиллерию для изменения её позиции'
    ].join('\n'),

    // Wind Guide
    windGuide: "Справочник по уровням ветра:",
    windLevels: "Визуальные обозначения уровней ветра",
    windDeviation: "Справочник отклонений от ветра:",
    deviationNote: "Отклонение на каждый уровень ветра:",
    maximum: "максимум",
    windEffectNote: "Ветер влияет как на дистанцию стрельбы, так и на боковое отклонение снаряда.",
    windDirections: "Направление ветра: 0° = северный, 90° = восточный, 180° = южный, 270° = западный.",
    windLevelGuide: "Визуальные подсказки по уровням ветра:",

    // Tooltips
    dragToMove: "Перетащите для перемещения",
    doubleClickToRemove: "Двойной клик для удаления",
    clickToPlace: "Кликните для размещения артиллерии",

    // Errors and Notifications
    invalidInput: "Неверные данные",
    requiredField: "Обязательное поле",
    outOfRange: "Значение вне диапазона",
    calculationError: "Ошибка в расчетах",
    successCalculation: "Расчет успешен",

    // Additional UI Elements
    loading: "Загрузка...",
    processing: "Обработка...",
    calculated: "Рассчитано",
    reset: "Сбросить",
    update: "Обновить",
    apply: "Применить",
    remove: "Удалить",
    add: "Добавить",
    moveUp: "Переместить вверх",
    moveDown: "Переместить вниз",
    result: "Результат",
  }
};