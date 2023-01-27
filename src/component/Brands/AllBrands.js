import React from "react";
import { useRouter } from "next/router";

//internal import
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBrandCategoryProducts } from "src/store/slice/ProductSlice/BrandCategoryList";
import { fetchAllBrandList } from "src/store/slice/ProductSlice/AllBrandlist";

const AllBrands = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBrandList());
  }, []);

    const { allBrandList } = useSelector((state) => state.allBrandListSlice);
    

  const handleCategoryClick = (id) => {
    dispatch(fetchBrandCategoryProducts({ brandID: id }));
    router.push(`/search?${id}`);
    // setIsLoading(!isLoading);
  };

  const error = "";

  return (
    <>
      {error ? (
        <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
          <span> {error}</span>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {allBrandList?.map((category, i) => (
            <li className="group" key={i}>
              <div
                onClick={
                  () => handleCategoryClick(category.id)
                  // router.push(
                  //   `/search?Category=${category.id}`
                  // )
                }
                className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-4 cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg"
              >
                <div className="flex flex-col place-items-center place-content-center ">
                  <div>
                    <img
                      src={category.logo}
                      alt={category.brand_name}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="">
                    <h3 className="text-sm text-gray-600 font-serif font-medium leading-tight line-clamp-1 group-hover:text-cyan-500">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AllBrands;
