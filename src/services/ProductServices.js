import requests from './httpServices';
// import { products } from './products';

const ProductServices = {
  getShowingProducts() {
    // return products;
    return []
  },

  getDiscountedProducts() {
    // return products.filter((p) => p.discount >= 5);
    return []
  },

  getProductBySlug(slug) {
    // return products.find((p) => p.slug === slug);
    return []

  },
};

export default ProductServices;
