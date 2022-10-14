import {combineReducers} from '@reduxjs/toolkit';
import {categoriesData} from './categories-data/categories-data';
import {commentsData} from './comments-data/comments-data';
import {ticketsData} from './tickets-data/tickets-data';
import {userData} from './user-data/user-data';
import {NameSpace} from '../const';


export const rootReducer = combineReducers({
  [NameSpace.Categories]: categoriesData.reducer,
  [NameSpace.Tickets]: ticketsData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.User]: userData.reducer,
});
