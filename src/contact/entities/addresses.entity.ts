import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Contacts } from './contacts.entity';

@Index('fk_contact_adress', ['contactId'], {})
@Entity('addresses', { schema: 'agenda' })
export class Addresses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('char', { name: 'contact_id', length: 36 })
    contactId: string;

    @Column('varchar', { name: 'address', length: 100 })
    address: string;

    @Column('varchar', { name: 'city', length: 50 })
    city: string;

    @ManyToOne(() => Contacts, (contacts) => contacts.addresses, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'contact_id', referencedColumnName: 'id' }])
    contact: Contacts;
}
