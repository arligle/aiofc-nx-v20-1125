import { DataSource } from 'typeorm';
import { InjectDataSource } from '@aiofc/nestjs-typeorm';
import { Doc } from '../database/entities';
import { BaseTypeormTrackedEntityRepository } from '@aiofc/typeorm';
export class DocRepository extends BaseTypeormTrackedEntityRepository<
  Doc,
  'id',
  any
> {
  constructor(
    @InjectDataSource()
    ds: DataSource
  ) {
    super(Doc, ds, 'id');
  }
}
