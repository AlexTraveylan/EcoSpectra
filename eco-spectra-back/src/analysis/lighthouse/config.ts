import { Flags } from 'lighthouse';

export const config: Flags = {
  logLevel: 'info',
  output: ['json', 'html'],
  locale: 'fr',
  formFactor: 'desktop',
  onlyCategories: ['performance'],
  screenEmulation: {
    mobile: false,
    width: 1920,
    height: 1080,
    disabled: false,
  },
  throttlingMethod: 'simulate',
  skipAudits: ['screenshot', 'full-page-screenshot'],
  extraHeaders: {
    'Cache-Control': 'no-cache',
  },
  disableStorageReset: false,
  emulatedUserAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
  throttling: {
    cpuSlowdownMultiplier: 1,
    downloadThroughputKbps: 10240,
    uploadThroughputKbps: 5120,
    rttMs: 40,
  },
  blockedUrlPatterns: ['*google-analytics.com', '*doubleclick.net'],
  maxWaitForLoad: 60000,
};

export const chromeFlags: string[] = [
  '--headless=new', // New, native Headless mode. (previously, --headless=chrome)
  '--no-sandbox', // Security issue, do not use in production, you can use it with docker
  '--disable-background-networking', // Disable various background network services, including extension updating,safe browsing service, upgrade detector, translate, UMA
  '--disable-background-timer-throttling', // Disable timers being throttled in background pages/tabs
  '--disable-backgrounding-occluded-windows', // Normally, Chrome will treat a 'foreground' tab instead as backgrounded if the surrounding window is occluded (aka visually covered) by another window. This flag disables that.
  '--disable-component-extensions-with-background-pages', // Disable some built-in extensions that aren't affected by --disable-extensions
  '--disable-extensions', // Disable all chrome extensions
  '--window-size=1920,1080', //  Sets the initial window size. Provided as string in the format "800,600".
  '--enable-automation', // Disable a few things considered not appropriate for automation. (Original design doc, though renamed here) codesearch. Note that some projects have chosen to avoid using this flag: web-platform-tests/wpt/#6348, crbug.com/1277272
  '--enable-features=NetworkService,NetworkServiceInProcess',
];
