import {nanoid} from 'nanoid';
import {ID_LENGTH} from '../const';
import {User} from '../types/user';

export const user: User = {
  id: nanoid(ID_LENGTH),
  name: 'Oliver',
  surname: 'Conner',
  email: 'Oliver.conner@gmail.com',
  avatar: '/img/avatar.jpg',
};
