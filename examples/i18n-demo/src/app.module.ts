import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  i18nModuleForRootAsync,
} from '@aiofc/i18n';
import { Logger, loggerModuleForRootAsync } from '@aiofc/logger';
import { configModuleForRoot } from '@aiofc/config';
import rootConfig from './config/root.config';

@Module({
  imports: [
    loggerModuleForRootAsync(),
    configModuleForRoot(__dirname, rootConfig),
    i18nModuleForRootAsync(__dirname),
    // I18nModule.forRoot({
    //   fallbackLanguage: 'zh',
    //   loaders: [
    //     new I18nJsonLoader({
    //       path: join(__dirname, '/i18n/'),
    //     }),
    //   ],
    //   resolvers: [
    //     { use: QueryResolver, options: ['lang'] },
    //     AcceptLanguageResolver,
    //     new HeaderResolver(['x-lang']),
    //   ],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService,Logger],
})
export class AppModule {}
