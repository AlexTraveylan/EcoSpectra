import lighthouse from 'lighthouse';
import { ChromeManager, using } from './chrome-manager';
import { config } from './config';
import { LightHouseResult } from './schema';

export async function analyzePage(url: string): Promise<LightHouseResult> {
  return using(new ChromeManager(), async (manager) => {
    await manager.init();
    await new Promise((resolve) => setTimeout(resolve, 15000));

    const runnerResult = await lighthouse(url, {
      ...config,
      port: manager.getPort(),
    });

    if (!runnerResult || !runnerResult.lhr) {
      throw new Error(
        "L'analyse Lighthouse n'a pas produit de résultats valides",
      );
    }

    const result: LightHouseResult = {
      json: runnerResult.report[0],
      html: runnerResult.report[1],
      performanceScore: runnerResult.lhr.categories.performance.score * 100,
      firstContentfulPaint:
        runnerResult.lhr.audits['first-contentful-paint'].numericValue,
      largestContentfulPaint:
        runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
      totalBlockingTime:
        runnerResult.lhr.audits['total-blocking-time'].numericValue,
      cumulativeLayoutShift:
        runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
      speedIndex: runnerResult.lhr.audits['speed-index'].numericValue,
    };

    return result;
  });
}
