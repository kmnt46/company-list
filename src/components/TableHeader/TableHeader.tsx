import { FC } from 'react';

import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { toggleSelectAllCompany } from '@/slices';

import styles from './TableHeader.module.scss';

interface ITableHeaderProps {
  emptyTable: boolean;
  selected: boolean;
}

export const TableHeader: FC<ITableHeaderProps> = ({ emptyTable, selected }) => {
  const dispatch = useAppDispatch();

  const handleSelectAllCompanies = (e: CheckboxChangeEvent) => {
    dispatch(toggleSelectAllCompany(e.target.checked));
  };

  return (
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
  );
};
