import React from 'react';
import styles from './index.module.scss';
import { Images } from '../../../../constants/Images';
import { QueryBuilderHeaderButton } from '../QueryBuilderHeaderButton';

export interface EmptyHistoryProps {
  onCreateNewQuery: () => void;
}

export default function EmptyHistory({ onCreateNewQuery }: EmptyHistoryProps) {
  return (
    <div className={styles.root}>
      <QueryBuilderHeaderButton
        icon={Images.ADD}
        onClick={onCreateNewQuery}
        text="New Query"
        className={styles.cta}
        disabled={true}
      />
    </div>
  );
}
