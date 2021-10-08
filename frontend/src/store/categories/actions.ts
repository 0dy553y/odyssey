import { CategoryData, CategoryListData } from '../../types/categories';
import {
  SAVE_CATEGORY,
  SAVE_CATEGORY_LIST,
  SaveCategoryAction,
  SaveCategoryListAction,
} from './types';

export function saveCategoryList(
  categoryList: CategoryListData[]
): SaveCategoryListAction {
  return {
    type: SAVE_CATEGORY_LIST,
    categoryList,
  };
}

export function saveCategory(category: CategoryData): SaveCategoryAction {
  return {
    type: SAVE_CATEGORY,
    category,
  };
}
