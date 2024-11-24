import fs from 'fs';
import path from 'path';
import { settings } from '../settings';

export class HtmlWriter {
  constructor(private readonly html: string) {
    this.html = html;
  }

  async saveReportToFile(url: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedUrl = url.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `lighthouse-report-${sanitizedUrl}-${timestamp}.html`;
    const filePath = path.join(settings.workspace, fileName);

    try {
      await fs.promises.writeFile(filePath, this.html);
      console.log(`Rapport sauvegardé dans: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error);
      throw error;
    }
  }
}
