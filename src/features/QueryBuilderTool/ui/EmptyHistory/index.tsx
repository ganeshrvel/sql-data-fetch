import React from 'react';
import styles from './index.module.scss';

export interface EmptyHistoryProps {
  onCreateNewQuery: () => void;
}

export default function EmptyHistory({ onCreateNewQuery }: EmptyHistoryProps) {
  return (
    <div className={styles.root}>
      <button onClick={onCreateNewQuery}>New Query</button>
    </div>
  );
}
