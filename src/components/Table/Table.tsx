import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, UIEvent, useEffect, useState } from 'react';

import styles from './Table.module.scss';

import { EmptyTable } from '@/components/EmptyTable/EmptyTable.tsx';
import { TableRow } from '@/components/TableRow';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { appendCompanies, loadCompanies, toggleSelectAllCompany } from '@/slices';
import { ICompany } from '@/models';

export const Table: FC = () => {
  const dispatch = useAppDispatch();

  const { companies, selected } = useAppSelector((state) => state.companies);

  const [visibleCompanies, setVisibleCompanies] = useState<Array<ICompany>>([]);

  const emptyTable = !companies.length;

  useEffect(() => {
    dispatch(loadCompanies(100));
  }, [dispatch]);

  useEffect(() => {
    setVisibleCompanies(companies);
  }, [companies]);

  const handleSelectAllCompanies = (e: CheckboxChangeEvent) => {
    dispatch(toggleSelectAllCompany(e.target.checked));
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
      if (visibleCompanies.length < companies.length) {
        const newVisibleCount = Math.min(visibleCompanies.length + 100, companies.length);
        setVisibleCompanies(companies.slice(0, newVisibleCount));
      } else {
        dispatch(appendCompanies(100));
      }
    }
  };

  return (
    <div onScroll={handleScroll} className={styles.scrollContainer}>
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
          {visibleCompanies.map((company) => (
            <TableRow key={company.id} company={company} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
