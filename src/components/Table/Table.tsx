import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { FC, useEffect, useState } from 'react';

import styles from './Table.module.scss';

import { EmptyTable } from '@/components/EmptyTable/EmptyTable.tsx';
import { TableRow } from '@/components/TableRow';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { loadCompanies, toggleSelectAllCompany } from '@/slices';

export const Table: FC = () => {
  const dispatch = useAppDispatch();

  const { companies, selected } = useAppSelector((state) => state.companies);

  const [visibleCompanies, setVisibleCompanies] = useState(companies.slice(0, 100));

  useEffect(() => {
    dispatch(loadCompanies(10000));
  }, [dispatch]);

  const emptyTable = !companies.length;

  const handleSelectAllCompanies = (e: CheckboxChangeEvent) => {
    dispatch(toggleSelectAllCompany(e.target.checked));
  };

  const handleScroll = (e: React.UIEvent<HTMLTableElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      const newVisibleCount = visibleCompanies.length + 100;

      if (newVisibleCount <= companies.length) {
        setVisibleCompanies(companies.slice(0, newVisibleCount));
      } else {
        setVisibleCompanies(companies);
      }
    }
  };

  useEffect(() => {
    setVisibleCompanies(companies.slice(0, 100));
  }, [companies]);

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
