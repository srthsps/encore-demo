import { configureStore } from "@reduxjs/toolkit"
import brandListSlice from "./slice/ProductSlice/BrandListSlice"
import BrandCategoryList from "./slice/ProductSlice/BrandCategoryList"
import allBrandListSlice from "./slice/ProductSlice/AllBrandlist"
import cartListSlice from "./slice/CartSlice/CartListSlice"

export const store = configureStore({
    reducer: {
        brandListSlice,
        BrandCategoryList,
        allBrandListSlice,
        cartListSlice,
    }
})