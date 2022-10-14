import {useState, useEffect} from 'react';
import {useAppSelector} from '.';
import {isAuthorization} from '../util';
import {AuthorizationStatus} from '../const';
import {User} from '../types/user';

import {getUser} from '../store/user-data/selectors';

const initialLocalUser = {id: '', name: '', surname: '', avatar: '', email: ''};

export const useUserData = (authorizationStatus: AuthorizationStatus): User => {
  const [localUser, setLocalUser] = useState<User>(initialLocalUser);

  const user = useAppSelector(getUser);

  useEffect(() => {
    if (isAuthorization(authorizationStatus) && user) {
      const {id, name, surname, avatar, email} = user;
      setLocalUser({id, name, surname, avatar, email});
    } else {
      setLocalUser(initialLocalUser);
    }
  }, [authorizationStatus, user, setLocalUser]);

  return localUser;
};
