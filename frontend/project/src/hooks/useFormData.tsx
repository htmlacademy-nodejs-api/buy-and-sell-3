import {Reducer, useReducer} from 'react';
import {FormAction, FormActionType} from '../types/form';

function formReducer<T>(state: T, action: FormAction): T {
  const {type, payload} = action;
  switch (type) {
    case FormActionType.setTitle:
      return {
        ...state,
        title: payload,
      };
    case FormActionType.setDescription:
      return {
        ...state,
        description: payload,
      };
    case FormActionType.setImage:
      return {
        ...state,
        image: payload,
      };
    case FormActionType.setImageStatus:
      return {
        ...state,
        imageStatus: payload,
      };
    case FormActionType.setAvatar:
      return {
        ...state,
        avatar: payload,
      };
    case FormActionType.setType:
      return {
        ...state,
        type: payload,
      };
    case FormActionType.setCategories:
      return {
        ...state,
        categories: payload,
      };
    case FormActionType.setPrice:
      return {
        ...state,
        price: payload,
      };
    case FormActionType.setEmail:
      return {
        ...state,
        email: payload,
      };
    case FormActionType.setPassword:
      return {
        ...state,
        password: payload,
      };
    case FormActionType.setName:
      return {
        ...state,
        name: payload,
      };
    case FormActionType.setSurname:
      return {
        ...state,
        surname: payload,
      };
    case FormActionType.setCommentText:
      return {
        ...state,
        text: payload,
      };
    case FormActionType.setTicketId:
      return {
        ...state,
        ticketId: payload,
      };
    default:
      return state;
  }
}

export function useFormData<Y>(initialState: Y) {
  const [formState, formDispatch] = useReducer<Reducer<Y, FormAction>>(
    formReducer,
    initialState,
  );

  return {formState, formDispatch};
}
