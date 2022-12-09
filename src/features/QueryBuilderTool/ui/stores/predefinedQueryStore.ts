import create from 'zustand';
import { PredefinedQueries, QueryEntity } from '../types';
import { undefinedOrNull } from '../../../../helpers';
import { devtools } from 'zustand/middleware';

interface PredefinedQueryStore {
  readonly predefinedQueries: PredefinedQueries;
  getQuery: ({
    predefinedQueryId,
  }: {
    predefinedQueryId: string;
  }) => null | QueryEntity;
}

export const usePredefinedQueryStore = create<PredefinedQueryStore>()(
  devtools((set, get) => ({
    predefinedQueries: {
      '750a8962-1ff7-4660-aeb8-6013580e1268': {
        title: 'Select all Animals',
        code: `select * from 'ANIMALS'`,
      },
      'ef949378-1945-4a30-b653-b078f5201eeb': {
        title: 'Select all Fruits',
        code: `select * from 'FRUITS'`,
      },
      'e6411813-7f35-41f2-a583-31081d1e42d6': {
        title: 'Select all Cars',
        code: `SELECT * FROM 'CARS'`,
      },
    },
    getQuery: ({ predefinedQueryId }) => {
      const { predefinedQueries } = get();
      if (undefinedOrNull(predefinedQueryId)) {
        console.error(
          `[usePredefinedQueryStore.getQuery]Invalid 'predefinedQueryId' => ${predefinedQueryId}`
        );

        return null;
      }

      return predefinedQueries[predefinedQueryId] ?? null;
    },
  }))
);
