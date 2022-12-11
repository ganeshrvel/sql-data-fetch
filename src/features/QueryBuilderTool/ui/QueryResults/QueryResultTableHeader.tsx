import React from 'react';
import styles from './QueryResultTableHeader.module.scss';

export interface QueryResultTableHeaderProps {
  headers: string[];
}

export default function QueryResultTableHeader({
  headers,
}: QueryResultTableHeaderProps) {
  return (
    <thead className={styles.root}>
      <tr>
        {headers.map((a) => {
          return <th key={a}>{a}</th>;
        })}
      </tr>
    </thead>
  );
}
