import { FC } from 'react';

import styles from './EmptyTable.module.scss';

export const EmptyTable: FC = () => (
  <tr>
    <td colSpan={3} className={styles.emptyTable}>
      Список компаний пуст
    </td>
  </tr>
);
