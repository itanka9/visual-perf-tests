import { runScenario, scenarios } from './scenarios';
import { keyedStats } from '../../stats';

type JMap = any;

export async function measureRender (map: JMap, scenario: keyof typeof scenarios) {
    const ITERATIONS = 3;
    const results: any = {
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
        const stats = map.state.stats as any;
        results.fps.push(Math.min(200, 1000 / (performance.now() - frameStart)));
        results.drawCount.push(stats.drawCount);
        results.dynamicTileCount.push(stats.dynamicTileCount);
        results.tileCount.push(stats.tileCount);
        results.vertexCount.push(stats.vertexCount);
    })
    for (let i = 0; i < ITERATIONS; i++) {
        map.state.collectStats = true;
        await runScenario(map, scenario)
    }
    map.state.collectStats = oldCollectStats;
    return keyedStats(results);
}
