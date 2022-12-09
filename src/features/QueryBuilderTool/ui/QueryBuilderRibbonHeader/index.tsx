import React from 'react';
import styles from './index.module.scss';

export interface QueryBuilderRibbonHeaderProps {
  onCreateNewQuery: () => void;
}

export default function QueryBuilderRibbonHeader({
  onCreateNewQuery,
}: QueryBuilderRibbonHeaderProps) {
  return (
    <div className={styles.root}>
      <button onClick={onCreateNewQuery}>New Query</button>
    </div>
  );
}
