import { createSlice } from '@reduxjs/toolkit';
import { ICompany } from '@/models';
import { generateFakeCompanies } from '@/utils/generateFakeCompanies.ts';

interface IInitialState {
  companies: ICompany[];
  selected: boolean;
}

const initialState: IInitialState = {
  companies: [],
  selected: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany(state, action) {
      const newId = state.companies.length + 1;
      state.companies.push({ id: newId, ...action.payload, selected: false });
    },
    removeSelectedCompany(state) {
      state.companies = state.companies.filter((company) => !company.selected);
      state.selected = false;
    },
    toggleSelectedCompany(state, action) {
      const company = state.companies.find((company) => company.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleSelectAllCompany(state, action) {
      state.companies.forEach((company) => (company.selected = action.payload));
      state.selected = !state.selected;
    },
    editCompany(state, action) {
      const company = state.companies.find((company) => company.id === action.payload.id);
      if (company) (company as any)[action.payload.field] = action.payload.value;
    },
    loadCompanies: (state, action) => {
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
