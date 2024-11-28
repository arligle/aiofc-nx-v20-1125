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

  async createArticle() {
    // return this.findAll();
    const article = new Article();
    article.title = '《博弈论》';
    article.author = '约翰·冯·诺伊曼';
    article.summary =
      '《博弈论》是一部由约翰·冯·诺伊曼和奥斯卡·摩根斯特恩合著的关于博弈论的经典著作。';
    article.isActive = true;
    return this.create(article);
  }

  // async findAll() {
  //   return this.findAll();
  // }
}
