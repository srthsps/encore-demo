import React, { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoChevronBackOutline, IoChevronForward } from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//internal import
import useAsync from '@hooks/useAsync';
import CategoryServices from '@services/CategoryServices';
import { SidebarContext } from '@context/SidebarContext';
import category from '@services/category';
import { fetchAllBrandList } from 'src/store/slice/ProductSlice/AllBrandlist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandCategoryProducts } from 'src/store/slice/ProductSlice/BrandCategoryList';

const CategoryCarousel = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  // const { data, error } = useAsync(() => CategoryServices.getShowingCategory());
  const error = ''
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllBrandList())
  }, [])

  const { allBrandList } = useSelector((state) => state.allBrandListSlice)

  const data = allBrandList;

  const handleCategoryClick = (id) => {
    dispatch(fetchBrandCategoryProducts({ brandID: id }))
    router.push(
      `/search?${id}`
    );
    setIsLoading(!isLoading);
  };

  return (
    <>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={8}
        navigation={true}
        allowTouchMove={true}
        loop={true}
        breakpoints={{
          // when window width is >= 640px
          375: {
            width: 375,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          414: {
            width: 414,
            slidesPerView: 3,
          },
          // when window width is >= 768px
          660: {
            width: 660,
            slidesPerView: 4,
          },

          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 6,
          },

          // when window width is >= 768px
          991: {
            width: 991,
            slidesPerView: 8,
          },

          // when window width is >= 768px
          1140: {
            width: 1140,
            slidesPerView: 9,
          },
          1680: {
            width: 1680,
            slidesPerView: 10,
          },
          1920: {
            width: 1920,
            slidesPerView: 10,
          },
        }}
        modules={[Navigation]}
        className="mySwiper category-slider my-10"
      >
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : (
          <div>
            {data?.map((category, i) => (
              <SwiperSlide key={i + 1} className="group">
                <div
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-center cursor-pointer p-3 bg-white rounded-lg flex flex-col justify-center"
                >
                  {/* <div className="bg-white p-2 mx-auto w-50 h-50  shadow-md"> */}
                  <img
                    src={category.logo}
                    alt={category.brand_name}
                    width={50}
                    height={50}
                  />
                  {/* </div> */}

                  <p className="text-xs text-gray-600 mt-2 font-serif group-hover:text-emerald-500">
                    {category.brand_name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        )}
        <button ref={prevRef} className="prev">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next">
          <IoChevronForward />
        </button>
      </Swiper>
    </>
  );
};

export default React.memo(CategoryCarousel);
