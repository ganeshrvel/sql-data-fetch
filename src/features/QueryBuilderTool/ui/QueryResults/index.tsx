import React from 'react';
import 'react-virtualized/styles.css';
import { SqlResponse } from '../../data/apis/SqlResults';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import styles from './index.module.scss';

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

  return (
    <div className={styles.root}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            //sort={this._sort}
            //sortBy={this.state.sortBy}
            //sortDirection={this.state.sortDirection}
            // rowCount={this.state.sortedList.length}
            // rowGetter={({ index }) => this.state.sortedList[index]}
            rowCount={results.length}
            rowGetter={({ index }) => results[index]}
            //rowRenderer={rowRenderer}
          >
            {Object.keys(results[0]).map((col) => {
              return <Column key={col} label={col} dataKey={col} width={150} />;
            })}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
}
