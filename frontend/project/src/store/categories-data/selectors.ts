import {createSelector} from '@reduxjs/toolkit';
import {State, CategoriesState} from '../../types/state';
import {NameSpace} from '../../const';

export const getCategoryById = createSelector(
  [
    (state: State) => state[NameSpace.Categories],
    (_state: State, categoryId: string | undefined) => categoryId,
  ],
  (state: CategoriesState, categoryId: string | undefined) =>
    (categoryId)
      ? state.categories.find((category) => category.id === categoryId)
      : state.categories[0],
);

export const getCategories = createSelector(
  (state: State) => state[NameSpace.Categories],
  (state: CategoriesState) => state.categories,
);

export const getCategoriesStatus = createSelector(
  (state: State) => state[NameSpace.Categories],
  (state: CategoriesState) => state.isLoading,
);
