import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { Apartment } from '../../models';
import { CreateApartmentDto } from './dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<{ apartments: Apartment[]; totalApartments: number }> {
    try {
      return await this.apartmentsService.findAll(search, page, limit);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Apartment> {
    try {
      const apartment = await this.apartmentsService.findOne(id);
      if (!apartment) throw new NotFoundException('Apartment not found');
      return apartment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() apartmentDto: CreateApartmentDto): Promise<Apartment> {
    try {
      return await this.apartmentsService.create(apartmentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
