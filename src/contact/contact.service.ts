import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Contacts } from './entities/contacts.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { Phones } from './entities/phones.entity';
import { Addresses } from './entities/addresses.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contacts)
        private readonly contactRepository: Repository<Contacts>,
        @InjectRepository(Phones)
        private readonly phoneRepository: Repository<Phones>,
        @InjectRepository(Addresses)
        private readonly addressesRepository: Repository<Addresses>,
    ) {}

    async createContact(createContactDto: CreateContactDto): Promise<Contacts> {
        const { addresses, phones, ...contactData } = createContactDto;

        const contact = this.contactRepository.create({
            id: uuidv4(),
            addresses: [],
            phones: [],
            birthDate: contactData.birthDate,
            documentNumber: contactData.documentNumber,
            documentTypeId: createContactDto.documentType,
            email: createContactDto.email,
            firstName: createContactDto.firstName,
            lastName: createContactDto.lastName,
        });

        contact.addresses = await Promise.all(
            addresses.map((addressDto) => {
                return this.addressesRepository.create({
                    address: addressDto.address,
                    city: addressDto.city,
                    contactId: contact.id,
                });
            }),
        );

        contact.phones = await Promise.all(
            phones.map((phoneDto) => {
                return this.phoneRepository.create({
                    phoneNumber: phoneDto.phoneNumber,
                    phoneType: phoneDto.phoneType,
                    contactId: contact.id,
                });
            }),
        );

        const contactCreated = await this.contactRepository.save(contact);
        await Promise.all([
            Promise.all(
                contactCreated.addresses.map((item) =>
                    this.addressesRepository.save(item),
                ),
            ),
            Promise.all(
                contactCreated.phones.map((item) =>
                    this.phoneRepository.save(item),
                ),
            ),
        ]);
        return contactCreated;
    }

    async getContactByEmail(email: string): Promise<Contacts> {
        const contact = await this.contactRepository.findOne({
            where: {
                email: email,
            },
            relations: ['addresses', 'phones', 'documentType'],
        });
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }

    async searchByPersonalData(searchTerm: string) {
        const contacts = await this.contactRepository.find({
            where: [
                { firstName: Like(`%${searchTerm}%`) },
                { lastName: Like(`%${searchTerm}%`) },
                { documentNumber: Like(`%${searchTerm}%`) },
            ],
            relations: ['addresses', 'phones', 'documentType'],
        });

        return contacts;
    }
    async searchByPhoneNumber(phoneNumber: string): Promise<Contacts[]> {
        const contacts = await this.contactRepository
            .createQueryBuilder('contact')
            .leftJoinAndSelect('contact.phones', 'phone')
            .where('phone.phoneNumber = :phoneNumber', { phoneNumber })
            .getMany();

        return contacts;
    }
}
