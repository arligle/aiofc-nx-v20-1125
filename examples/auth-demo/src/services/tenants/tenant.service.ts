import { Injectable, Logger } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { Tenant, UserProfile } from '../../database/entities';
import { ConflictEntityCreationException } from '@aiofc/exceptions';
import { TenantStatus } from '../../database/entities/tenants/vo/tenant-status.enum';
import { BaseEntityService } from '@aiofc/service-base';
import { TenantsRepository } from '../../repositories/tenants/tenants.repository';

@Injectable()
export class TenantService extends BaseEntityService<
  Tenant,
  'id',
  TenantsRepository
> {
  private readonly logger = new Logger(TenantService.name);

  constructor(repository: TenantsRepository) {
    super(repository);
  }

  @Transactional()
  async setupTenant(
    tenantName: string, // 租户的名称
    tenantFriendlyIdentifier: string, // 同租户的友好标识符
    owner: UserProfile, // 租户的所有者
  ) {
    const numberOfTenantsByIdentifier = await this.repository.count({
      tenantFriendlyIdentifier,
    });

    if (numberOfTenantsByIdentifier > 0) {
      throw new ConflictEntityCreationException(
        'Tenant',
        'tenantFriendlyIdentifier',
        tenantFriendlyIdentifier,
      );
    }

    const tenant = await this.repository.create({
      tenantName,
      tenantFriendlyIdentifier,
      tenantStatus: TenantStatus.ACTIVE,
      owner,
      ownerId: owner.id,
      version: 1,
    });

    this.logger.log(`Tenant ${tenantName} created with id ${tenant.id}`);

    return tenant;
  }
}
