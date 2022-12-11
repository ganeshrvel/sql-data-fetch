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
        title: 'Finding the Intersection',
        code: `SELECT ID FROM Customers INNER
JOIN Orders ON Customers.ID = Orders.ID;`,
      },
      'ef949378-1945-4a30-b653-b078f5201eeb': {
        title: 'Select an order',
        code: `SELECT Item FROM Orders 
WHERE id = ALL
(SELECT ID FROM Orders
WHERE quantity > 50);`,
      },
      'e6411813-7f35-41f2-a583-31081d1e42d6': {
        title: 'Create a table',
        code: `CREATE TABLE Customers (
  ID int NOT NULL,
  Name varchar(80) NOT NULL,
  PRIMARY KEY (ID)
);`,
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
