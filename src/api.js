/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const actionHandler = (payload) => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";

  const token = localStorage.getItem("portal-token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  console.log("token:", token);

  return new Promise((resolve, reject) => {
    // payload.baseURL = "https://api.escuelajs.co/api/v1";
    payload.baseURL = "https://dev.enfono.com/api_encore_backend/api/";
    // payload.baseURL = "https://fakestoreapi.com/";

    axios(payload)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("success", response);
          resolve(response);
        } else {
          console.log("failure", response);
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

axios.interceptors.response.use(undefined, function (err) {
  console.log("err");
  var statusCode = err.status;

  if (statusCode === undefined) {
    var lineSplit = err.toString().split("\n")[0].split(" ");
    statusCode = lineSplit[lineSplit.length - 1];
  }

  console.log("intercepter statuscode: ", statusCode);

  return new Promise(() => {
    if (statusCode === 401 && err.config && !err.config.__isRetryRequest) {
      localStorage.removeItem("portal-token");
    }
    throw err;
  });
});

export default {
  /* Products Url */

  // productListURl: "/shop/brand/",
  // productListURl: "products/",
  popularBrandListURl: "/shop/popular-brands/",
  brandProductsListURl: "/shop/products/{id}",
  AllBrandListURl: "/shop/brands/",
  AddToCartURL: "/shop/cart/add-list",
  cartListURl: "/shop/cart/add-list",

  actionHandler,
};
