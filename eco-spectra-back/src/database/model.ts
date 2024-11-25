import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @OneToMany(() => Url, (url) => url.project, {
    onDelete: 'CASCADE',
  })
  urls: Url[];
}

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Project, (project) => project.urls)
  project: Project;

  @OneToMany(() => AnalysisResult, (analysisResult) => analysisResult.url, {
    onDelete: 'CASCADE',
  })
  analysisResults: AnalysisResult[];
}

@Entity()
export class AnalysisResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Url, (url) => url.analysisResults)
  url: Url;

  @OneToOne(() => Lighthouse, (lighthouse) => lighthouse.analysisResult)
  lighthouse: Lighthouse;

  @OneToOne(() => GreenIt, (greenIt) => greenIt.analysisResult)
  greenIt: GreenIt;
}

@Entity()
export class Lighthouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('longtext')
  html: string;

  @Column('float')
  performanceScore: number;

  @Column('float')
  firstContentfulPaint: number;

  @Column('float')
  largestContentfulPaint: number;

  @Column('float')
  totalBlockingTime: number;

  @Column('float')
  cumulativeLayoutShift: number;

  @Column('float')
  speedIndex: number;

  @ManyToOne(
    () => AnalysisResult,
    (analysisResult) => analysisResult.lighthouse,
  )
  analysisResult: AnalysisResult;
}

@Entity()
export class GreenIt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('int')
  ecoIndex: number;

  @Column('int')
  dom: number;

  @Column('float')
  size: number;

  @Column('int')
  nbRequests: number;

  @ManyToOne(() => AnalysisResult, (analysisResult) => analysisResult.greenIt)
  analysisResult: AnalysisResult;
}
