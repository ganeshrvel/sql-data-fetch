import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { PredefinedQueries, SavedQueries } from '../types';
import { undefinedOrNull } from '../../../../helpers';

export interface QuerySidebarProps {
  savedQueries: SavedQueries;
  predefinedQueries: PredefinedQueries;
  onSavedQueryMenuSelect: (queryId: string) => void;
  onPredefinedQueryMenuSelect: (predefinedQueryId: string) => void;
  selectedPredefinedQueryId: string | null;
  selectedQueryId: string | null;
}

export default function QuerySidebar({
  savedQueries,
  predefinedQueries,
  onSavedQueryMenuSelect,
  onPredefinedQueryMenuSelect,
  selectedPredefinedQueryId,
  selectedQueryId,
}: QuerySidebarProps) {
  return (
    <div className={styles.root}>
      <br />

      <div>
        <span>
          <strong>Saved Queries:</strong>
        </span>
        {Object.entries(savedQueries).map(([queryId, value]) => {
          return (
            <a
              className={classNames(styles.listItem, {
                [styles.selected]:
                  undefinedOrNull(selectedPredefinedQueryId) &&
                  queryId === selectedQueryId,
              })}
              key={queryId}
              onClick={() => {
                onSavedQueryMenuSelect(queryId);
              }}
            >
              {value.title || 'Untitled'}
            </a>
          );
        })}
      </div>

      <br />
      <br />
      <br />

      <div>
        <span>
          <strong>Predefined Queries:</strong>
        </span>
        {Object.entries(predefinedQueries).map(([predefinedQueryId, value]) => {
          return (
            <a
              className={classNames(styles.listItem, {
                [styles.selected]:
                  predefinedQueryId === selectedPredefinedQueryId,
              })}
              key={predefinedQueryId}
              onClick={() => {
                onPredefinedQueryMenuSelect(predefinedQueryId);
              }}
            >
              {value.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}
