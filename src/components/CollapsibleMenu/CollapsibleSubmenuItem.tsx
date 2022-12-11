import React from 'react';
import classNames from 'classnames';

import styles from './CollapsibleSubmenuItem.module.scss';

export interface SubmenuEntity {
  label: string;
  onClick: () => void;
  isSelected: boolean;
  id: string;
}

export interface CollapsibleSubmenuItemProps {
  submenuEntity: SubmenuEntity;
}
export default function CollapsibleSubmenuItem({
  submenuEntity,
}: CollapsibleSubmenuItemProps) {
  return (
    <div className={styles.root} onClick={submenuEntity.onClick}>
      <span
        className={classNames({
          [styles.isSelected]: submenuEntity.isSelected,
        })}
      >
        {submenuEntity.label}
      </span>
    </div>
  );
}
