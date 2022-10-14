import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Category} from '../../types/category';

type CategoryItemProps = {
  category: Category,
}

function CategoryItem({category}: CategoryItemProps): JSX.Element {
  const {id, title, image, itemsCount} = category;

  return(
    <Link
      to={`${AppRoute.Category}/${id}`}
      className="category-tile"
    >
      <span className="category-tile__image">
        <img
          src={image}
          alt={`Иконка категории ${title}`}
        />
      </span>
      <span className="category-tile__label">
        {title}
        <span className="category-tile__qty js-qty">` {itemsCount}`</span>
      </span>
    </Link>
  );
}

export default CategoryItem;
