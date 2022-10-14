import CategoryItem from '../category-item/category-item';
import {Categories} from '../../types/category';

type CategoryListProps = {
  categories: Categories,
}

function CategoryList({categories}: CategoryListProps): JSX.Element {
  return (
    <section className="categories-list">
      <ul className="categories-list__wrapper">
        {
          categories
            .map((category, index) => {
              const keyValue = `${index}-${category.id}`;
              return (
                <li
                  className="categories-list__item"
                  key={keyValue}
                >
                  <CategoryItem category={category} />
                </li>
              );
            })
        }
      </ul>
    </section>
  );
}

export default CategoryList;
