import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../../app.module';
import { Apartment, Project } from '../../models';
import { faker } from '@faker-js/faker';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sequelize = app.get(Sequelize);

  console.log('Seeding database...');

  const existingProjects = await Project.findAll();
  let projects = existingProjects;

  if (existingProjects.length === 0) {
    console.log('Creating 10 projects...');
    projects = await Project.bulkCreate(
      Array.from({ length: 10 }, () => ({
        projectName: faker.company.name(),
        address: faker.location.streetAddress(),
      })),
    );
  }

  const projectIds = projects.map((p) => p.id);

  console.log('Creating 50 apartments...');
  await Apartment.bulkCreate(
    Array.from({ length: 50 }, () => ({
      unitName: faker.person.firstName(),
      unitNumber: faker.number.int({ min: 1, max: 100 }).toString(),
      projectId: faker.helpers.arrayElement(projectIds),
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
