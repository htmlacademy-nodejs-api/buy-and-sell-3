import {createSelector} from '@reduxjs/toolkit';
import {State, UserState} from '../../types/state';
import {NameSpace} from '../../const';

export const getAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.authorizationStatus,
);

export const getUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.user,
);
