import { FC, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { TableRow } from '@/components/TableRow';
import { Checkbox } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './Table.module.scss';
import { EmptyTable } from '@/components/EmptyTable/EmptyTable.tsx';
import { loadCompanies, toggleSelectAllCompany } from '@/slices';

export const Table: FC = () => {
  const dispatch = useAppDispatch();

  const { companies, selected } = useAppSelector((state) => state.companies);

  useEffect(() => {
    dispatch(loadCompanies(10));
  }, [dispatch]);

  const emptyTable = !companies.length;

  const handleSelectAllCompanies = (e: CheckboxChangeEvent) => {
    dispatch(toggleSelectAllCompany(e.target.checked));
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <div className={styles.checkboxContainer}>
              <div>Выделить всё</div>
              <Checkbox disabled={emptyTable} checked={selected} onChange={handleSelectAllCompanies} />
            </div>
          </th>
          <th>Название компании</th>
          <th>Адрес</th>
        </tr>
      </thead>
      <tbody>
        {emptyTable && <EmptyTable />}
        {companies.map((company) => (
          <TableRow key={company.id} company={company} />
        ))}
      </tbody>
    </table>
  );
};
