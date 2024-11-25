import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GreenIt, Lighthouse } from './database/model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Projects endpoints
  @Get('projects')
  async getAllProjects() {
    try {
      return await this.appService.getAllProjects();
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des projets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('projects/:id')
  async getProjectById(@Param('id') id: number) {
    try {
      return await this.appService.getProjectById(id);
    } catch (error) {
      throw new HttpException('Projet non trouvé', HttpStatus.NOT_FOUND);
    }
  }

  @Post('projects')
  async createProject(@Body('projectName') projectName: string) {
    try {
      return await this.appService.createProject(projectName);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la création du projet',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('projects/:id')
  async deleteProject(@Param('id') id: number) {
    try {
      await this.appService.deleteProject(id);
      return { message: 'Projet supprimé avec succès' };
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la suppression du projet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // URLs endpoints
  @Get('projects/:projectId/urls')
  async getUrlsByProjectId(@Param('projectId') projectId: number) {
    try {
      return await this.appService.getUrlsByProjectId(projectId);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des URLs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('projects/:projectId/urls')
  async addUrlToProject(
    @Param('projectId') projectId: number,
    @Body('url') url: string,
  ) {
    try {
      return await this.appService.addUrlToProject(projectId, url);
    } catch (error) {
      throw new HttpException(
        "Erreur lors de l'ajout de l'URL",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('urls/:id')
  async deleteUrl(@Param('id') id: number) {
    try {
      await this.appService.deleteUrl(id);
      return { message: 'URL supprimée avec succès' };
    } catch (error) {
      throw new HttpException(
        "Erreur lors de la suppression de l'URL",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Analysis endpoints
  @Get('urls/:urlId/analysis')
  async getAnalysisByUrlId(@Param('urlId') urlId: number) {
    try {
      return await this.appService.getAnalysisByUrlId(urlId);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des analyses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('urls/:urlId/analysis')
  async createAnalysis(
    @Param('urlId') urlId: number,
    @Body('lighthouse') lighthouseData: Partial<Lighthouse>,
    @Body('greenIt') greenItData: Partial<GreenIt>,
  ) {
    try {
      return await this.appService.createAnalysis(
        urlId,
        lighthouseData,
        greenItData,
      );
    } catch (error) {
      throw new HttpException(
        "Erreur lors de la création de l'analyse",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
