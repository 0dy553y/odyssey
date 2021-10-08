import { CategoryData, CategoryListData } from '../../types/categories';

// Action names
export const SAVE_CATEGORY_LIST = 'categories/SAVE_CATEGORY_LIST';
export const SAVE_CATEGORY = 'categories/SAVE_CATEGORY';

// Action types
export interface SaveCategoryListAction {
  type: typeof SAVE_CATEGORY_LIST;
  categoryList: CategoryListData[];
}

export interface SaveCategoryAction {
  type: typeof SAVE_CATEGORY;
  category: CategoryData;
}

export type CategoryActions = SaveCategoryListAction | SaveCategoryAction;

export interface CategoriesState {
  categoryList: CategoryListData[];
  categories: Record<number, CategoryData>;
}
