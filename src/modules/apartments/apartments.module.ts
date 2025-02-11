import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apartment } from '../../models/apartment.model';

@Module({
  imports: [SequelizeModule.forFeature([Apartment])],
})
export class ApartmentsModule {}
