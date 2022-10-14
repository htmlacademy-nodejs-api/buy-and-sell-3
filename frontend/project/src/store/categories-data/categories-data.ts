import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CategoriesState} from '../../types/state';

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
};

export const categoriesData = createSlice({
  name: NameSpace.Categories,
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoriesLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setCategories, setCategoriesLoading} = categoriesData.actions;
