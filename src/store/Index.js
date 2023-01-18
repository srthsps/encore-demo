import { configureStore } from "@reduxjs/toolkit"
import brandListSlice from "./slice/ProductSlice/BrandListSlice"
import BrandCategoryList from "./slice/ProductSlice/BrandCategoryList"
import allBrandListSlice from "./slice/ProductSlice/AllBrandlist"
import cartListSlice from "./slice/CartSlice/CartListSlice"
import AddToCartSlice from "./slice/CartSlice/AddToCartSlice"
import ProductQuantitySlice from "./slice/CartSlice/ProductQuantityEditSlice"

export const store = configureStore({
    reducer: {
        brandListSlice,
        BrandCategoryList,
        allBrandListSlice,
        cartListSlice,
        AddToCartSlice,
        ProductQuantitySlice,
    }
})