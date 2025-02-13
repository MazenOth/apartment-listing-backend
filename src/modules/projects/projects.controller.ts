import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '../../models';
import { CreateProjectDto } from './dto';

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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() project: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectsService.create(project);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
