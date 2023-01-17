import { configureStore } from "@reduxjs/toolkit"
import brandListSlice from "./slice/ProductSlice/BrandListSlice"
import BrandCategoryList from "./slice/ProductSlice/BrandCategoryList"

export const store = configureStore({
    reducer: {
        brandListSlice,
        BrandCategoryList,
    }
})