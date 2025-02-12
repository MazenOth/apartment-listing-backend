import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../../models';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private projectModel: typeof Project,
  ) {}

  async findAll(): Promise<Project[]> {
    try {
      return await this.projectModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  async create(data: Partial<Project>): Promise<Project> {
    try {
      return await this.projectModel.create(data);
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }
}
