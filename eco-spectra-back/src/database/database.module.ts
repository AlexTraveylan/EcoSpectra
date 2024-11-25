import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisResult, GreenIt, Lighthouse, Project, Url } from './model';
import {
  AnalysisResultRepository,
  GreenItRepository,
  LighthouseRepository,
  ProjectRepository,
  UrlRepository,
} from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Url,
      AnalysisResult,
      Lighthouse,
      GreenIt,
    ]),
  ],
  providers: [
    ProjectRepository,
    UrlRepository,
    AnalysisResultRepository,
    LighthouseRepository,
    GreenItRepository,
  ],
  exports: [
    ProjectRepository,
    UrlRepository,
    AnalysisResultRepository,
    LighthouseRepository,
    GreenItRepository,
  ],
})
export class DatabaseModule {}
