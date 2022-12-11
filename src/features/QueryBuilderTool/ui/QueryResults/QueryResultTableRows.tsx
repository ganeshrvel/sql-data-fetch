import React from 'react';
import styles from './QueryResultTableRows.module.scss';

export interface QueryResultTableRowsProps {
  rowEntity: { [key in string]: string };
}

export default function QueryResultTableRows({
  rowEntity,
}: QueryResultTableRowsProps) {
  const cols = Object.values(rowEntity);

  return (
    <tr className={styles.root}>
      {cols.map((col) => {
        return <td>{col}</td>;
      })}
    </tr>
  );
}
