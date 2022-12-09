import React from 'react';
import { SqlResponse } from '../../data/apis/SqlResults';

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

  return (
    <div>
      {results.map((a) => (
        <div key={a.id}>{a.brand}</div>
      ))}
    </div>
  );
}
