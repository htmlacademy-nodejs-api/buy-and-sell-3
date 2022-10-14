import {nanoid} from 'nanoid';
import {ID_LENGTH} from '../const';
import {Comments} from '../types/comment';
import {user} from './user';

export const comments: Comments = [
  {
    id: nanoid(ID_LENGTH),
    text: 'Что это за рухлядь? Стыдно такое даже фотографировать, не то, что продавать.',
    user,
  },
  {
    id: nanoid(ID_LENGTH),
    text: 'А можете доставить мне домой? Готов доплатить 300 сверху. Живу в центре прямо рядом с Моховой улицей. Готов купить прямо сейчас.',
    user,
  },
];
