import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DocumentTypeSeeder } from './documentType.seeder';
import { Logger } from '@nestjs/common';

export class MainSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        let statusMigration = '';
        try {
            statusMigration = DocumentTypeSeeder.name;
            await runSeeder(dataSource, DocumentTypeSeeder);
        } catch (error) {
            Logger.warn(
                error,
                `${MainSeeder.name}/${this.run.name}/${statusMigration}`,
            );
        }
    }
}
