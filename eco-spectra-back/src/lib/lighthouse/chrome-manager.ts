import { launch, LaunchedChrome } from 'chrome-launcher';
import { chromeFlags } from './config';

export interface Disposable {
  dispose(): Promise<void>;
}

export async function using<T extends Disposable, R>(
  resource: T,
  fn: (resource: T) => Promise<R>,
): Promise<R> {
  try {
    return await fn(resource);
  } finally {
    await resource.dispose();
  }
}

export class ChromeManager implements Disposable {
  private chrome: LaunchedChrome | null = null;

  async init() {
    this.chrome = await launch({
      chromeFlags: chromeFlags,
    });
    return this.chrome;
  }

  async cleanup() {
    if (this.chrome) {
      this.chrome.kill();
      this.chrome = null;
    }
  }

  getPort(): number {
    if (!this.chrome) {
      throw new Error('Chrome nest pas initialisé');
    }
    return this.chrome.port;
  }

  async dispose() {
    await this.cleanup();
  }
}
