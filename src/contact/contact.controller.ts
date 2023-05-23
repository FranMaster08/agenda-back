import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { ContactsService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactsService) {}

    @Post()
    create(@Body() createContactDto: CreateContactDto) {
        return this.contactService.createContact(createContactDto);
    }

    @Get('/email/:email')
    async getContactByEmail(@Param('email') email: string) {
        try {
            const contact = await this.contactService.getContactByEmail(email);
            return { data: contact };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { error: error.message };
            }
            throw error;
        }
    }

    @Get('/search')
    async searchContactsByPersonalData(
        @Query('searchTerm') searchTerm: string,
    ) {
        const contacts = await this.contactService.searchByPersonalData(
            searchTerm,
        );
        return contacts;
    }

    @Get('/phone/:phone')
    async getContactByPhone(@Param('phone') phone: string) {
        try {
            const contact = await this.contactService.searchByPhoneNumber(
                phone,
            );
            return { data: contact };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { error: error.message };
            }
            throw error;
        }
    }
}
