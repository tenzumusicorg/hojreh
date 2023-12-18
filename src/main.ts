import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import ValidationExceptions from './infrastructure/middleware/exceptions/validation.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationExceptions(errors),
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Hojreh Backend API')
    .setDescription('Api v2')
    .setVersion('2.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(3000);
}
bootstrap();
