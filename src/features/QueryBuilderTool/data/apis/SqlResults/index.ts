import { ApiResponse } from '../../../../services/apis/ApiResponse';
import { randomInteger } from '../../../../../helpers';

export type SqlResponse = {
  [key in string]: any;
};

export class SqlRemoteData {
  static shared: SqlRemoteData = new SqlRemoteData();

  async fetchDummyData(): Promise<ApiResponse<SqlResponse[]>> {
    const limit = randomInteger(10, 100);
    const skip = randomInteger(10, 50);

    return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        return ApiResponse.data<SqlResponse[]>(res.products);
      })
      .catch((e) => {
        console.error(`[SqlResults.fetchDummyData] Error occured: `, e);

        return ApiResponse.error<SqlResponse[]>(e);
      });
  }
}
