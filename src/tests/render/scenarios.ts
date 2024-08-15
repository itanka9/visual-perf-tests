
// Типичный кейс для пользователя 2gis.ru:
// 1. Зайти на 11 зуме
// 2. Призумиться к фирме на 16

import { AnimationOptions, Easing, Map } from "@2gis/mapgl/types";

// 3. Немного отъехать назад
const common = [
    setZoom(11, { animate: false }),
    setZoom(16, {}, 4000),
    setZoom(15, {}, 200),
    setZoom(14, {}, 0),
    wait(5000),
];

// Кейс для тестирования сжираемой памяти приложением
const memory = [
    wait(3000),
    setZoom(17),
    setCenter([82.90849685668945, 54.98963080619362], { duration: 2500 }, 3000),
    setZoom(14, {}, 2000),
    setCenter([82.93664932250978, 55.01257157027201], {}, 1000),
    setZoom(17, { duration: 1000 }, 2000),
    setCenter([82.91759490966797, 55.03353169388017], { duration: 2000 }, 3000),
    setZoom(11, { duration: 1000 }, 2000),
    setCenter([82.99346923828126, 54.990123235010564], {}, 1000),
    setZoom(14, {}, 2000),
    setCenter([83.05990219116212, 54.961601652754766], { duration: 1000 }, 1500),
    setCenter([83.0900287628174, 54.87082857361671], { duration: 3000 }, 4000),
    setZoom(17, {}, 2000),
    setZoom(11, {}, 2000),
    setCenter([82.96875000000001, 55.02310220421264], {}, 1000),
    setZoom(17, {}, 2000),
    setCenter([82.90557861328126, 55.032547895706465], { duration: 5000 }, 6000),
    setZoom(14, {}, 2000),
    setCenter([82.86300659179689, 54.98362268811953], { duration: 3000 }, 3500),
    setZoom(17),
    setCenter([82.89753198623659, 54.979657822639815], { duration: 3000 }, 3500),
];

// Просто залипательный полет
const beauty = [
    wait(3000),
    setZoom(18, { duration: 3000 }, 4000),
    setCenter([82.94197082519533, 55.01454012325133], { duration: 40000 }, 41000),
    setCenter([82.91227340698244, 55.041401209743334], { duration: 30000 }, 31000),
];

// Ужас в Лимасоле
const lemesos = [
    setCenter([33.00456047058106, 34.671123309195046], { animate: false }, 0),
    setZoom(17, {}, 5000),
    setCenter([33.06970596313477, 34.70083628588871], { duration: 25000 }, 27000),
    setCenter([33.00456047058106, 34.671123309195046], { duration: 25000 }, 27000),
];

// Тест обычной производительности
// Карта уже инициализирована, шейдеры тоже
const perf = [
    wait(3000),
    setZoom(18, {}, 4000),
    setCenter([82.94197082519533, 55.01454012325133], { duration: 40000 }, 41000),
    setCenter([82.91227340698244, 55.041401209743334], { duration: 30000 }, 31000),
];

// Кейс для тестирования производительности карты в Москве на новых стилях пятерки
const moscow = [
    setCenter([37.6816, 55.75346], { animate: false }, 0),
    setZoom(11, {}, 5000),
    setCenter([37.6016, 55.77346], { duration: 2500 }, 3000),
    setZoom(13, {}, 2000),
    setCenter([37.6816, 55.75346], {}, 1000),
    setZoom(17, { duration: 1000 }, 2000),
    setCenter([37.6816, 55.75346], { duration: 2000 }, 3000),
    setZoom(15, { duration: 1000 }, 2000),
    setCenter([37.6816, 55.75346], {}, 1000),
    setZoom(14, {}, 2000),
    setCenter([37.6216, 55.55346], { duration: 1000 }, 1500),
    setCenter([37.7216, 55.85346], { duration: 2000 }, 3000),
    setZoom(17, {}, 2000),
    setZoom(9, {}, 2000),
    setCenter([37.5216, 55.55346], { duration: 1000 }, 1500),
    setCenter([38.5216, 55.85346], { duration: 3000 }, 4000),
    setZoom(11, {}, 2000),
    setCenter([37.5816, 55.85346], { duration: 4000 }, 5000),
    setCenter([37.9016, 55.55346], { duration: 4000 }, 5000),
    setZoom(14, {}, 2000),
    setCenter([37.4816, 55.75346], { duration: 2500 }, 3500),
    setZoom(16, {}, 2000),
    setCenter([37.61388, 55.75158], { duration: 3000 }, 3500),
    setCenter([37.60235, 55.75438], { duration: 3000 }, 3500),
    setZoom(17, {}, 2000),
    setCenter([37.601692, 55.744965], { duration: 2000 }, 3500),
    setCenter([37.58532, 55.746361], { duration: 2000 }, 3500),
];

const immersiveRaw = [
    // москва дефолт
    [
      { center: [37.62017, 55.753466], duration: 7, easing: 'easeInOutQuad' },
      { zoom: 11, pitch: 0, rotation: 0, duration: 7, easing: 'easeOutCubic' },
    ],
    // вднх вход
    [
      { center: [37.637587, 55.826326], duration: 80, easing: 'easeInOutQuad' },
      { zoom: 18.89, pitch: 44.13, rotation: 34.85, duration: 110, easing: 'easeInOutCubic' },
    ],
    // вднх отзум
    [
      { center: [37.630834, 55.830619], duration: 70, easing: 'easeInOutQuad' },
      { zoom: 16.39, pitch: 45, rotation: 174.95, duration: 80, easing: 'easeInOutCubic' },
    ],
    // вднх техника
    [
      { center: [37.623036, 55.83416], duration: 80, easing: 'easeInOutQuad' },
      { zoom: 18.75, pitch: 63.93, rotation: -84.33, duration: 90, easing: 'easeInOutCubic' },
    ],
    // вднх колесо
    [
      { center: [37.627831, 55.82705], duration: 70, easing: 'easeInOutQuad' },
      { zoom: 17.83, pitch: 58.31, rotation: -63.07, duration: 80, easing: 'easeInOutQuad' },
    ],
    // останкино
    [
      { center: [37.616066, 55.820679], duration: 60, easing: 'easeInOutSine' },
      { zoom: 16.34, pitch: 35.32, rotation: -62.37, duration: 70, easing: 'easeInOutSine' },
    ],
    // отзум
    [
      { center: [37.602637, 55.790551], duration: 60, easing: 'easeInOutSine' },
      { zoom: 11.68, pitch: 7.83, rotation: -11.69, duration: 60, easing: 'easeInOutSine' },
    ],
    // кутузовский
    [
      { center: [37.561666, 55.749094], duration: 80, easing: 'easeInOutSine' },
      { zoom: 18, pitch: 50, rotation: 115, duration: 80, easing: 'easeInOutCubic' },
    ],
    [
      { center: [37.55185, 55.746361], duration: 50, easing: 'easeInSine' },
      { zoom: 19.55, pitch: 70, rotation: 123.91, duration: 50, easing: 'easeInSine' },
    ],
    [
      { center: [37.534157, 55.739691], duration: 90, easing: 'easeOutSine' },
      { zoom: 19.44, pitch: 70, rotation: 33.37, duration: 90, easing: 'easeInCubic' },
    ],
    // сити
    [
      { center: [37.531171, 55.752421], duration: 80, easing: 'easeInOutQuad' },
      { zoom: 19.21, pitch: 57.61, rotation: -21.64, duration: 80, easing: 'easeInOutCubic' },
    ],
    [
      { center: [37.53787, 55.7489], duration: 60, easing: 'easeInOutSine' },
      { zoom: 16.27, pitch: 44.23, rotation: 176.37, duration: 60, easing: 'easeInOutSine' },
    ],
    // отзум
    [
      { center: [37.535044, 55.704878], duration: 60, easing: 'easeInOutSine' },
      { zoom: 13.16, pitch: 43.06, rotation: -92.59, duration: 70, easing: 'easeInOutQuad' },
    ],
    // мгу
    [
      { center: [37.523931, 55.699406, 0], duration: 70, easing: 'easeInOutSine' },
      { zoom: 16.76, pitch: 47.58, rotation: -45.38, duration: 80, easing: 'easeInOutCubic' },
    ],
    [
      { center: [37.545059, 55.708756, 0], duration: 60, easing: 'easeInOutQuad' },
      { zoom: 18.39, pitch: 37.51, rotation: -21.14, duration: 60, easing: 'easeInOutCubic' },
    ],
    [
      { center: [37.549656, 55.714078, 0], duration: 50, easing: 'easeInOutSine' },
      { zoom: 18.41, pitch: 64.12, rotation: -33.26, duration: 60, easing: 'easeInOutQuad' },
    ],
    // отзум
    [
      { center: [37.610546, 55.740738, 0], duration: 80, easing: 'easeInOutSine' },
      { zoom: 12.95, pitch: 42.29, rotation: -94.82, duration: 100, easing: 'easeInOutQuad' },
    ],
    // зарядье
    [
      { center: [37.629518, 55.750003, 0], duration: 90, easing: 'easeInOutQuad' },
      { zoom: 18.74, pitch: 67.44, rotation: 40.36, duration: 150, easing: 'easeInOutCubic' },
    ],
  ];
const immersive = [];

for (const scenario of immersiveRaw) {
    for (const viewRequest of scenario) {
        const duration = viewRequest.duration * 100;
        const easing = viewRequest.easing as Easing;
        if (viewRequest.center) {
            immersive.push(setCenter(viewRequest.center, { duration, easing }, 0));
        }
        if (viewRequest.zoom) {
            immersive.push(setZoom(viewRequest.zoom, { duration, easing }, 0));
        }
        if (viewRequest.rotation) {
            immersive.push(setRotation(viewRequest.rotation, { duration, easing }, 0));
        }
        if (viewRequest.pitch) {
            immersive.push(setPitch(viewRequest.pitch, { duration, easing }, 0));
        }
        immersive.push(wait(duration));
    }
}

export const cases: Record<string, Function[]> = { common, memory, beauty, lemesos, perf, moscow, immersive };


export function runTest(caseName: string, map: Map) {
    const caseTest = cases[caseName];
    if (!caseTest) {
        console.error('Test "' + caseName + '" not found');
        return;
    }
    let promise = Promise.resolve();

    caseTest.forEach((task) => {
        promise = promise.then((data) => {
            return task(data, map);
        });
    });

    return promise;
}

function setCenter(center: number[], options?: AnimationOptions, delay?: number) {
    if (typeof options !== 'object') {
        delay = options;
    }
    delay = delay === undefined ? 3000 : delay;

    return (data: any, map: Map) => {
        console.log('Set center to ' + center.join(', '));
        map.setCenter(center, options);
        return wait(delay)();
    };
}

function setRotation(rotation: number, options?: AnimationOptions, delay?: number) {
    if (typeof options !== 'object') {
        delay = options;
    }
    delay = delay === undefined ? 3000 : delay;

    return (data: any, map: Map) => {
        console.log('Set rotation to ' + rotation);
        map.setRotation(rotation, options);
        return wait(delay)();
    };
}

function setPitch(pitch: number, options?: AnimationOptions, delay?: number) {
    if (typeof options !== 'object') {
        delay = options;
    }
    delay = delay === undefined ? 3000 : delay;

    return (data: any, map: Map) => {
        console.log('Set pitch to ' + pitch);
        map.setPitch(pitch, options);
        return wait(delay)();
    };
}

function setZoom(zoom: number, options?: AnimationOptions, delay?: number) {
    if (typeof options !== 'object') {
        delay = options;
    }
    delay = delay === undefined ? 3000 : delay;

    return (data: any, map: Map) => {
        console.log('Set zoom to ' + zoom);
        map.setZoom(zoom, options);
        return wait(delay)();
    };
}

function wait(delay: number) {
    return (data?: any) =>
        new Promise((res) => {
            console.log('Wait ' + delay + 'ms');
            setTimeout(() => res(data), delay);
        });
}
