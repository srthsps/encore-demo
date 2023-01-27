/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const actionHandler = (payload) => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";

  const token = localStorage.getItem("portal-token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }


  return new Promise((resolve, reject) => {

    payload.baseURL = "https://dev.enfono.com/api_encore_backend/api/";


    axios(payload)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

axios.interceptors.response.use(undefined, function (err) {
  var statusCode = err.status;

  if (statusCode === undefined) {
    var lineSplit = err.toString().split("\n")[0].split(" ");
    statusCode = lineSplit[lineSplit.length - 1];
  }


  return new Promise(() => {
    if (statusCode === 401 && err.config && !err.config.__isRetryRequest) {
      localStorage.removeItem("portal-token");
    }
    throw err;
  });
});

export default {


  // Brand
  popularBrandListURl: "shop/popular-brands/",
  brandProductsListURl: "shop/products/{id}",
  AllBrandListURl: "shop/brands/",

  // cart
  AddToCartURL: "shop/cart/add",
  cartListURl: "shop/cart/list",
  cartDeleteURl: "shop/cart/{id}",
  quantityIncrementURL: "shop/cart/{id}",
  quantityDecrementURL: "/shop/cart/remove/{id}",

  // Carousel
  carouselListURL: "shop/carousels/",

  // checkout
  placeOrderURL: "shop/order/",

  actionHandler,
};
