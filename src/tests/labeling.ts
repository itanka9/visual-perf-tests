import { Map as JMap, TileCoords } from '@webmaps/jakarta';
import { labeling } from '@webmaps/jakarta/dist/es6/config';
import { createTileInfo } from '@webmaps/jakarta/dist/es6/utils/tiles';
import { LabelSource } from '@webmaps/jakarta/dist/es6/types/labeling';
import { keyedStats } from '../stats';
import { generateTile, getCoords, now } from '../utils';

const pause = ms => new Promise((resolve) => setTimeout(resolve, ms));

export async function measureLabeling (map: JMap) {
    const ITERATIONS = 100;
    let keyCounter = 0;
    const dataFromParser: {
        [key: string]: {
            metatileHash: number;
            labels: any[];
            styleId: number;
        };
    } = {};


    function collectData(data) {
        data.results.forEach(({ metatileHash, collectorOutput, styleId }) => {
            const { labels } = collectorOutput;
    
            dataFromParser[String(keyCounter++)] = { metatileHash, labels, styleId };
        });
    }

    const coords = getCoords(map);
    await Promise.all(coords.map(coord => generateTile(map, coord).then(collectData)));
    const results = {
        addLabels: [],
        processLabels: [],
        secondProcessLabels: [],
        removeLabels: []
    }
    for (let i = 0; i < ITERATIONS; i++) {
        const labellingResults = [];
        const labeler = (map.modules.labeler as any)

        let start = now();
        for (let key in dataFromParser) {
            const labels = dataFromParser[key];
            await labeler.worker.appendLabels(key, 0, [labels])
            labeler.activeLabelKeys.push(key);
        }
        results.addLabels.push(now() - start);

        await pause(100);

        start = now();
        for (const coord of coords) {
            const lr = await (map.modules.labeler as any).worker.processLabels(
                Object.keys(dataFromParser), // [...labelsKeys, ...this.activeLabelKeys],
                map.state, // labelingState,
                createTileInfo(coord), // createTileInfo(coords),
                1, // window.devicePixelRatio,// window.devicePixelRatio,
                [], // hiddenIds,
                labeling.commercialMargins, // config.labeling.commercialMargins,
                false, // this.skipHysteresisInNextLabeling,
            );
            labellingResults.push(lr);
        }
        results.processLabels.push(now() - start);


        start = now();
        for (const coord of coords) {
            const lr = await (map.modules.labeler as any).worker.processLabels(
                Object.keys(dataFromParser), // [...labelsKeys, ...this.activeLabelKeys],
                map.state, // labelingState,
                createTileInfo(coord), // createTileInfo(coords),
                1, // window.devicePixelRatio,// window.devicePixelRatio,
                [], // hiddenIds,
                labeling.commercialMargins, // config.labeling.commercialMargins,
                false, // this.skipHysteresisInNextLabeling,
            );
            labellingResults.push(lr);
        }
        results.secondProcessLabels.push(now() - start);

        start = now();
        for (let key in dataFromParser) {
            await labeler.worker.removeLabels(key);
            const index = labeler.activeLabelKeys.indexOf(key);
            if (index !== -1) {
                labeler.activeLabelKeys.splice(index, 1);
            }
            // map.state.needLabeling = true;
        }
        results.removeLabels.push(now() - start);
    }
    return keyedStats(results);
}

