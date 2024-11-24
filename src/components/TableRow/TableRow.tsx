import { ChangeEvent, FC, useState, useEffect, useMemo } from 'react';

import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { ICompany } from 'models';

import { TableInput } from '@/components/TableInput';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { editCompany, toggleSelectedCompany } from '@/slices';

import styles from './TableRow.module.scss';

interface ITableRowProps {
  company: ICompany;
}

export const TableRow: FC<ITableRowProps> = ({ company }) => {
  const dispatch = useAppDispatch();

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);

  const { id, selected } = company;

  useEffect(() => {
    setName(company.name);
    setAddress(company.address);
  }, [company.name, company.address]);

  const handleSelectCompany = () => {
    dispatch(toggleSelectedCompany(id));
  };

  const handleEditSave = () => {
    if (editable) {
      dispatch(editCompany({ id, field: 'name', value: name }));
      dispatch(editCompany({ id, field: 'address', value: address }));
    }
    setEditable(!editable);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const rowSelected = useMemo(() => (selected ? styles.selected : ''), [selected]);

  const rowEdit = useMemo(() => (editable ? styles.edit : ''), [editable]);

  const buttonOption = useMemo(() => (editable ? <SaveOutlined /> : <EditOutlined />), [editable]);

  return (
    <tr className={`${styles.row} ${rowSelected} ${rowEdit}`}>
      <td>
        <div className={styles.rowTools}>
          <Checkbox className={styles.checkBox} checked={selected} onChange={handleSelectCompany} />
          <Button className={styles.button} onClick={handleEditSave}>
            {buttonOption}
          </Button>
        </div>
      </td>
      <td>
        <TableInput
          type="text"
          disabled={!editable}
          value={name}
          placeholder="Название компании"
          onChange={handleChangeName}
        />
      </td>
      <td>
        <TableInput
          type="text"
          disabled={!editable}
          value={address}
          placeholder="Адрес"
          onChange={handleChangeAddress}
        />
      </td>
    </tr>
  );
};
