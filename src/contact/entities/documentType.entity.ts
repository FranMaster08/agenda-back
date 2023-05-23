import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contacts } from './contacts.entity';

@Entity('document_type', { schema: 'agenda' })
export class DocumentType {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', length: 20 })
    name: string;

    @OneToMany(() => Contacts, (contacts) => contacts.documentType)
    contacts: Contacts[];
}
