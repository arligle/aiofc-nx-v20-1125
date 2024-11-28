import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tenant } from '../../database/entities';
import { InjectDataSource } from '@aiofc/nestjs-typeorm';
import { BaseTypeormTenantedEntityRepository as BaseRepository } from '@aiofc/typeorm';
import { ClsService } from 'nestjs-cls';
import { TenantClsStore } from '@aiofc/persistence-base';

@Injectable()
export class TenantsRepository extends BaseRepository<Tenant, 'id'> {
  constructor(
    @InjectDataSource()
    readonly ds: DataSource,
    clsService: ClsService<TenantClsStore>
  ) {
    super(Tenant, ds, 'id', clsService);
  }
}
