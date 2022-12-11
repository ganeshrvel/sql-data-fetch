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
import RegularInput from '../../../components/RegularInput';
import { Button } from '../../../components/Button';
import { Images } from '../../../constants/Images';

export default function QueryBuilderTool() {
  const [selectedPredefinedQueryId, setSelectedPredefinedQueryId] = useState<
    string | null
  >(null);
  const [lastQuerySavedTime, setLastQuerySavedTime] = useState<number>(
    Date.now
  );
  const [validationError, setValidationError] = useState<string | null>(null);

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

  useEffect(() => {
    setLastQuerySavedTime(Date.now);
  }, [savedQueries, predefinedQueries, selectedQuery]);

  function validateSqlCode(code?: string) {
    let currentCode = code;

    if (undefinedOrNull(code)) {
      if (!undefinedOrNull(selectedPredefinedQueryId)) {
        currentCode = selectedPredefinedQuery?.code ?? '';
      } else {
        currentCode = selectedQuery?.code ?? '';
      }
    }

    currentCode = currentCode ?? '';

    if (currentCode.trim() === '') {
      setValidationError(
        'Invalid SQL Query. Input a valid query and press on the RUN button'
      );

      return false;
    }

    setValidationError(null);

    return true;
  }

  function handleQueryTitleChange(title: string) {
    queryStore.updateSelectedQueryItem({ data: { title } });
  }

  function handleCodeChange(code: string) {
    validateSqlCode(code);
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

    const isValidCode = validateSqlCode();
    if (!isValidCode) {
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
        <div className={styles.queryContainer}>
          {isTemporaryPredefinedQuerySelected ? (
            <span className={styles.heading}>
              This is a predefined query, you may run the code. To edit the
              query, click on EDIT button
            </span>
          ) : (
            <span className={styles.heading}>Run your queries</span>
          )}

          <div className={styles.queryInputFormWrapper}>
            <RegularInput
              title="Title"
              placeholder="Enter the title here"
              autoFocus={false}
              value={query.title}
              onChange={(e) => handleQueryTitleChange(e?.target?.value ?? '')}
              readOnly={isTemporaryPredefinedQuerySelected}
              maxLength={140}
            />
            <div className={styles.divider} />
            <QueryEditor
              title="SQL Code"
              onCodeChange={handleCodeChange}
              query={query}
              isTemporaryQuery={isTemporaryPredefinedQuerySelected}
            />
            <div className={styles.buttonWrapper}>
              {isTemporaryPredefinedQuerySelected && (
                <Button
                  text="Edit"
                  disabled={isSqlResultsApiLoading}
                  className={styles.editBtn}
                  icon={Images.EDIT}
                  onClick={handleEditPredefinedQuery}
                />
              )}

              <Button
                text="RUN"
                disabled={isSqlResultsApiLoading || !!validationError}
                className={styles.runBtn}
                icon={Images.RUN}
                onClick={handleRunQuery}
              />
            </div>
          </div>
          <div className={styles.queryResultsWrapper}>
            <QueryResults
              loading={isSqlResultsApiLoading}
              results={sqlResults}
              error={validationError || sqlResultsError}
            />
          </div>
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
            lastQuerySavedTime={lastQuerySavedTime}
          />
        </div>

        <div className={styles.bodyContainer}>{RenderBodyContainer()}</div>
      </div>
    </div>
  );
}
