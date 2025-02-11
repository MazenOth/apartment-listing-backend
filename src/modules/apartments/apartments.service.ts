import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Apartment } from '../../models/apartment.model';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment)
    private apartmentModel: typeof Apartment,
  ) {}

  async findAll(search?: string): Promise<Apartment[]> {
    try {
      if (search) {
        return this.apartmentModel.findAll({
          where: {
            [Op.or]: [
              { unitName: { [Op.like]: `%${search}%` } },
              { unitNumber: { [Op.like]: `%${search}%` } },
              { project: { [Op.like]: `%${search}%` } },
            ],
          },
        });
      }
      return this.apartmentModel.findAll();
    } catch (error) {
      throw new Error('Error fetching apartments');
    }
  }

  async findOne(id: number): Promise<Apartment | null> {
    try {
      const apartment = await this.apartmentModel.findByPk(id);
      if (!apartment) throw new Error('Apartment not found');
      return apartment;
    } catch (error) {
      throw new Error('Error fetching apartment details');
    }
  }

  async create(data: Partial<Apartment>): Promise<Apartment> {
    try {
      return this.apartmentModel.create(data);
    } catch (error) {
      throw new Error('Error creating apartment');
    }
  }
}
