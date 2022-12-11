import React from 'react';
import styles from './index.module.scss';
import CollapsibleMenuContainer, { CollapsibleMenuEntity } from './CollapsibleMenuContainer';

export interface CollapsibleMenuProps {
  menuItems: CollapsibleMenuEntity[];
}
export default function CollapsibleMenu({ menuItems }: CollapsibleMenuProps) {
  return (
    <div className={styles.root}>
      {menuItems.map((menuEntity) => (
        <div key={menuEntity.id}>
          <CollapsibleMenuContainer menuEntity={menuEntity} />
        </div>
      ))}
    </div>
  );
}
