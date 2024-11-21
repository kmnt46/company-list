import { ChangeEvent, FC, useState, useEffect, useMemo } from 'react';
import { ICompany } from 'models';
import { Button, Checkbox } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { editCompany, toggleSelectedCompany } from '@/slices';
import styles from './TableRow.module.scss';
import { TableInput } from '@/components/TableInput';

interface ITableRowProps {
  company: ICompany;
}

export const TableRow: FC<ITableRowProps> = ({ company }) => {
  const dispatch = useAppDispatch();

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);

  const { id, selected } = company;

  const handleSelectCompany = () => {
    dispatch(toggleSelectedCompany(id));
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleEditSave = () => {
    if (editable) {
      dispatch(editCompany({ id, field: 'name', value: name }));
      dispatch(editCompany({ id, field: 'address', value: address }));
    }
    setEditable(!editable);
  };

  useEffect(() => {
    setName(company.name);
    setAddress(company.address);
  }, [company.name, company.address]);

  const rowSelected = useMemo(() => (selected ? styles.selected : ''), [selected]);

  const rowEdit = useMemo(() => (editable ? styles.edit : ''), [editable]);

  return (
    <tr className={`${styles.row} ${rowSelected} ${rowEdit}`}>
      <td>
        <Checkbox checked={selected} onClick={handleSelectCompany} />
        <Button onClick={handleEditSave}>{editable ? 'Save' : 'Edit'}</Button>
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
