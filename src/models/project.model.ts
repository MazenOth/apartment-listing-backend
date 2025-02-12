import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Apartment } from './apartment.model';

@Table
export class Project extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  projectName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @HasMany(() => Apartment)
  apartments: Apartment[];
}
