// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
// import { join } from 'path';
// import Handlebars from 'handlebars';

// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);

//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule,
//     new FastifyAdapter(),
//   );

//   app.useStaticAssets({
//     root: join(__dirname, '..', 'public'),
//     prefix: '/public/',
//   });

//   app.setViewEngine({
//     engine: {
//       handlebars: require('handlebars'),
//     },
//     templates: join(__dirname, '..', 'src/attendance/views'),
//   });

//   Handlebars.registerHelper('loud', function (aString) {
//     return aString.toUpperCase()
//   })

//   app.enableCors();
//   await app.listen(8080);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/attendance/views'));
  app.setViewEngine('hbs');
  app.enableCors();
  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
