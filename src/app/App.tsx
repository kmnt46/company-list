import { FC } from 'react';
import { Table } from '@/components/Table';
import { Header } from '@/components/Header';
import { ToolBar } from '@/components/ToolBar';
import './App.css';

export const App: FC = () => (
  <div className="app">
    <Header title="Список компаний" />
    <ToolBar />
    <Table />
  </div>
);
