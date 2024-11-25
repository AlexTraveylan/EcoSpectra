import { Injectable } from '@nestjs/common';
import {
  AnalysisResult,
  GreenIt,
  Lighthouse,
  Project,
  Url,
} from './database/model';
import {
  AnalysisResultRepository,
  GreenItRepository,
  LighthouseRepository,
  ProjectRepository,
  UrlRepository,
} from './database/repository';

@Injectable()
export class AppService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly urlRepository: UrlRepository,
    private readonly analysisResultRepository: AnalysisResultRepository,
    private readonly lighthouseRepository: LighthouseRepository,
    private readonly greenItRepository: GreenItRepository,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectById(id: number): Promise<Project> {
    return this.projectRepository.findById(id);
  }

  async createProject(projectName: string): Promise<Project> {
    return this.projectRepository.create(projectName);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async getUrlsByProjectId(projectId: number): Promise<Url[]> {
    return this.urlRepository.findByProjectId(projectId);
  }

  async addUrlToProject(projectId: number, urlString: string): Promise<Url> {
    const project = await this.projectRepository.findById(projectId);
    return this.urlRepository.create(urlString, project);
  }

  async deleteUrl(id: number): Promise<void> {
    await this.urlRepository.delete(id);
  }

  async getAnalysisByUrlId(urlId: number): Promise<AnalysisResult[]> {
    return this.analysisResultRepository.findByUrlId(urlId);
  }

  async createAnalysis(
    urlId: number,
    lighthouseData: Partial<Lighthouse>,
    greenItData: Partial<GreenIt>,
  ): Promise<AnalysisResult> {
    const url = await this.urlRepository.findByProjectId(urlId);
    const analysisResult = await this.analysisResultRepository.create(url[0]);

    await Promise.all([
      this.lighthouseRepository.create(lighthouseData, analysisResult),
      this.greenItRepository.create(greenItData, analysisResult),
    ]);

    return analysisResult;
  }
}
