import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { CategoryData, CategoryListData } from '../../types/categories';
import { saveCategory, saveCategoryList } from './actions';

export function loadAllCategories(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.categories.getCategoryList();
    const categories: CategoryListData[] = response.payload.data;
    dispatch(saveCategoryList(categories));
  };
}

export function loadCategory(categoryId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.categories.getCategory(categoryId);
    const category: CategoryData = response.payload.data;
    dispatch(saveCategory(category));
  };
}
