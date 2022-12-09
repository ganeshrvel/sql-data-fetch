import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { SqlRemoteData, SqlResponse } from '../../data/apis/SqlResults';
import { data } from 'browserslist';

interface SqlResultsStore {
  sqlResults: SqlResponse[];
  sqlResultsError: string | null;
  isApiLoading: boolean;
  fetchSqlResults: () => Promise<SqlResultsStore>;
  reset: () => void;
}

const sqlFetcher = SqlRemoteData.shared;

export const useSqlResultsStore = create<SqlResultsStore>()(
  devtools((set, get) => ({
    sqlResults: [],
    sqlResultsError: null,
    isApiLoading: false,
    reset: () => {
      set(() => {
        return {
          sqlResults: [],
          sqlResultsError: null,
          isApiLoading: false,
        };
      });
    },
    fetchSqlResults: async (): Promise<SqlResultsStore> => {
      set(() => {
        return {
          sqlResults: [],
          sqlResultsError: null,
          isApiLoading: true,
        };
      });

      const httpResponse = await sqlFetcher.fetchDummyData();

      let sqlResults: SqlResponse[] = [];
      let sqlResultsError: string | null = null;

      if (httpResponse.hasError) {
        sqlResultsError = httpResponse.error;
      } else if (!httpResponse.hasData) {
        sqlResultsError = `[fetchSqlResults] Invalid 'data' received: ${data}`;
      } else {
        sqlResults = httpResponse.data!;
      }

      set(() => {
        return {
          sqlResults,
          sqlResultsError,
          isApiLoading: false,
        };
      });

      return get();
    },
  }))
);
