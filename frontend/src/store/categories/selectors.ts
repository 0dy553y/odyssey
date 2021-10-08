import { RootState } from '../index';
import { CategoriesState } from './types';
import { CategoryData, CategoryListData } from '../../types/categories';

function getLocalState(state: RootState): CategoriesState {
  return state.categories;
}

export function getCategoryList(state: RootState): CategoryListData[] {
  return getLocalState(state).categoryList;
}

export function getCategory(
  state: RootState,
  categoryId: number
): CategoryData {
  return getLocalState(state).categories[categoryId];
}
