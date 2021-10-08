import produce from 'immer';
import {
  CategoriesState,
  CategoryActions,
  SAVE_CATEGORY,
  SAVE_CATEGORY_LIST,
} from './types';
import { CategoryData } from '../../types/categories';

const initialState: CategoriesState = {
  categoryList: [],
  categories: {},
};

const categoriesReducer = produce(
  (draft: CategoriesState, action: CategoryActions) => {
    switch (action.type) {
      case SAVE_CATEGORY_LIST: {
        draft.categoryList = action.categoryList;
        action.categoryList.forEach(
          (category: CategoryData) => (draft.categories[category.id] = category)
        );
        break;
      }
      case SAVE_CATEGORY: {
        if (!draft.categoryList.includes(action.category)) {
          draft.categoryList.push(action.category);
        }
        draft.categories[action.category.id] = action.category;
        break;
      }
    }
  },
  initialState
);

export default categoriesReducer;
