import requests from './httpServices';
import category from './category';

const CategoryServices = {
  getShowingCategory() {
    return category.filter((c) => c.status === 'Show');
  },
};

export default CategoryServices;
