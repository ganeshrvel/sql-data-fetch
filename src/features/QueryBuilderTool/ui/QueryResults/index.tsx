import React from 'react';
import { SqlResponse } from '../../data/apis/SqlResults';
import styles from './index.module.scss';
import QueryResultTableHeader from './QueryResultTableHeader';
import QueryResultTableRows from './QueryResultTableRows';

export interface QueryResultsProps {
  loading: boolean;
  results: SqlResponse[];
  sqlResultsError: string | null;
}
export default function QueryResults({
  results,
  loading,
  sqlResultsError,
}: QueryResultsProps) {
  if (loading) {
    return <div>Loading table..</div>;
  }

  if (sqlResultsError) {
    return <div>Error occured while loading table</div>;
  }

  if (results.length < 1) {
    return <div>Press the Run button to fetch sql results</div>;
  }

  const rowKeys = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className={styles.root}>
      <table>
        <QueryResultTableHeader headers={rowKeys} />

        <tbody>
          {results.map((a) => {
            return <QueryResultTableRows rowEntity={a} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
