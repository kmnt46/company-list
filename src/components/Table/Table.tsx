import { FC, UIEvent, useEffect, useMemo, useState } from 'react';

import { EmptyTable } from '@/components/EmptyTable/EmptyTable.tsx';
import { TableHeader } from '@/components/TableHeader';
import { TableRow } from '@/components/TableRow';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { loadCompanies } from '@/slices';

import styles from './Table.module.scss';

export const Table: FC = () => {
  const dispatch = useAppDispatch();

  const { companies, selected } = useAppSelector((state) => state.companies);

  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 700;
  const rowHeight = 50;
  const buffer = 5;

  const totalRows = companies.length;
  const visibleRows = Math.ceil(containerHeight / rowHeight);

  const emptyTable = !companies.length;

  useEffect(() => {
    dispatch(loadCompanies(10000));
  }, [dispatch]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const endIndex = Math.min(totalRows, startIndex + visibleRows + buffer * 2);

  const visibleCompanies = useMemo(() => companies.slice(startIndex, endIndex), [companies, startIndex, endIndex]);

  const topPadding = startIndex * rowHeight;
  const bottomPadding = (totalRows - endIndex) * rowHeight;

  return (
    <div onScroll={handleScroll} className={styles.scrollContainer} style={{ height: containerHeight }}>
      <table className={styles.table}>
        <TableHeader selected={selected} emptyTable={emptyTable} />
        <tbody>
          {emptyTable ? (
            <EmptyTable />
          ) : (
            <>
              <tr style={{ height: topPadding }}></tr>
              {visibleCompanies.map((company) => (
                <TableRow key={company.id} company={company} />
              ))}
              <tr style={{ height: bottomPadding }}></tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
