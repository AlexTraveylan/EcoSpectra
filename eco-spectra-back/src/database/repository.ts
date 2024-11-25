import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisResult, GreenIt, Lighthouse, Project, Url } from './model';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.repository.find({
      relations: ['urls'],
    });
  }

  async findById(id: number): Promise<Project> {
    return this.repository.findOne({
      where: { id },
      relations: ['urls'],
    });
  }

  async create(projectName: string): Promise<Project> {
    const project = this.repository.create({ projectName });
    return this.repository.save(project);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

@Injectable()
export class UrlRepository {
  constructor(
    @InjectRepository(Url)
    private readonly repository: Repository<Url>,
  ) {}

  async findByProjectId(projectId: number): Promise<Url[]> {
    return this.repository.find({
      where: { project: { id: projectId } },
      relations: ['analysisResults'],
    });
  }

  async create(url: string, project: Project): Promise<Url> {
    const urlEntity = this.repository.create({ url, project });
    return this.repository.save(urlEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

@Injectable()
export class AnalysisResultRepository {
  constructor(
    @InjectRepository(AnalysisResult)
    private readonly repository: Repository<AnalysisResult>,
  ) {}

  async findByUrlId(urlId: number): Promise<AnalysisResult[]> {
    return this.repository.find({
      where: { url: { id: urlId } },
      relations: ['lighthouse', 'greenIt'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(url: Url): Promise<AnalysisResult> {
    const analysisResult = this.repository.create({ url });
    return this.repository.save(analysisResult);
  }
}

@Injectable()
export class LighthouseRepository {
  constructor(
    @InjectRepository(Lighthouse)
    private readonly repository: Repository<Lighthouse>,
  ) {}

  async create(
    data: Partial<Lighthouse>,
    analysisResult: AnalysisResult,
  ): Promise<Lighthouse> {
    const lighthouse = this.repository.create({
      ...data,
      analysisResult,
    });
    return this.repository.save(lighthouse);
  }
}

@Injectable()
export class GreenItRepository {
  constructor(
    @InjectRepository(GreenIt)
    private readonly repository: Repository<GreenIt>,
  ) {}

  async create(
    data: Partial<GreenIt>,
    analysisResult: AnalysisResult,
  ): Promise<GreenIt> {
    const greenIt = this.repository.create({
      ...data,
      analysisResult,
    });
    return this.repository.save(greenIt);
  }
}
