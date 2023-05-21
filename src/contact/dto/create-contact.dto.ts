import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDateString,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';

enum DocumentType {
  ID_CARD = 'id_card',
  PASSPORT = 'passport',
  DRIVER_LICENSE = 'driver_license',
}

enum PhoneType {
  LANDLINE = 'landline',
  MOBILE = 'mobile',
}

class AddressDto {
  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Cityville', description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;
}

class PhoneDto {
  @ApiProperty({ example: '123456789', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'landline',
    enum: PhoneType,
    description: 'Phone type',
  })
  @IsEnum(PhoneType)
  @IsNotEmpty()
  phoneType: PhoneType;
}

export class CreateContactDto {
  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'id_card',
    enum: DocumentType,
    description: 'Document type',
  })
  @IsEnum(DocumentType)
  @IsNotEmpty()
  documentType: DocumentType;

  @ApiProperty({ example: '123456789', description: 'Document number' })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({ example: '1990-01-01', description: 'Date of birth' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: [AddressDto], description: 'Addresses' })
  @IsArray()
  @ArrayNotEmpty()
  addresses: AddressDto[];

  @ApiProperty({ type: [PhoneDto], description: 'Phone numbers' })
  @IsArray()
  @ArrayNotEmpty()
  phones: PhoneDto[];
}
