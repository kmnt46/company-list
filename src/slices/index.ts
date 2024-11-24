import { createSlice } from '@reduxjs/toolkit';

import { IEditCompanyPayload, IInitialState } from '@/models';
import { generateFakeCompanies } from '@/utils/generateFakeCompanies.ts';

const initialState: IInitialState = {
  companies: [],
  selected: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany(state, { payload }: { payload: { name: string; address: string } }) {
      const newId = state.companies.length ? Math.max(...state.companies.map((c) => c.id)) + 1 : 1;
      state.companies.unshift({ id: newId, ...payload, selected: false });
    },
    removeSelectedCompany(state) {
      state.companies = state.companies.filter((company) => !company.selected);
      state.selected = false;
    },
    toggleSelectedCompany(state, { payload }: { payload: number }) {
      const company = state.companies.find((company) => company.id === payload);
      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleSelectAllCompany(state, { payload }: { payload: boolean }) {
      state.companies.forEach((company) => (company.selected = payload));
      state.selected = !state.selected;
    },
    editCompany(state, { payload }: { payload: IEditCompanyPayload }) {
      const company = state.companies.find((company) => company.id === payload.id);
      if (company) {
        company[payload.field] = payload.value;
      }
    },
    loadCompanies: (state, { payload }: { payload: number }) => {
      state.companies = generateFakeCompanies(payload);
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
