import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import CategoryList from '../category-list/category-list';
import TicketListMain from '../ticket-list-main/ticket-list-main';
import {TicketListTitle} from '../../const';

import {getTicketsByCategoryId} from '../../store/tickets-data/selectors';
import {getCategories, getCategoryById} from '../../store/categories-data/selectors';

function CategoryScreen() {
  const {categoryId} = useParams();

  const categories = useAppSelector(getCategories);

  const category = useAppSelector(
    (state) => getCategoryById(state, categoryId),
  );
  const tickets = useAppSelector(
    (state) => getTicketsByCategoryId(state, categoryId),
  );

  return (
    <main className="page-content">
      <CategoryList
        categories={categories}
      />
      <TicketListMain
        title={TicketListTitle.ListCategory}
        category={category}
        tickets={tickets}
      />
    </main>
  );
}

export default CategoryScreen;
