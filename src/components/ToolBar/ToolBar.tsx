import { ChangeEvent, FC, useMemo, useState } from 'react';

import { Input } from 'antd';
import { Button, Modal } from 'antd';

import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { addCompany, removeSelectedCompany } from '@/slices';

import styles from './ToolBar.module.scss';

export const ToolBar: FC = () => {
  const dispatch = useAppDispatch();

  const companies = useAppSelector((state) => state.companies.companies);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const emptyTable = !companies.length;

  const hasSelectedCompanies = useMemo(() => companies.some((company) => company.selected), [companies]);

  const handleAddCompany = () => {
    if (name.trim() && address.trim()) {
      dispatch(addCompany({ name: name.trim(), address: address.trim() }));
      setName('');
      setAddress('');
    }
  };

  const handleRemoveSelectedCompany = () => {
    dispatch(removeSelectedCompany());
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddCompany();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className={styles.toolBar}>
      <Button type="primary" onClick={showModal}>
        Добавить новую компанию
      </Button>
      <Button
        disabled={emptyTable || !hasSelectedCompanies}
        danger
        type="primary"
        onClick={handleRemoveSelectedCompany}
      >
        Удалить выделенные компании
      </Button>
      <Modal
        title="Введите компанию и ее адрес"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Добавить"
        cancelText="Отмена"
        okButtonProps={{
          disabled: !name.trim() || !address.trim(),
        }}
      >
        <div className={styles.inputGroup}>
          <Input type="text" placeholder="Название компании" value={name} onChange={handleChangeName} />
          <Input type="text" placeholder="Адрес" value={address} onChange={handleChangeAddress} />
        </div>
      </Modal>
    </div>
  );
};
