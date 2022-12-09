import React, { useEffect, useMemo, useState } from 'react';
import QueryEditor from '../../../components/QueryEditor';
import QueryResults from './QueryResults';
import styles from './index.module.scss';
import { undefinedOrNull } from '../../../helpers';
import { useQueryStore } from './stores/queryStore';
import EmptyHistory from './EmptyHistory';
import QuerySidebar from './QuerySidebar';
import QueryBuilderRibbonHeader from './QueryBuilderRibbonHeader';
import { usePredefinedQueryStore } from './stores/predefinedQueryStore';
import { QueryEntity } from './types';
import { useSqlResultsStore } from './stores/sqlResultsStore';

export default function QueryBuilderTool() {
  const [selectedPredefinedQueryId, setSelectedPredefinedQueryId] = useState<
    string | null
  >(null);

  const queryStore = useQueryStore();
  const savedQueries = useQueryStore((state) => state.savedQueries);
  const selectedQuery = useQueryStore((state) => state.selectedQuery());
  const selectedQueryId = useQueryStore((state) => state.selectedQueryId);

  const predefinedQueryStore = usePredefinedQueryStore();
  const predefinedQueries = usePredefinedQueryStore(
    (state) => state.predefinedQueries
  );

  const sqlResultsStore = useSqlResultsStore();
  const isSqlResultsApiLoading = useSqlResultsStore(
    (state) => state.isApiLoading
  );
  const sqlResults = useSqlResultsStore((state) => state.sqlResults);
  const sqlResultsError = useSqlResultsStore((state) => state.sqlResultsError);

  const selectedPredefinedQuery = useMemo<QueryEntity | null>(() => {
    if (!selectedPredefinedQueryId) {
      return null;
    }

    return predefinedQueryStore.getQuery({
      predefinedQueryId: selectedPredefinedQueryId,
    });
  }, [selectedPredefinedQueryId]);

  const isTemporaryPredefinedQuerySelected: boolean = !!selectedPredefinedQuery;

  useEffect(() => {
    if (undefinedOrNull(selectedQueryId)) {
      createNewQueryItem();
    }
  }, []);

  useEffect(() => {
    sqlResultsStore.reset();
  }, [selectedPredefinedQueryId, selectedQueryId]);

  function handleQueryTitleChange(title: string) {
    queryStore.updateSelectedQueryItem({ data: { title } });
  }

  function handleCodeChange(code: string) {
    queryStore.updateSelectedQueryItem({ data: { code } });
  }

  function handleSavedQueryMenuSelect(queryId: string) {
    setSelectedPredefinedQueryId(null);

    queryStore.changeSelectedQuery({ queryId });
  }

  function handleEditPredefinedQuery() {
    if (!selectedPredefinedQuery) {
      return;
    }

    queryStore.createNewQueryItem({ data: selectedPredefinedQuery });
    setSelectedPredefinedQueryId(null);
  }

  async function handleRunQuery() {
    if (isSqlResultsApiLoading) {
      return;
    }

    let query: QueryEntity | null = null;

    if (isTemporaryPredefinedQuerySelected) {
      query = selectedPredefinedQuery;
    } else if (selectedQuery) {
      query = selectedQuery;
    }

    if (!query) {
      console.error(`[handleRunQuery] invalid selected query`);

      return;
    }

    await sqlResultsStore.fetchSqlResults();
  }

  function handlePredefinedQuerySelect(predefinedQueryId: string) {
    setSelectedPredefinedQueryId(predefinedQueryId || null);
  }

  function createNewQueryItem(data?: Partial<QueryEntity>) {
    queryStore.createNewQueryItem({ data });
    setSelectedPredefinedQueryId(null);
  }

  function RenderBodyContainer() {
    let query: QueryEntity | null = null;

    if (isTemporaryPredefinedQuerySelected) {
      query = selectedPredefinedQuery;
    } else if (selectedQuery) {
      query = selectedQuery;
    }

    if (query) {
      return (
        <div>
          <div>
            {isTemporaryPredefinedQuerySelected ? (
              <div>
                This is a predefined query, You may run the code. To edit the
                query click on edit button
              </div>
            ) : (
              <div>Run your quries</div>
            )}
            {/*todo move these to a new component*/}
            <input
              placeholder="Enter the title here"
              autoFocus={false}
              value={query.title}
              onChange={(e) => handleQueryTitleChange(e?.target?.value ?? '')}
              readOnly={isTemporaryPredefinedQuerySelected}
            />
            <QueryEditor
              onCodeChange={handleCodeChange}
              query={query}
              isTemporaryQuery={isTemporaryPredefinedQuerySelected}
            />
            {isTemporaryPredefinedQuerySelected && (
              <button onClick={handleEditPredefinedQuery}>Edit</button>
            )}

            <button onClick={handleRunQuery}>Run</button>
          </div>
          <QueryResults
            loading={isSqlResultsApiLoading}
            results={sqlResults}
            sqlResultsError={sqlResultsError}
          />
        </div>
      );
    }

    return <EmptyHistory onCreateNewQuery={createNewQueryItem} />;
  }

  return (
    <div className={styles.root}>
      <QueryBuilderRibbonHeader onCreateNewQuery={createNewQueryItem} />

      <div className={styles.body}>
        <div className={styles.querySidebarContainer}>
          <QuerySidebar
            savedQueries={savedQueries}
            predefinedQueries={predefinedQueries}
            onSavedQueryMenuSelect={handleSavedQueryMenuSelect}
            onPredefinedQueryMenuSelect={handlePredefinedQuerySelect}
            selectedQueryId={selectedQueryId}
            selectedPredefinedQueryId={selectedPredefinedQueryId}
          />
        </div>

        <div className={styles.bodyContainer}>{RenderBodyContainer()}</div>
      </div>
    </div>
  );
}

console.log('todo move tiny components and inputs to a new file');
console.log('todo validation for editor and title');
