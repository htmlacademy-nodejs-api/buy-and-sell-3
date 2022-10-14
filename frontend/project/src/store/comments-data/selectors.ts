import {createSelector} from '@reduxjs/toolkit';
import {State, CommentsState} from '../../types/state';
import {NameSpace} from '../../const';

export const getComments = createSelector(
  (state: State) => state[NameSpace.Comments],
  (state: CommentsState) => state.comments,
);
