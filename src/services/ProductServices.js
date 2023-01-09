import requests from './httpServices';
import { products } from './products';

const ProductServices = {
  getShowingProducts() {
    return products;
  },

  getDiscountedProducts() {
    return products.filter((p) => p.discount >= 5);
  },

  getProductBySlug(slug) {
    return products.find((p) => p.slug === slug);
  },
};

export default ProductServices;
