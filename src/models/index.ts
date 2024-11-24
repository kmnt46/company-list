export interface IInitialState {
  companies: ICompany[];
}

export interface ICompany {
  id: number;
  name: string;
  address: string;
  selected: boolean;
}

export interface IEditCompanyPayload {
  id: number;
  field: 'name' | 'address';
  value: string;
}
