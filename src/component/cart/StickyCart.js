import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { useCart } from 'react-use-cart';

//internal import
import { SidebarContext } from '@context/SidebarContext';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchcartList } from 'src/store/slice/CartSlice/CartListSlice';

const StickyCart = () => {
  const { AddToCartSuccess, AddToCartFetching } = useSelector((state) => state.AddToCartSlice)
  const { CartDeleteFetching } = useSelector((state) => state.CartDeleteSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchcartList())
  }, [AddToCartSuccess, AddToCartFetching,CartDeleteFetching])

  const { cartList,cartItems } = useSelector((state) => state.cartListSlice)

  const { totalItems, cartTotal } = useCart();
  const { toggleCartDrawer } = useContext(SidebarContext);

  return (
    <button aria-label="Cart" onClick={toggleCartDrawer} className="absolute">
      <div className="right-0 w-35 float-right fixed top-2/4 bottom-2/4 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
        <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-tl-lg p-2 text-gray-700">
          <span className="text-2xl mb-1 text-cyan-600">
            <IoBagHandleOutline />
          </span>
          <span className="px-2 text-sm font-serif font-medium">
            {cartList.count} Items
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-cyan-700 p-2 text-white text-base font-serif font-medium rounded-bl-lg mx-auto">
        ₹{cartList.sub_total}
        </div>
      </div>
    </button>
  );
};

export default dynamic(() => Promise.resolve(StickyCart), { ssr: false });
