import { ICompany } from '@/models';

export function generateFakeCompanies(count: number, startId: number = 0): ICompany[] {
  return Array.from({ length: count }, (_, index) => ({
    id: startId + index + 1,
    name: `Компания ${startId + index + 1}`,
    address: `Адрес ${startId + index + 1}`,
    selected: false,
  }));
}
