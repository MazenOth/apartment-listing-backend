import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Apartment, Project } from '../../models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment)
    private apartmentModel: typeof Apartment,
  ) {}

  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ apartments: Apartment[]; totalApartments: number }> {
    try {
      const offset = (page - 1) * limit;

      const whereClause = search
        ? {
            [Op.or]: [
              { unitName: { [Op.like]: `%${search}%` } },
              { unitNumber: { [Op.like]: `%${search}%` } },
              { '$project.projectName$': { [Op.like]: `%${search}%` } },
            ],
          }
        : {};

      const { rows: apartments, count: totalApartments } =
        await this.apartmentModel.findAndCountAll({
          where: whereClause,
          limit,
          offset,
          attributes: [
            'id',
            'unitName',
            'unitNumber',
            'description',
            'sizeSQM',
            'price',
            'bedrooms',
            'bathrooms',
            [Sequelize.col('Projects.projectName'), 'projectName'],
          ],
          include: [
            {
              model: Project,
              as: 'Projects',
              attributes: [],
            },
          ],
          order: [['createdAt', 'DESC']],
        });

      return { apartments, totalApartments };
    } catch (error) {
      throw new Error(`Error fetching apartments: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Apartment | null> {
    try {
      const apartment = await this.apartmentModel.findByPk(id, {
        attributes: [
          'id',
          'unitName',
          'unitNumber',
          'description',
          'sizeSQM',
          'price',
          'bedrooms',
          'bathrooms',
          [Sequelize.col('Projects.projectName'), 'projectName'],
        ],
        include: [
          {
            model: Project,
            as: 'Projects',
            attributes: [],
          },
        ],
      });
      if (!apartment) throw new Error('Apartment not found');
      return apartment;
    } catch (error) {
      throw new Error(`Error fetching apartment details: ${error.message}`);
    }
  }

  async create(data: Partial<Apartment>): Promise<Apartment> {
    try {
      return this.apartmentModel.create(data);
    } catch (error) {
      throw new Error(`Error creating apartment: ${error.message}`);
    }
  }
}
