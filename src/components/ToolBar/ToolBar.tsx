import { MouseEvent, ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { addCompany, removeSelectedCompany } from '@/slices';
import { Button, Modal } from 'antd';
import styles from './ToolBar.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { Input } from 'antd';

export const ToolBar: FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const companies = useAppSelector((state) => state.companies.companies);
  const emptyTable = !companies.length;

  const dispatch = useAppDispatch();

  const handleAddCompany = () => {
    if (name && address) {
      dispatch(addCompany({ name, address }));
      setName('');
      setAddress('');
    }
  };

  const handleRemoveSelectedCompany = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeSelectedCompany());
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className={styles.toolBar}>
      <Button type="primary" onClick={showModal}>
        Добавить новую компанию
      </Button>
      <Button disabled={emptyTable} danger type="primary" onClick={handleRemoveSelectedCompany}>
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
          disabled: !name || !address,
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
