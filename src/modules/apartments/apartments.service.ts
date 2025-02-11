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

}
