import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../../app.module';
import { Apartment } from '../../models/apartment.model';
import { faker } from '@faker-js/faker';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sequelize = app.get(Sequelize);

  console.log('Seeding database...');

  await Apartment.bulkCreate(
    Array.from({ length: 50 }, () => ({
      unitName: faker.person.firstName(),
      unitNumber: faker.number.int({ min: 1, max: 100 }).toString(),
      project: faker.location.city(),
      description: faker.lorem.paragraph(),
      sizeSQM: faker.number.int({ min: 30, max: 200 }),
      price: faker.number.float({ min: 50000, max: 500000, fractionDigits: 2 }),
      bedrooms: faker.number.int({ min: 1, max: 5 }),
      bathrooms: faker.number.int({ min: 1, max: 4 }),
    })),
  );

  console.log('Seeding completed!');
  await app.close();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
