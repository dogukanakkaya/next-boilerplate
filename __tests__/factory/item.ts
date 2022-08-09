import { faker } from '@faker-js/faker';
import { Item } from '@prisma/client';
import { Factory } from 'rosie';

export default new Factory<FactoryAttributes>().attrs({
    id: () => faker.datatype.uuid(),
    name: () => `${faker.company.companyName()}-${faker.random.numeric(5)}`,
    isActive: () => faker.datatype.boolean()
});

type FactoryAttributes = Omit<Item, 'createdAt' | 'updatedAt'>;