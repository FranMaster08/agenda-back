import { IAddress } from './Iadresses';
import { IPhone } from './Iphone';

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    documentTypeId: number;
    documentNumber: string;
    birthDate: string;
    email: string;
    addresses: IAddress[];
    documentType: DocumentType;
    phones: IPhone[];
}
