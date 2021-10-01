import { Map as JMap, TileCoords } from '@webmaps/jakarta';
import { keyedStats } from '../stats';
import { generateTile, getCoords, now } from '../utils';

export async function measureParser (map: JMap) {
    const ITERATIONS = 100;

    const results = {
        viewport: [],
        tile: []
    }
    const coords = getCoords(map);
    for (let i = 0; i < ITERATIONS; i++) {
        const start = now();
        await Promise.all(coords.map(coord => measureGenerateTile(map, coord, results.tile)));
        results.viewport.push(now() - start);
    }
    return keyedStats(results);
}

async function measureGenerateTile (map: JMap, coords: TileCoords, stats: number[]) {
    const start = now();
    await generateTile(map, coords);
    stats.push(now() - start);
}