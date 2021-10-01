import { load } from './loader';
import { Map as JMap } from '@webmaps/jakarta';
import { runner } from './config';
import { measureRender } from './tests/render';
import { measureLabeling } from './tests/labeling';
import { measureParser } from './tests/parser';
import { describe, it, createUI } from 'describe-it-browser';
import * as dat from 'dat.gui';
import { cases } from './tests/render/scenarios';

export const runnerAddr = `http://${runner.hostname}:${runner.port}`

const params = {
    reference: 'https://mapgl.2gis.com/api/js',
    target: 'https://jakarta.web-staging.2gis.ru/sdk/index.js',

    styleId: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b'
}

const log = async (msg: any) => console.log(msg) /* fetch(`${runnerAddr}/log/`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(msg),
}); */

const finish = async (success: boolean) => console.log('end'); // fetch(`${runnerAddr}/exit/${success ? 'pass' : 'fail'}`);

let mapInstance;

type TestFunction = (map: JMap) => Promise<any>

function performTest(mapUrl: string, test: TestFunction) {
    return new Promise((resolve, reject) => {
        if (mapInstance) {
            mapInstance.destroy();
        }
        load(mapUrl).then(mapgl => {
            const map = mapInstance = new mapgl.Map('map', {
                key: '042b5b75-f847-4f2a-b695-b5f58adc9dfd',
                zoomControl: 'bottomRight',
                center: [82.897904, 54.98318],
                style: params.styleId,
                zoom: 16
            });
            map.once('idle', async () => {
                const jmap = map._impl as JMap;
                await log('Testing ' + (mapUrl || 'production'))
                resolve(await test(jmap));
            })
        });    
    })
}

async function performComparingTest (test: TestFunction) {
    const referenceResults: any = await performTest(params.reference, test);
    const targetResults: any = await performTest(params.target, test);
    for (const indicator in referenceResults) {
        const referenceStats = referenceResults[indicator]
        const targetStats = targetResults[indicator]
        await log(indicator);
        for (const percentile in referenceStats) {
            let delta = (targetStats[percentile] - referenceStats[percentile]).toFixed(2);
            if (delta[0] !== '-') {
                delta = `+${delta}`
            }
            await log(`  ${percentile} ${delta} (${targetStats[percentile]}/${referenceStats[percentile]})`);
        }    
    }
    await finish(true);
}

it('Parser', () => performComparingTest(measureParser));

it('Labeling', () => performComparingTest(measureLabeling));

describe('Rendering', () => {
    for (let prefCase in cases) {
        it(prefCase, () => performComparingTest(map => measureRender(map, prefCase as any)))
    }
});

const ui = new dat.GUI({ width: 300 });

ui.add(params, 'reference');
ui.add(params, 'target');

createUI(ui.addFolder('Cases'));