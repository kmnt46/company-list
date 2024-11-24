import { ICompany } from '@/models';

export function generateFakeCompanies(count: number): ICompany[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Компания ${index + 1}`,
    address: `Адрес ${index + 1}`,
    selected: false,
  }));
}
