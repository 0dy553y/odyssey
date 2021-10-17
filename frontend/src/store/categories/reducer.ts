import produce from 'immer';
import {
  CategoriesState,
  CategoryActions,
  SAVE_CATEGORY,
  SAVE_CATEGORY_LIST,
} from './types';

const initialState: CategoriesState = {
  categoryList: [],
  categories: {},
};

const categoriesReducer = produce(
  (draft: CategoriesState, action: CategoryActions) => {
    switch (action.type) {
      case SAVE_CATEGORY_LIST: {
        draft.categoryList = action.categoryList;
        break;
      }
      case SAVE_CATEGORY: {
        draft.categories[action.category.id] = action.category;
        break;
      }
    }
  },
  initialState
);

export default categoriesReducer;
