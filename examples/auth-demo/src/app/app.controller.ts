import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { ArticleRepository } from '../repositories/article.repository';

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
