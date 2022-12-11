import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './CollapsibleMenuContainer.module.scss';
import CollapsibleSubmenuItem, {
  SubmenuEntity,
} from './CollapsibleSubmenuItem';

export interface CollapsibleMenuEntity {
  title: string;
  submenuItems: SubmenuEntity[];
  expandedByDefault: true;
  id: string;
}

export interface CollapsibleMenuContainerProps {
  menuEntity: CollapsibleMenuEntity;
}
export default function CollapsibleMenuContainer({
  menuEntity,
}: CollapsibleMenuContainerProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    menuEntity.expandedByDefault
  );

  function toggleIsExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.root}>
      <span
        className={classNames(styles.title, {
          [styles.isExpanded]: isExpanded,
        })}
        onClick={toggleIsExpanded}
      >
        {menuEntity.title}
      </span>
      {isExpanded && (
        <div className={styles.submenuBody}>
          {menuEntity.submenuItems.map((submenuEntity) => {
            return (
              <div key={submenuEntity.id}>
                <CollapsibleSubmenuItem submenuEntity={submenuEntity} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
