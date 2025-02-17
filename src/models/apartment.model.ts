import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Project } from './project.model';

@Table
export class Apartment extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  unitName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  unitNumber: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sizeSQM: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bedrooms: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bathrooms: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;
}
