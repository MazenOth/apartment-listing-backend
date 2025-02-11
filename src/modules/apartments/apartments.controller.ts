import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { Apartment } from '../../models/apartment.model';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  async findAll(@Query('search') search?: string): Promise<Apartment[]> {
    try {
      return await this.apartmentsService.findAll(search);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Apartment> {
    try {
      const apartment = await this.apartmentsService.findOne(+id);
      if (!apartment) throw new NotFoundException('Apartment not found');
      return apartment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async create(@Body() apartment: Partial<Apartment>): Promise<Apartment> {
    try {
      return await this.apartmentsService.create(apartment);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
