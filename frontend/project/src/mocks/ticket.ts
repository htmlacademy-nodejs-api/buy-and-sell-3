import {nanoid} from 'nanoid';
import {getRandomDateToISOString} from '../util';
import {ID_LENGTH} from '../const';
import {Tickets} from '../types/ticket';
import {user} from './user';
import {categories} from './category';

export const tickets: Tickets = [
  {
    id: nanoid(ID_LENGTH),
    title: 'Фотокамера',
    description: 'Использование камеры в своей жизни подарит вам разнообразный и богатый опыт восприятия мира, позволит занять важную роль в компании друзей и возможно создаст для вас перспективу смены своей профессии.',
    publishedDate: getRandomDateToISOString(),
    image: '/img/item08.jpg',
    type: 'Продам',
    commentsCount: 2,
    user,
    categories: [
      categories[1],
    ],
    price: 2000,
  },
  {
    id: nanoid(ID_LENGTH),
    title: 'Кофеварка',
    description: 'Маленькая кастрюля для вашего настроения. Разные формы, материал и опыт использования.',
    publishedDate: getRandomDateToISOString(),
    image: '/img/item04.jpg',
    type: 'Продам',
    commentsCount: 1,
    user,
    categories: [
      categories[0],
      categories[1],
    ],
    price: 1000,
  },
];
