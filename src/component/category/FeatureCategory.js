import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoChevronForwardSharp } from 'react-icons/io5';

//internal import
import useAsync from '@hooks/useAsync';
import CategoryServices from '@services/CategoryServices';
import category from '@services/category';
import { fetchbrandList } from 'src/store/slice/ProductSlice/BrandListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBrandCategoryProducts } from 'src/store/slice/ProductSlice/BrandCategoryList';

const FeatureCategory = () => {
  const router = useRouter();
  // const { data, error } = useAsync(() => CategoryServices.getShowingCategory());

  const dispatch = useDispatch()

  const handleProductID = (id) => {
    dispatch(fetchBrandCategoryProducts({ brandID : id }))
    router.push(`search?/${id}`)
  }
  
  useEffect(() => {
    dispatch(fetchbrandList())
  }, [])

  const {brandList} = useSelector((state)=>state.brandListSlice)

  const error = ''
  const data = brandList;


  return (
    <>
      {error ? (
        <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
          <span> {error}</span>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {data?.map((category, i) => (
            <li className="group" key={i}>
              <div
                onClick={() =>
                  handleProductID(category.id)
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
                    <h3 className="text-sm text-gray-600 font-serif font-medium leading-tight line-clamp-1 group-hover:text-emerald-500">
                      {category.name}
                    </h3>

                    {/* <ul className="pt-1 mt-1">
                      {category.children.slice(0, 3).map((children) => (
                        <li key={children} className="pt-1">
                          <Link
                            href={`/search?category=${children
                              .toLowerCase()
                              .replace('&', '')
                              .split(' ')
                              .join('-')}`}
                          >
                            <a className="flex items-center font-serif text-xs text-gray-400 hover:text-emerald-600 cursor-pointer">
                              <span className="text-xs text-gray-400 hover:text-emerald-600">
                                <IoChevronForwardSharp />
                              </span>
                              {children}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul> */}
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

export default FeatureCategory;
