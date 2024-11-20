import { faker } from '@faker-js/faker';

export const generateFakeCompanies = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    selected: false,
  }));
};
