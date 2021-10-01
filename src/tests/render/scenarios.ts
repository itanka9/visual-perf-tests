
// Типичный кейс для пользователя 2gis.ru:
// 1. Зайти на 11 зуме
// 2. Призумиться к фирме на 16
// 3. Немного отъехать назад
const common = [
    setZoom(11, { animate: false }),
    setZoom(16, 4000),
    setZoom(15, 200),
    setZoom(14, 0),
    wait(5000),
];

// Кейс для тестирования сжираемой памяти приложением
const memory = [
    wait(3000),
    setZoom(17),
    setCenter([82.90849685668945, 54.98963080619362], { duration: 2500 }, 3000),
    setZoom(14, 2000),
    setCenter([82.93664932250978, 55.01257157027201], 1000),
    setZoom(17, { duration: 1000 }, 2000),
    setCenter([82.91759490966797, 55.03353169388017], { duration: 2000 }, 3000),
    setZoom(11, { duration: 1000 }, 2000),
    setCenter([82.99346923828126, 54.990123235010564], 1000),
    setZoom(14, 2000),
    setCenter([83.05990219116212, 54.961601652754766], { duration: 1000 }, 1500),
    setCenter([83.0900287628174, 54.87082857361671], { duration: 3000 }, 4000),
    setZoom(17, 2000),
    setZoom(11, 2000),
    setCenter([82.96875000000001, 55.02310220421264], 1000),
    setZoom(17, 2000),
    setCenter([82.90557861328126, 55.032547895706465], { duration: 5000 }, 6000),
    setZoom(14, 2000),
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
    setZoom(17, 5000),
    setCenter([33.06970596313477, 34.70083628588871], { duration: 25000 }, 27000),
    setCenter([33.00456047058106, 34.671123309195046], { duration: 25000 }, 27000),
];

// Тест обычной производительности
// Карта уже инициализирована, шейдеры тоже
const perf = [
    wait(3000),
    setZoom(18, 4000),
    setCenter([82.94197082519533, 55.01454012325133], { duration: 40000 }, 41000),
    setCenter([82.91227340698244, 55.041401209743334], { duration: 30000 }, 31000),
];

// Кейс для тестирования производительности карты в Москве на новых стилях пятерки
const moscow = [
    setCenter([37.6816, 55.75346], { animate: false }, 0),
    setZoom(11, 5000),
    setCenter([37.6016, 55.77346], { duration: 2500 }, 3000),
    setZoom(13, 2000),
    setCenter([37.6816, 55.75346], 1000),
    setZoom(17, { duration: 1000 }, 2000),
    setCenter([37.6816, 55.75346], { duration: 2000 }, 3000),
    setZoom(15, { duration: 1000 }, 2000),
    setCenter([37.6816, 55.75346], 1000),
    setZoom(14, 2000),
    setCenter([37.6216, 55.55346], { duration: 1000 }, 1500),
    setCenter([37.7216, 55.85346], { duration: 2000 }, 3000),
    setZoom(17, 2000),
    setZoom(9, 2000),
    setCenter([37.5216, 55.55346], { duration: 1000 }, 1500),
    setCenter([38.5216, 55.85346], { duration: 3000 }, 4000),
    setZoom(11, 2000),
    setCenter([37.5816, 55.85346], { duration: 4000 }, 5000),
    setCenter([37.9016, 55.55346], { duration: 4000 }, 5000),
    setZoom(14, 2000),
    setCenter([37.4816, 55.75346], { duration: 2500 }, 3500),
    setZoom(16, 2000),
    setCenter([37.61388, 55.75158], { duration: 3000 }, 3500),
    setCenter([37.60235, 55.75438], { duration: 3000 }, 3500),
    setZoom(17, 2000),
    setCenter([37.601692, 55.744965], { duration: 2000 }, 3500),
    setCenter([37.58532, 55.746361], { duration: 2000 }, 3500),
];

export const cases = { common, memory, beauty, lemesos, perf, moscow };

export function runTest(caseName, map) {
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

function setCenter(center, options?, delay?) {
    if (typeof options !== 'object') {
        delay = options;
    }
    delay = delay === undefined ? 3000 : delay;

    return (data, map) => {
        console.log('Set center to ' + center.join(', '));
        map.setCenter(center, options);
        return wait(delay)();
    };
}

// function setRotation(rotation, options?, delay?) {
//     if (typeof options !== 'object') {
//         delay = options;
//     }
//     delay = delay === undefined ? 3000 : delay;

//     return () => {
//         console.log('Set rotation to ' + rotation);
//         map.setRotation(rotation, options);
//         return wait(delay)();
//     };
// }

function setZoom(zoom, options?, delay?) {
    if (typeof options !== 'object') {
        delay = options;
    }
    delay = delay === undefined ? 3000 : delay;

    return (data, map) => {
        console.log('Set zoom to ' + zoom);
        map.setZoom(zoom, options);
        return wait(delay)();
    };
}

function wait(delay) {
    return (data?) =>
        new Promise((res) => {
            console.log('Wait ' + delay + 'ms');
            setTimeout(() => res(data), delay);
        });
}
