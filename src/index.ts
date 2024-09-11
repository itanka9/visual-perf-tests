import { load } from './loader';
import { Map } from '@2gis/mapgl/types';
import { runner } from './config';
import { measureRender } from './tests/render';
import { describe, it, createUI } from 'describe-it-browser/src/lib';
import * as dat from 'dat.gui';
import { scenarios } from './tests/render/scenarios';

export const runnerAddr = `http://${runner.hostname}:${runner.port}`

const styles = {
    'A': 'b2b8046f-9bb0-469a-9860-9847032935cc',
    'Online': 'eb10e2c3-3c28-4b81-b74b-859c9c4cf47e',
    'SDK': 'c080bb6a-8134-4993-93a1-5b4d8c36a59b',
    'Immersive': '8e055b04-e7b5-42a5-95e2-a0b5190a034e',
//    'Immersive': '9c73b6cf-5d37-44a2-9a3e-68737b72d9a4',
    'Immersive Light': 'ffaaf4c3-4b23-45c8-b816-4f719a3170a9'
}

const references = {
    'production': 'https://mapgl.2gis.com/api/js/v1',
    'staging': 'https://jakarta.web-staging.2gis.ru/index.js',
    'animation': '/visual-perf-tests/animation.js'
}

const graphicsPresets = ['light', 'normal', 'immersive'];

const params = {
    reference: 'https://jakarta.web-staging.2gis.ru/index.js',
    target: 'https://jakarta.web-staging.2gis.ru/index.js',
    iterations: 1,
    warmup: false,
    graphicsPreset: 'immersive',
    immersiveRoads: true,
    styleId: 'eb10e2c3-3c28-4b81-b74b-859c9c4cf47e'
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
                    immersiveRoadsOn: params.immersiveRoads,
                    graphicsPreset: params.graphicsPreset,
                },
                zoom: 16
            });
            const jmap = (map as any)._impl;
            log('Testing ' + (mapUrl || 'production'));
            test(jmap).then(resolve);
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

const ui = new dat.GUI({ width: 330 });
const resultsEl = document.querySelector<HTMLElement>('#results');

describe('Rendering', () => {
    for (let perfCase in scenarios) {
        it(perfCase, () => {
            performTest(params.reference, map => measureRender(map, perfCase as any, params.iterations, params.warmup))
                .then((results: any) => {
                    let name = params.reference;
                    for (const rname in references) {
                        if (references[rname] === params.reference) {
                            name = rname;
                        }
                    }
                    let styleName = params.styleId;
                    for (const sname in styles) {
                        if (styles[sname] === params.styleId) {
                            styleName = sname;
                        }
                    }
                    const output = [
                        `<b>${name} - ${styleName}</b>(iterations: ${params.iterations}${params.warmup ? ' + warmup' : ''})<br /><br />`
                    ];
                    for (const metric in results) {
                        output.push(`<b>${metric}</b>`);
                        const stats = results[metric];
                        if (typeof stats === 'number') {
                            output.push(': ' + stats + '<br />');
                            continue;
                        }
                        output.push('<table>');
                        output.push('<tr>');
                        for (const q in stats) {
                            output.push(`<td>${q}</td>`);
                        }
                        output.push('</tr>');
                        output.push('<tr>');
                        for (const q in stats) {
                            output.push(`<td>${stats[q]}</td>`);
                        }
                        output.push('</tr>');
                        output.push('</table>');
                    }
                    resultsEl.innerHTML = output.join('');
                    resultsEl.style.display = 'block';
                });
            ui.close();
        });
        // it(prefCase, () => performComparingTest(map => measureRender(map, prefCase as any)))
    }
});


ui.add(params, 'reference', references);
// ui.add(params, 'target');
ui.add(params, 'styleId', styles);
ui.add(params, 'graphicsPreset', graphicsPresets);
ui.add(params, 'immersiveRoads');
ui.add(params, 'iterations');
ui.add(params, 'warmup');

createUI(ui);