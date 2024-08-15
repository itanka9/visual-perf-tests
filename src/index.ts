import { load } from './loader';
import { Map } from '@2gis/mapgl/types';
import { runner } from './config';
import { measureRender } from './tests/render';
import { describe, it, createUI } from 'describe-it-browser/src/lib';
import * as dat from 'dat.gui';
import { cases } from './tests/render/scenarios';

export const runnerAddr = `http://${runner.hostname}:${runner.port}`

const styles = [
    'b2b8046f-9bb0-469a-9860-9847032935cc',
    'eb10e2c3-3c28-4b81-b74b-859c9c4cf47e',
    'c080bb6a-8134-4993-93a1-5b4d8c36a59b',
    '8e055b04-e7b5-42a5-95e2-a0b5190a034e',
    '9c73b6cf-5d37-44a2-9a3e-68737b72d9a4',
    '9451a385-750a-4f28-ac7a-ddc7922db9b6'
]

const params = {
    // reference: '/index.js',
    // reference: 'http://192.168.1.179:3000/index.js',
    reference: 'https://mapgl.2gis.com/api/js/v1',
    target: 'https://jakarta.web-staging.2gis.ru/sdk/index.js',

    styleId: '8e055b04-e7b5-42a5-95e2-a0b5190a034e'
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

type TestFunction = (map: Map) => Promise<any>

function performTest(mapUrl: string, test: TestFunction) {
    return new Promise((resolve, reject) => {
        if (mapInstance) {
            mapInstance.destroy();
        }
        load(mapUrl).then(mapgl => {
            const map = mapInstance = (window as any).map = new mapgl.Map('map', {
                key: '4970330e-7f1c-4921-808c-0eb7c4e63001',
                zoomControl: 'bottomRight',
                center: [82.897904, 54.98318],
                style: params.styleId,
                styleState: {
                    immersiveRoadsOn: true
                },
                // @ts-ignore
                disableAntiAliasing: true,
                zoom: 16
            });
            // map.once('styleload', () => {
            //     (map as any).hideLayers({ type: 'gltfModel' });
            // })
            map.once('idle', async () => {
                const jmap = (map as any)._impl;
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

describe('Rendering', () => {
    for (let perfCase in cases) {
        it(perfCase, () => performTest(params.reference, map => measureRender(map, perfCase as any))) 
        // it(prefCase, () => performComparingTest(map => measureRender(map, prefCase as any)))
    }
});

const ui = new dat.GUI({ width: 300 });

ui.add(params, 'reference');
// ui.add(params, 'target');
ui.add(params, 'styleId', styles);

createUI(ui);