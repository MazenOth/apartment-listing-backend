import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '../../models';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    try {
      return await this.projectsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async create(@Body() project: Partial<Project>): Promise<Project> {
    try {
      return await this.projectsService.create(project);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
