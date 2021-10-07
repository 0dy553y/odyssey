import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { CategoryData } from '../types/categories';

class CategoriesAPI extends BaseAPI {
  protected static getCategoriesUrl(): string {
    return 'categories';
  }

  public getCategoriesList(): ApiPromise<CategoryData[]> {
    return this.get(CategoriesAPI.getCategoriesUrl());
  }

  public getCategory(categoryId: number): ApiPromise<CategoryData> {
    return this.get(`${CategoriesAPI.getCategoriesUrl()}/${categoryId}`);
  }
}

export default CategoriesAPI;
