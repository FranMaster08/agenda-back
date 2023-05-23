import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurar opciones del documento Swagger
    const config = new DocumentBuilder()
        .setTitle('Agenda BackEnd API')
        .setDescription(
            'The Agenda API provides functionality to manage contacts, addresses, and phone numbers in an address book. It allows performing CRUD (Create, Read, Update, Delete) operations on the different entities.',
        )
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    const configservice = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(configservice.get('PORT'), () => {
        Logger.log(
            'Service listening on port : ' + configservice.get('PORT'),
            bootstrap.name,
        );
    });
}
bootstrap();
