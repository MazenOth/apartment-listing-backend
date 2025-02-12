import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { Apartment, Project } from '../../models';

@Module({
  imports: [SequelizeModule.forFeature([Apartment, Project])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
})
export class ApartmentsModule {}
