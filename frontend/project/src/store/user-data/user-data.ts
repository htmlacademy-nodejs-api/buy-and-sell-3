import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserState} from '../../types/state';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToDefault: (state) => {
      state = initialState;
    },
  },
});

export const {setAuthorizationStatus, setUser, setToDefault} = userData.actions;
