import { Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { Article } from '../database/entities';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Post('create1')
  createArticle() {
    return this.articleService.createArticle();
  }

  @Post('create')
  create() {
    const article = new Article();
    article.title = '《现代计算机架构》';
    article.author = '约翰·冯·诺伊曼';
    article.summary =
      '《博弈论》是一部由约翰·冯·诺伊曼和奥斯卡·摩根斯特恩合著的关于博弈论的经典著作。';
    article.isActive = true;
    return this.articleService.create(article);
  }
}
