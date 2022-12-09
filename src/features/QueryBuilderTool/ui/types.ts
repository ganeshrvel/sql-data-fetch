export type SavedQueries = {
  [key in string]: QueryEntity;
};
export type PredefinedQueries = {
  readonly [key in string]: QueryEntity;
};
export interface QueryEntity {
  title: string;
  code: string;
}
