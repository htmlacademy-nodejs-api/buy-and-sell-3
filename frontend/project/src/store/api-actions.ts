import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute, AuthorizationStatus, HTTP_CODE} from '../const';
import {AppDispatch, State} from '../types/state';
import {TicketCreate, TicketEdit} from '../types/ticket';
import {Auth, Signup} from '../types/user';
import {CommentPost} from '../types/comment';
import {setCategories, setCategoriesLoading} from './categories-data/categories-data';
import {setTickets, setTicketsNew, setTicketsDiscussed, setTicketsLoading} from './tickets-data/tickets-data';
import {setComments, setCommentsLoading} from './comments-data/comments-data';
import {setAuthorizationStatus, setUser} from './user-data/user-data';
import {redirectToRoute} from './action';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handler';
import {
  adaptCategoriesToClient,
  adaptCommentsToClient,
  adaptOffersToClient,
  adaptUserToClient
} from '../utils/adapters/adaptersToClient';
import {
  adaptEditTicketToServer,
  adaptCreateTicketToServer,
  adaptSignupToServer,
  adaptCreateCommentToServer,
  adaptAvatarToServer,
  adaptImageToServer
} from '../utils/adapters/adaptersToServer';

import CategoryDto from '../dto/category/category.dto';
import OfferDto from '../dto/offer/offer.dto';
import CommentDto from '../dto/comment/comment.dto';
import UserWithTokenDto from '../dto/user/user-with-token.dto';
import UserDto from '../dto/user/user.dto';
import CreateUserWithIdDto from '../dto/user/create-user-with-id.dto';
import UpdateOfferDto from '../dto/offer/update-offer.dto';
import CreateOfferDto from '../dto/offer/create-offer.dto';

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
      const {data} = await api.get<CategoryDto[]>(APIRoute.Categories);

      dispatch(setCategoriesLoading(true));
      dispatch(setCategories(adaptCategoriesToClient(data)));
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
      const {data} = await api.get<OfferDto[]>(APIRoute.Tickets);

      dispatch(setTicketsLoading(true));
      dispatch(setTickets(adaptOffersToClient(data)));
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
      const {data} = await api.get<OfferDto[]>(APIRoute.TicketsNew);

      dispatch(setTicketsLoading(true));
      dispatch(setTicketsNew(adaptOffersToClient(data)));
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
      const {data} = await api.get<OfferDto[]>(APIRoute.TicketsDiscussed);

      dispatch(setTicketsLoading(true));
      dispatch(setTicketsDiscussed(adaptOffersToClient(data)));
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

      const {data} = await api.get<CommentDto[]>(GetCommentApiRoute);

      dispatch(setCommentsLoading(true));
      dispatch(setComments(adaptCommentsToClient(data)));
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
      const {data} = await api.get<UserDto>(APIRoute.Login);

      dispatch(setUser(adaptUserToClient(data)));
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
      const postData = await api.post<CreateUserWithIdDto>(APIRoute.Registration, adaptSignupToServer(userData));

      if (postData.status === HTTP_CODE.CREATED) {
        const postAvatarApiRoute = `${APIRoute.Users}/${postData.data.id}/avatar`;

        await api.post(postAvatarApiRoute, adaptAvatarToServer(userData.avatar), {
          headers: {'Content-Type': 'multipart/form-data'},
        });
      }

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
      const {data} = await api.post<UserWithTokenDto>(APIRoute.Login, userData);

      if (data.token) {
        saveToken(data.token);
      }

      dispatch(setUser(adaptUserToClient(data)));
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
  TicketEdit,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }
>(
  'data/editTicket',
  async (ticketData, {dispatch, extra: api}) => {
    try {
      const postData = await api.patch<UpdateOfferDto>(`${APIRoute.Tickets}/${ticketData.id}`, adaptEditTicketToServer(ticketData));

      if (postData.status === HTTP_CODE.OK && ticketData.imageStatus) {
        const postImageApiRoute = `${APIRoute.Tickets}/${ticketData.id}/image`;

        await api.post(postImageApiRoute, adaptImageToServer(ticketData.image), {
          headers: {'Content-Type': 'multipart/form-data'},
        });
      }

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
      const postData = await api.post<OfferDto>(APIRoute.Tickets, adaptCreateTicketToServer(ticketData));

      if (postData.status === HTTP_CODE.CREATED && ticketData.imageStatus) {
        const postImageApiRoute = `${APIRoute.Tickets}/${postData.data.id}/image`;

        await api.post(postImageApiRoute, adaptImageToServer(ticketData.image), {
          headers: {'Content-Type': 'multipart/form-data'},
        });
      }

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
      await api.delete<OfferDto>(`${APIRoute.Tickets}/${ticketId}`);
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
      await api.post<CreateOfferDto>(APIRoute.Comments, adaptCreateCommentToServer(commentData));
      dispatch(fetchCommentsAction(commentData.ticketId));
    } catch (error) {
      errorHandle(error);
    }
  },
);
