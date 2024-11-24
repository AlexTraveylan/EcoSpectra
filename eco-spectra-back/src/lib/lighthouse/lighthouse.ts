import lighthouse from 'lighthouse';
import { logInfo } from '../logger';
import { ChromeManager, using } from './chrome-manager';
import { config } from './config';
import { HtmlWriter } from './htmlWriter';

export async function analyzePage(url: string) {
  const chromeManager = new ChromeManager();
  return using(chromeManager, async (manager) => {
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

    const reportHtml = runnerResult.report;
    const scores = {
      performance: runnerResult.lhr.categories.performance.score * 100,
    };

    return {
      html: reportHtml,
      scores,
    };
  });
}

// const resultPromise = analyzePage('https://www.francetravail.fr');
const resultPromise = analyzePage('https://www.alextraveylan.fr/fr');

resultPromise.then((result) => {
  logInfo(result.scores.performance.toString());
  const htmlWriter = new HtmlWriter(result.html[1]);
  htmlWriter.saveReportToFile('https://www.alextraveylan.fr/fr');
});
