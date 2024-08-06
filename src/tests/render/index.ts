import { Map as JMap } from '@webmaps/jakarta';
import { runTest, cases } from './scenarios';
import { keyedStats } from '../../stats';

export async function measureRender (map: JMap, scenario: keyof typeof cases) {
    const ITERATIONS = 3;
    const results = {
        tileCount: [],
        dynamicTileCount: [],
        drawCount: [],
        vertexCount: [],
        fps: [],
    }
    const oldCollectStats = map.state.collectStats;
    let frameStart = NaN;
    map.on('framestart', () => {
        frameStart = performance.now();
    })
    map.on('frameend', () => {
        const stats = map.state.stats;
        results.fps.push(Math.min(200, 1000 / (performance.now() - frameStart)));
        results.drawCount.push(stats.drawCount);
        results.dynamicTileCount.push(stats.dynamicTileCount);
        results.tileCount.push(stats.tileCount);
        results.vertexCount.push(stats.vertexCount);
        console.log(`tilesCount: ${stats.tileCount}, vertexCount: ${(stats.vertexCount / 10**6).toFixed(2)}M, drawCount: ${stats.drawCount}, tileObjects: ${map.modules.tileManager.getTileObjects().length}, models: ${Object.keys(map.modules.assetManager.models).length}`);    
    })
    for (let i = 0; i < ITERATIONS; i++) {
        map.state.collectStats = true;
        // if (i > 0) {
        //     map.state.collectStats = true;
        // }
        await runTest(scenario, map)
    }
    map.state.collectStats = oldCollectStats;
    return keyedStats(results);
}
