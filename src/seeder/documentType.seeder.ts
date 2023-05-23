import { DocumentType } from '../contact/entities/documentType.entity';
import { IDocumentType } from '../shared/interfaces/IdocumentType';

import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class DocumentTypeSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const documentRepository = dataSource.getRepository(DocumentType);
        const exist = (await documentRepository.find()).length > 0;
        if (exist) return;
        const userData = await this.createFake();
        const dataCreated = await Promise.all(
            userData.map((item) => documentRepository.create(item)),
        );
        const dataFull = await Promise.all(
            dataCreated.map((item) => documentRepository.save(item)),
        );

        return dataFull;
    }

    async createFake() {
        const data: Array<IDocumentType> = [];
        for (let i = 0; i < 3; i++) {
            data.push({
                name: `dato${i}`,
            });
        }
        return data;
    }
}
