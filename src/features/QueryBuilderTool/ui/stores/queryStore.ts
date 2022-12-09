import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { QueryEntity, SavedQueries } from '../types';
import { undefinedOrNull } from '../../../../helpers';
import { devtools } from 'zustand/middleware';

interface QueryStore {
  savedQueries: SavedQueries;
  selectedQueryId: null | string;
  changeSelectedQuery: ({ queryId: string }) => void;
  selectedQuery: () => null | QueryEntity;
  getQuerySize: () => number;
  clearSavedQueries: () => QueryStore;
  updateQueryItem: ({
    data,
    queryId,
  }: {
    data: Partial<QueryEntity>;
    queryId: string;
  }) => QueryStore;
  updateSelectedQueryItem: ({ data }: { data: Partial<QueryEntity> }) => void;
  createNewQueryItem: ({ data }: { data?: Partial<QueryEntity> }) => QueryStore;
}

export const useQueryStore = create<QueryStore>()(
  devtools((set, get) => ({
    savedQueries: {},
    selectedQueryId: null,
    getQuerySize: () => {
      const savedQueries = get().savedQueries;

      return Object.keys(savedQueries).length;
    },
    selectedQuery: () => {
      const prevSavedQueries = get().savedQueries;
      const prevSelectedQueryId = get().selectedQueryId;
      if (undefinedOrNull(prevSelectedQueryId)) {
        return null;
      }

      return prevSavedQueries[prevSelectedQueryId] ?? null;
    },
    changeSelectedQuery: ({ queryId }: { queryId: string }) => {
      if (undefinedOrNull(queryId)) {
        console.error(`[changeSelectedQuery]Invalid 'queryId' => ${queryId}`);
        return null;
      }

      set(({ savedQueries }) => {
        if (!(queryId in savedQueries)) {
          console.error(
            `[changeSelectedQuery] The 'queryId' => ${queryId} does not exist in the 'savedQueries'`
          );

          return {};
        }

        return {
          selectedQueryId: queryId,
        };
      });
    },
    clearSavedQueries: () => {
      set((_) => ({ savedQueries: {} }));

      return get();
    },
    updateQueryItem: ({
      data,
      queryId,
    }: {
      data: Partial<QueryEntity>;
      queryId: string;
    }) => {
      set(({ savedQueries }) => {
        const prevSavedQueries = savedQueries;

        if (!(queryId in prevSavedQueries)) {
          console.error(`[updateQueryItem]Invalid 'queryId' => ${queryId}`);

          return {};
        }

        prevSavedQueries[queryId] = {
          ...prevSavedQueries[queryId],
          ...data,
        };

        return {
          savedQueries: prevSavedQueries,
        };
      });

      return get();
    },
    updateSelectedQueryItem: ({ data }: { data: Partial<QueryEntity> }) => {
      set(({ savedQueries, selectedQueryId }) => {
        if (undefinedOrNull(selectedQueryId)) {
          return {};
        }

        const prevSavedQueries = savedQueries;

        if (!(selectedQueryId in prevSavedQueries)) {
          console.error(
            `[updateSelectedQueryItem]Invalid 'queryId' => ${selectedQueryId}`
          );

          return {};
        }

        prevSavedQueries[selectedQueryId] = {
          ...prevSavedQueries[selectedQueryId],
          ...data,
        };

        return {
          savedQueries: prevSavedQueries,
        };
      });
    },
    createNewQueryItem: ({ data }): QueryStore => {
      set(({ savedQueries, getQuerySize }) => {
        const queryId = uuidv4();
        const prevSavedQueries = savedQueries;
        const querySize = getQuerySize();

        prevSavedQueries[queryId] = {
          title: data?.title ?? `Untitled Query - ${querySize + 1}`,
          code: data?.code ?? ``,
        };

        return {
          savedQueries: prevSavedQueries,
          selectedQueryId: queryId,
        };
      });

      return get();
    },
  }))
);
