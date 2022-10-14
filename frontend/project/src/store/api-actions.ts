import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {AppDispatch, State} from '../types/state';
import {Categories} from '../types/category';
import {Ticket, Tickets, TicketCreate} from '../types/ticket';
import {CommentPost, Comments, Comment} from '../types/comment';
import {Auth, Signup, User} from '../types/user';
import {setCategories, setCategoriesLoading} from './categories-data/categories-data';
import {setTickets, setTicketsNew, setTicketsDiscussed, setTicketsLoading} from './tickets-data/tickets-data';
import {setComments, setCommentsLoading} from './comments-data/comments-data';
import {setAuthorizationStatus, setUser} from './user-data/user-data';
import {redirectToRoute} from './action';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handler';

export const fetchCategoriesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchCategories',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Categories>(APIRoute.Categories);

      dispatch(setCategoriesLoading(true));
      dispatch(setCategories(data));
      dispatch(setCategoriesLoading(false));
    } catch (error) {
      dispatch(setCategoriesLoading(false));
      errorHandle(error);
    }
  },
);

export const fetchTicketsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchTickets',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Tickets>(APIRoute.Tickets);

      dispatch(setTicketsLoading(true));
      dispatch(setTickets(data));
      dispatch(setTicketsLoading(false));
    } catch (error) {
      dispatch(setTicketsLoading(false));
      errorHandle(error);
    }
  },
);

export const fetchTicketsNewAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchTicketsNew',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Tickets>(APIRoute.TicketsNew);

      dispatch(setTicketsLoading(true));
      dispatch(setTicketsNew(data));
      dispatch(setTicketsLoading(false));
    } catch (error) {
      dispatch(setTicketsLoading(false));
      errorHandle(error);
    }
  },
);

export const fetchTicketsDiscussedAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchTicketsDiscussed',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Tickets>(APIRoute.TicketsDiscussed);

      dispatch(setTicketsLoading(true));
      dispatch(setTicketsDiscussed(data));
      dispatch(setTicketsLoading(false));
    } catch (error) {
      dispatch(setTicketsLoading(false));
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/fetchComments',
  async (ticketId, {dispatch, extra: api}) => {
    try {
      const GetCommentApiRoute = `${APIRoute.Tickets}/${ticketId}/comments`;

      const {data} = await api.get<Comments>(GetCommentApiRoute);

      dispatch(setCommentsLoading(true));
      dispatch(setComments(data));
      dispatch(setCommentsLoading(false));
    } catch (error) {
      dispatch(setCommentsLoading(false));
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);

      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      errorHandle(error);
    }
  },
);

export const registrationUserAction = createAsyncThunk<
  void,
  Signup, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/registerationUser',
  async (userData, {dispatch, extra: api}) => {
    try {
      await api.post<User>(APIRoute.Registration, userData);
      dispatch(redirectToRoute(AppRoute.Login));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loginUserAction = createAsyncThunk<
  void,
  Auth,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/loginUser',
  async (userData, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<User>(APIRoute.Login, userData);

      if (data.token) {
        saveToken(data.token);
      }

      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutUserAction = createAsyncThunk<
  void,
  undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'user/logoutUser',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);

      dropToken();

      dispatch(setUser(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const editTicketAction = createAsyncThunk<
  void,
  Ticket,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/editTicket',
  async (ticketData, {dispatch, extra: api}) => {
    try {
      await api.patch<Ticket>(`${APIRoute.Tickets}/${ticketData.id}`, ticketData);
      await dispatch(fetchTicketsAction());
      await dispatch(fetchCategoriesAction());
      dispatch(redirectToRoute(`${AppRoute.Ticket}/${ticketData.id}`));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const createTicketAction = createAsyncThunk<
  void,
  TicketCreate,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/createTicket',
  async (ticketData, {dispatch, extra: api}) => {
    try {
      await api.post<Ticket>(APIRoute.Tickets, ticketData);
      await dispatch(fetchTicketsAction());
      await dispatch(fetchCategoriesAction());
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const removeTicketAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/removeTicket',
  async (ticketId, {dispatch, extra: api}) => {
    try {
      await api.delete<Ticket>(`${APIRoute.Tickets}/${ticketId}`);
      await dispatch(fetchTicketsAction());
      await dispatch(fetchCategoriesAction());
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const createCommentAction = createAsyncThunk<
  void,
  CommentPost,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/editTicket',
  async (commentData, {dispatch, extra: api}) => {
    try {
      await api.post<Comment>(APIRoute.Comments, commentData);
      dispatch(fetchCommentsAction(commentData.ticketId));
    } catch (error) {
      errorHandle(error);
    }
  },
);
