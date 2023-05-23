import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDatasource } from './config/ormconfig-migrations';
@Module({
    imports: [
        ContactModule,
        ConfigModule.forRoot({
            envFilePath: ['.env'],
        }),
        TypeOrmModule.forRoot(configDatasource),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
