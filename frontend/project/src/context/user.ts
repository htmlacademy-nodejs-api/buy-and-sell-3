import {createContext} from 'react';
import {User} from '../types/user';

type UserContextType = {
  user: {
    name: string,
    surname: string,
    avatar: string,
    email: string,
  };
  updateUser: (userData: User) => void;
}

const userContext: UserContextType = {
  user: {
    name: '',
    surname: '',
    avatar: '',
    email: '',
  },
  updateUser: () => { /* empty function */ },
};

export const UserContext = createContext<UserContextType>(userContext);
