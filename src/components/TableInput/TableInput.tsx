import { ChangeEvent, FC } from 'react';

import styles from './TableInput.module.scss';

interface IInputProps {
  type: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TableInput: FC<IInputProps> = (tableInputProps) => <input className={styles.input} {...tableInputProps} />;
