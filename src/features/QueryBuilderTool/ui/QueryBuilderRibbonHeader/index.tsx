import React from 'react';
import styles from './index.module.scss';
import { QueryBuilderHeaderButton } from '../QueryBuilderHeaderButton';
import { Images } from '../../../../constants/Images';

export interface QueryBuilderRibbonHeaderProps {
  onCreateNewQuery: () => void;
}

export default function QueryBuilderRibbonHeader({
  onCreateNewQuery,
}: QueryBuilderRibbonHeaderProps) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.appName}>SQL QUERY RUNNER</div>
        <div className={styles.ctaWrapper}>
          <QueryBuilderHeaderButton
            icon={Images.ADD}
            onClick={onCreateNewQuery}
            text="New Query"
            className={styles.cta}
          />
        </div>
      </div>
    </div>
  );
}
