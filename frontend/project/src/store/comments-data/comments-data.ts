import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentsState} from '../../types/state';

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setCommentsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setComments, setCommentsLoading} = commentsData.actions;
