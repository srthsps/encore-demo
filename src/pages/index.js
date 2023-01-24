import useSessionstorage from '@rooks/use-sessionstorage';
import { SidebarContext } from '@context/SidebarContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

//internal import

import Layout from '@layout/Layout';
import StickyCart from '@component/cart/StickyCart';
import ProductServices from '@services/ProductServices';
import MainCarousel from '@component/carousel/MainCarousel';
import Loading from '@component/preloader/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchpopularpopularBrand } from 'src/store/slice/ProductSlice/popularBrandListSlice';
import PopularBrand from '@component/Brands/PopularBrand';
import AllBrands from '@component/Brands/AllBrands';
import { fetchAllBrandList } from 'src/store/slice/ProductSlice/AllBrandlist';


const Home = ({ products, popularProducts, discountProducts }) => {
  const router = useRouter();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchpopularpopularBrand())
    dispatch(fetchAllBrandList())
  }, [])

  // const { brandList } = useSelector((state) => state.brandListSlice)

  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [value, set] = useSessionstorage('products', products);

  useEffect(() => {
    if (router.asPath === '/') {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <div className="min-h-screen">
            <StickyCart />
            <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
                <div className="flex w-full">
                  <div className="flex-shrink-0 xl:pr-6 lg:block w-full">
                    <MainCarousel />
                  </div>
                  {/* <div className="w-full hidden lg:flex">
                    <OfferCard />
                  </div> */}
                </div>
                {/* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                  <Banner />
                </div> */}
              </div>
            </div>

            {/* Popular brands's */}
            <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      Popular Brands
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      Choose your necessary products from this Popular
                      Brands.
                    </p>
                  </div>
                </div>
                <PopularBrand />
              </div>
            </div>

            {/* All brands */}

            <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      Other  Brands
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      Choose your necessary products from this Brands.
                    </p>
                  </div>
                </div>
                <AllBrands />
              </div>
            </div>

            {/* other brands */}
            {/* <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    Popular Products for Daily Shopping
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See all our popular products in this week. You can choose
                    your daily needs products from this list and get some
                    special offer with free shipping.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {brandList?.map((product) => (
                      <OtherBrandList key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div> */}

            {/* promotional banner card */}
            {/* <div className="block mx-auto max-w-screen-2xl">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border rounded-lg">
                  <CardTwo />
                </div>
              </div>
            </div>  */}

            {/* discounted products */}
            {/* <div
              id="discount"
              className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
            >
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    Latest Discounted Products
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See Our latest discounted products below. Choose your daily
                    needs from here and get a special discount with free
                    shipping.
                  </p>
                </div>
              </div> */}
            {/* <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {/* {productsList?.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))} */}
            {/* </div>
                </div>
              </div>
            </div>  */}
          </div>
        </Layout>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const products = await ProductServices.getShowingProducts();

  const popularProducts = products.filter((p) => p.discount === 0);
  const discountProducts = products.filter((p) => p.discount >= 5);

  return {
    props: {
      products: products,
      discountProducts: discountProducts,
      popularProducts: popularProducts.slice(0, 50),
    },
    revalidate: 60,
  };
};

// export const getServerSideProps = async () => {
//   const products = await ProductServices.getShowingProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Home;
