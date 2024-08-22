import { runScenario, scenarios } from './scenarios';
import { keyedStats, stats } from '../../stats';

type JMap = any;

const BAD_FPS_THRESHOLD = 20;

export async function measureRender (map: JMap, scenario: keyof typeof scenarios, iterations: number, warmup: boolean) {
    const ITERATIONS = iterations + (warmup ? 1 : 0);
    const results: any = {
        tiles: [],
        draws: [],
        vertices: [],
        fps: [],
        badfps: [],
        models: []
    }
    const oldCollectStats = map.state.collectStats;
    let frameStart = NaN;
    map.on('framestart', () => {
        frameStart = performance.now();
    })
    map.on('frameend', () => {
        const stats = map.state.stats as any;
        const fps = 1000 / (performance.now() - frameStart);
        if (fps <= BAD_FPS_THRESHOLD) {
            results.badfps.push(fps)
        }
        if (stats.drawCount > 0) {
            results.fps.push(fps);
        }
        results.draws.push(stats.drawCount);
        results.tiles.push(stats.tileCount);
        results.vertices.push(stats.vertexCount / 10**6);
        results.models.push(Object.keys(map.modules.assetManager.models).length);
    })
    for (let i = 0; i < ITERATIONS; i++) {
        if (!warmup || i > 0) {
            map.state.collectStats = true;
        }
        await runScenario(map, scenario)
    }
    map.state.collectStats = oldCollectStats;
    return {
        fps: stats(results.fps, [.01, .05, .1, .25, .5, .75]),
        badfps: stats(results.badfps, [.01, .05, .1, .25, .5, .75]),
        gliches: results.badfps.length,
        draws: stats(results.draws),
        tiles: stats(results.tiles),
        vertices: stats(results.vertices),
        models: stats(results.models)
    };
}
