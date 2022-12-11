import React, { useMemo } from 'react';
import styles from './index.module.scss';
import { PredefinedQueries, SavedQueries } from '../types';
import { undefinedOrNull } from '../../../../helpers';
import { CollapsibleMenu } from '../../../../components/CollapsibleMenu';
import { CollapsibleMenuEntity } from '../../../../components/CollapsibleMenu/CollapsibleMenuContainer';
import { SubmenuEntity } from '../../../../components/CollapsibleMenu/CollapsibleSubmenuItem';

export interface QuerySidebarProps {
  savedQueries: SavedQueries;
  predefinedQueries: PredefinedQueries;
  onSavedQueryMenuSelect: (queryId: string) => void;
  onPredefinedQueryMenuSelect: (predefinedQueryId: string) => void;
  selectedPredefinedQueryId: string | null;
  selectedQueryId: string | null;
  lastQuerySavedTime: number;
}

export default function QuerySidebar({
  savedQueries,
  predefinedQueries,
  onSavedQueryMenuSelect,
  onPredefinedQueryMenuSelect,
  selectedPredefinedQueryId,
  selectedQueryId,
  lastQuerySavedTime,
}: QuerySidebarProps) {
  const menuItems = useMemo<CollapsibleMenuEntity[]>(() => {
    const savedQuerySubmenuList: SubmenuEntity[] = Object.entries(
      savedQueries
    ).map(([queryId, value]) => {
      return {
        id: queryId,
        label: value.title || 'Untitled',
        isSelected:
          undefinedOrNull(selectedPredefinedQueryId) &&
          queryId === selectedQueryId,
        onClick: () => {
          onSavedQueryMenuSelect(queryId);
        },
      };
    });

    const savedQueryMenu: CollapsibleMenuEntity = {
      expandedByDefault: true,
      submenuItems: savedQuerySubmenuList,
      title: `Saved Queries`,
      id: `saved-queries`,
    };

    const predefinedQuerySubmenuList: SubmenuEntity[] = Object.entries(
      predefinedQueries
    ).map(([predefinedQueryId, value]) => {
      return {
        id: predefinedQueryId,
        label: value.title || 'Untitled',
        isSelected: predefinedQueryId === selectedPredefinedQueryId,
        onClick: () => {
          onPredefinedQueryMenuSelect(predefinedQueryId);
        },
      };
    });

    const predefinedQueryMenu: CollapsibleMenuEntity = {
      expandedByDefault: true,
      submenuItems: predefinedQuerySubmenuList,
      title: `Predefined Queries`,
      id: `predefined-queries`,
    };

    return [savedQueryMenu, predefinedQueryMenu];
  }, [
    savedQueries,
    predefinedQueries,
    selectedPredefinedQueryId,
    selectedQueryId,
    lastQuerySavedTime,
  ]);

  return (
    <div>
      <CollapsibleMenu menuItems={menuItems} />
    </div>
  );
}
