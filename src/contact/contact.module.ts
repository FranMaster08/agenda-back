import { Module } from '@nestjs/common';
import { ContactsService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entites from './entities';
@Module({
    imports: [TypeOrmModule.forFeature(entites)],
    controllers: [ContactController],
    providers: [ContactsService],
})
export class ContactModule {}
