// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import {
//   I18nValidationExceptionFilter,
//   I18nValidationPipe,
// } from '@aiofc/i18n';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new I18nValidationPipe());

//   app.useGlobalFilters(
//     new I18nValidationExceptionFilter({
//       detailedErrors: false,
//     }),
//   );

//   await app.listen(3000);
// }
// bootstrap();
import { fastifyBootstrap } from "@aiofc/fastify-server";
import { AppModule } from "./app.module";

fastifyBootstrap(AppModule);