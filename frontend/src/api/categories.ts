import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { CategoryData, CategoryListData } from '../types/categories';

class CategoriesAPI extends BaseAPI {
  protected static getCategoriesUrl(): string {
    return 'categories';
  }

  public getCategoryList(): ApiPromise<CategoryListData[]> {
    return this.get(CategoriesAPI.getCategoriesUrl());
  }

  public getCategory(categoryId: number): ApiPromise<CategoryData> {
    return this.get(`${CategoriesAPI.getCategoriesUrl()}/${categoryId}`);
  }
}

export default CategoriesAPI;
