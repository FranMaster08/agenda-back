import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Addresses } from './addresses.entity';
import { DocumentType } from './documentType.entity';
import { Phones } from './phones.entity';

@Index('unique_document', ['documentTypeId', 'documentNumber'], {
    unique: true,
})
@Index('unique_email', ['email'], { unique: true })
@Index('idx_email', ['email'], {})
@Index('idx_first_name_last_name', ['firstName', 'lastName'], {})
@Index('idx_document_number', ['documentNumber'], {})
@Entity('contacts', { schema: 'agenda' })
export class Contacts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { name: 'first_name', length: 50 })
    firstName: string;

    @Column('varchar', { name: 'last_name', length: 50 })
    lastName: string;

    @Column('int', { name: 'document_type_id' })
    documentTypeId: number;

    @Column('varchar', { name: 'document_number', length: 20 })
    documentNumber: string;

    @Column('date', { name: 'birth_date' })
    birthDate: string;

    @Column('varchar', { name: 'email', unique: true, length: 100 })
    email: string;

    @OneToMany(() => Addresses, (addresses) => addresses.contact)
    addresses: Addresses[];

    @ManyToOne(() => DocumentType, (documentType) => documentType.contacts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
    documentType: DocumentType;

    @OneToMany(() => Phones, (phones) => phones.contact)
    phones: Phones[];
}
