import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Apartment, Project } from './models';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Apartment, Project],
      autoLoadModels: true,
      synchronize: true,
    }),
    ApartmentsModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
