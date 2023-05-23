import { MigrationInterface, QueryRunner } from 'typeorm';

export class Prueba21684700541407 implements MigrationInterface {
    name = 'Prueba21684700541407';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`document_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`phones\` (\`id\` char(36) NOT NULL DEFAULT 'uuid()', \`contact_id\` char(36) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`phone_type\` enum ('fijo', 'celular') NOT NULL, INDEX \`fk_contact_phones\` (\`contact_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`contacts\` (\`id\` char(36) NOT NULL DEFAULT 'uuid()', \`first_name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`document_type_id\` int NOT NULL, \`document_number\` varchar(20) NOT NULL, \`birth_date\` date NOT NULL, \`email\` varchar(100) NOT NULL, INDEX \`idx_document_number\` (\`document_number\`), INDEX \`idx_first_name_last_name\` (\`first_name\`, \`last_name\`), INDEX \`idx_email\` (\`email\`), UNIQUE INDEX \`unique_email\` (\`email\`), UNIQUE INDEX \`unique_document\` (\`document_type_id\`, \`document_number\`), UNIQUE INDEX \`IDX_752866c5247ddd34fd05559537\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`addresses\` (\`id\` char(36) NOT NULL DEFAULT 'uuid()', \`contact_id\` char(36) NOT NULL, \`address\` varchar(100) NOT NULL, \`city\` varchar(50) NOT NULL, INDEX \`fk_contact_adress\` (\`contact_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`phones\` ADD CONSTRAINT \`FK_8eb77dcdff98fa54ac31de237f4\` FOREIGN KEY (\`contact_id\`) REFERENCES \`contacts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`contacts\` ADD CONSTRAINT \`FK_c91fc853ac70ce74e18d1cecf0a\` FOREIGN KEY (\`document_type_id\`) REFERENCES \`document_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_a3aa8eb2226a91851aec4a56ff7\` FOREIGN KEY (\`contact_id\`) REFERENCES \`contacts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_a3aa8eb2226a91851aec4a56ff7\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`contacts\` DROP FOREIGN KEY \`FK_c91fc853ac70ce74e18d1cecf0a\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`phones\` DROP FOREIGN KEY \`FK_8eb77dcdff98fa54ac31de237f4\``,
        );
        await queryRunner.query(
            `DROP INDEX \`fk_contact_adress\` ON \`addresses\``,
        );
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_752866c5247ddd34fd05559537\` ON \`contacts\``,
        );
        await queryRunner.query(
            `DROP INDEX \`unique_document\` ON \`contacts\``,
        );
        await queryRunner.query(`DROP INDEX \`unique_email\` ON \`contacts\``);
        await queryRunner.query(`DROP INDEX \`idx_email\` ON \`contacts\``);
        await queryRunner.query(
            `DROP INDEX \`idx_first_name_last_name\` ON \`contacts\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_document_number\` ON \`contacts\``,
        );
        await queryRunner.query(`DROP TABLE \`contacts\``);
        await queryRunner.query(
            `DROP INDEX \`fk_contact_phones\` ON \`phones\``,
        );
        await queryRunner.query(`DROP TABLE \`phones\``);
        await queryRunner.query(`DROP TABLE \`document_type\``);
    }
}
