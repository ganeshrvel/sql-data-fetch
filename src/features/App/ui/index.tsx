import React from 'react';
import styles from './index.module.scss';
import QueryBuilderTool from '../../QueryBuilderTool/ui';

export default function App() {
  return (
    <div className={styles.root}>
      <QueryBuilderTool />
    </div>
  );
}
