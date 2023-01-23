import { configureStore } from "@reduxjs/toolkit"
import popularBrandListSlice from "./slice/ProductSlice/popularBrandListSlice"
import BrandCategoryList from "./slice/ProductSlice/BrandCategoryList"
import allBrandListSlice from "./slice/ProductSlice/AllBrandlist"
import cartListSlice from "./slice/CartSlice/CartListSlice"
import AddToCartSlice from "./slice/CartSlice/AddToCartSlice"
import quantityIncrementSlice from "./slice/CartSlice/ProductIncrementSlice"
import quantityDecrementSlice from "./slice/CartSlice/ProductDecrementSlice"
import CartDeleteSlice from "./slice/CartSlice/CartDeleteSlice"
import carouselListSlice from "./slice/Carousel/carouselListSlice"
import PlaceOrderSlice from "./slice/CartSlice/PlaceOrderSlice"

export const store = configureStore({
    reducer: {
        //brands
        popularBrandListSlice,
        BrandCategoryList,
        allBrandListSlice,
        // cart
        cartListSlice,
        AddToCartSlice,
        quantityIncrementSlice,
        quantityDecrementSlice,
        CartDeleteSlice,
        //carousel
        carouselListSlice,
        // place order
        PlaceOrderSlice,
    }
})