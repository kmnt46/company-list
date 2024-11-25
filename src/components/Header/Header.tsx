import { FC } from 'react';

import styles from './Header.module.scss';

interface IHeaderProps {
  title: string;
}

export const Header: FC<IHeaderProps> = ({ title }) => <h1 className={styles.header}>{title}</h1>;
