import React from 'react';
import { SqlResponse } from '../../data/apis/SqlResults';
import styles from './index.module.scss';
import QueryResultTableHeader from './QueryResultTableHeader';
import QueryResultTableRows from './QueryResultTableRows';

export interface QueryResultsProps {
  loading: boolean;
  results: SqlResponse[];
  error: string | null;
}
export default function QueryResults({
  results,
  loading,
  error,
}: QueryResultsProps) {
  function MessageSection() {
    if (loading) {
      return <span>Loading results..</span>;
    }

    if (error) {
      return (
        <span className={styles.error}>
          {error ?? 'Error occured while loading the rows'}
        </span>
      );
    }

    if (results.length < 1) {
      return <span>Press the RUN button to execute the query</span>;
    }

    return <span>Results found, {results.length} rows received.</span>;
  }

  const rowKeys = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className={styles.root}>
      <div className={styles.messageBlock}>{MessageSection()}</div>
      {results.length > 0 && (
        <div className={styles.tableWrapper}>
          <table>
            <QueryResultTableHeader headers={rowKeys} />

            <tbody>
              {results.map((a) => {
                return <QueryResultTableRows rowEntity={a} />;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
