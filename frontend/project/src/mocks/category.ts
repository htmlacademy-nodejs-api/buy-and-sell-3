import {nanoid} from 'nanoid';
import {ID_LENGTH} from '../const';
import {Categories} from '../types/category';

export const categories: Categories = [
  {
    id: nanoid(ID_LENGTH),
    title: 'Дом',
    image: '/img/cat.jpg',
    itemsCount: 1,
  },
  {
    id: nanoid(ID_LENGTH),
    title: 'Электроника',
    image: '/img/cat02.jpg',
    itemsCount: 2,
  },
  {
    id: nanoid(ID_LENGTH),
    title: 'Одежда',
    image: '/img/cat03.jpg',
    itemsCount: 0,
  },
  {
    id: nanoid(ID_LENGTH),
    title: 'Книги',
    image: '/img/cat06.jpg',
    itemsCount: 0,
  },
  {
    id: nanoid(ID_LENGTH),
    title: 'Спорт',
    image: '/img/cat04.jpg',
    itemsCount: 0,
  },
  {
    id: nanoid(ID_LENGTH),
    title: 'Авто',
    image: '/img/cat05.jpg',
    itemsCount: 0,
  },
];
