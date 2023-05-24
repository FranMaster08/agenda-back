import { Controller, Get, Post, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { ContactsService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({ status: 201, description: 'Contact created successfully' })
  async create(@Body() createContactDto: CreateContactDto) {
    const contact = await this.contactService.createContact(createContactDto);
    return { data: contact };
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get contact by email' })
  @ApiParam({ name: 'email', description: 'Email address of the contact' })
  @ApiResponse({ status: 200, description: 'Contact found', type: CreateContactDto })
  @ApiResponse({ status: 404, description: 'Contact not found' })
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
  @ApiOperation({ summary: 'Search contacts by personal data' })
  @ApiQuery({ name: 'searchTerm', description: 'Search term to match against first name, last name, or document number' })
  @ApiResponse({ status: 200, description: 'Contacts found', type: [CreateContactDto] })
  async searchContactsByPersonalData(@Query('searchTerm') searchTerm: string) {
    const contacts = await this.contactService.searchByPersonalData(searchTerm);
    return contacts;
  }

  @Get('/phone/:phone')
  @ApiOperation({ summary: 'Get contact by phone number' })
  @ApiParam({ name: 'phone', description: 'Phone number of the contact' })
  @ApiResponse({ status: 200, description: 'Contact found', type: CreateContactDto })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async getContactByPhone(@Param('phone') phone: string) {
    try {
      const contact = await this.contactService.searchByPhoneNumber(phone);
      return { data: contact };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Get('/address/:address')
  @ApiOperation({ summary: 'Get contact by address' })
  @ApiParam({ name: 'address', description: 'Address of the contact' })
  @ApiResponse({ status: 200, description: 'Contact found', type: CreateContactDto })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async getContactByAddress(@Param('address') address: string) {
    try {
      const contact = await this.contactService.searchByAddress(address);
      return { data: contact };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Post('/edit/:contactId')
  @ApiOperation({ summary: 'Edit contact' })
  @ApiParam({ name: 'contactId', description: 'ID of the contact' })
  @ApiResponse({ status: 200, description: 'Contact edited successfully', type: CreateContactDto })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async editContact(
    @Param('contactId') contactId: string,
    @Body() updatedContactDto: CreateContactDto,
  ) {
    try {
      const contact = await this.contactService.editContact(contactId, updatedContactDto);
      return { data: contact };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error;
    }
  }

  @Post('/delete/:contactId')
  @ApiOperation({ summary: 'Delete contact' })
  @ApiParam({ name: 'contactId', description: 'ID of the contact' })
  @ApiResponse({ status: 200, description: 'Contact deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async deleteContact(@Param('contactId') contactId: string) {
    try {
      await this.contactService.deleteContact(contactId);
      return { message: 'Contact deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error;
    }
  }
}
