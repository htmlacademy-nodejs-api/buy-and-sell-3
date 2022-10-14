import {PropsWithChildren, ReactNode, useState} from 'react';
import {UserContext} from './user';
import {User} from '../types/user';

function UserProvider(props: PropsWithChildren<ReactNode>): JSX.Element {
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    avatar: '',
    email: '',
  });

  const state = {
    user,
    updateUser:  (userData: User) => setUser(userData),
  };

  return <UserContext.Provider value={state} {...props} />;
}

export default UserProvider;
