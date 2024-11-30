import { Controller, Get } from '@nestjs/common';
import { ArticleRepository } from '../repositories/articles/article.repository';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(

    // private readonly appService: AppService,
    private readonly articleRepository: ArticleRepository,
  ) {}

  @Get()
  getData() {
    const res = this.articleRepository.findAll();

    return res;

    // return this.appService.getData();
  }
}
