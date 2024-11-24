import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IEditCompanyPayload, IInitialState } from '@/models';
import { generateFakeCompanies } from '@/utils/generateFakeCompanies.ts';

const initialState: IInitialState = {
  companies: [],
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany(state, action: PayloadAction<{ name: string; address: string }>) {
      const newId = state.companies.length ? Math.max(...state.companies.map((c) => c.id)) + 1 : 1;
      state.companies.unshift({ id: newId, ...action.payload, selected: false });
    },
    removeSelectedCompany(state) {
      state.companies = state.companies.filter((company) => !company.selected);
    },
    toggleSelectedCompany(state, action: PayloadAction<number>) {
      const company = state.companies.find((company) => company.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleSelectAllCompany(state, action: PayloadAction<boolean>) {
      state.companies.forEach((company) => (company.selected = action.payload));
    },
    editCompany(state, action: PayloadAction<IEditCompanyPayload>) {
      const { id, field, value } = action.payload;
      const company = state.companies.find((company) => company.id === id);
      if (company && field in company) {
        company[field] = value;
      }
    },
    loadCompanies(state, action: PayloadAction<number>) {
      state.companies = generateFakeCompanies(action.payload);
    },
  },
});

export const {
  addCompany,
  toggleSelectedCompany,
  removeSelectedCompany,
  toggleSelectAllCompany,
  editCompany,
  loadCompanies,
} = companiesSlice.actions;

export default companiesSlice.reducer;
