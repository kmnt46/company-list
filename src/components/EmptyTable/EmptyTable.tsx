import { FC } from 'react';

import styles from './EmptyTable.module.scss';

interface IEmptyTableProps {
  title: string;
}

export const EmptyTable: FC<IEmptyTableProps> = ({ title }) => (
  <tr>
    <td colSpan={3} className={styles.emptyTable}>
      {title}
    </td>
  </tr>
);
