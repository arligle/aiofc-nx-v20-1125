import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { BaseEntityService } from '@aiofc/service-base';
import { Article } from '../database/entities';
import { ClsService, ClsStore } from 'nestjs-cls';

@Injectable()
export class ArticleService extends BaseEntityService<
  Article,
  'id',
  ArticleRepository
> {
  constructor(
    repository: ArticleRepository,
    private readonly clsService: ClsService<ClsStore>
  ) {
    super(repository);
  }
  getData() {
    return this.repository.findAll();
  }
}
