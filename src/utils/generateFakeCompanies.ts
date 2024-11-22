export const generateFakeCompanies = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: `Название компании ${index + 1}`,
    address: `Адрес ${index + 1}`,
    selected: false,
  }));
};
