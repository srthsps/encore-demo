import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useCart } from 'react-use-cart';
import { IoBagCheckOutline, IoClose, IoBagHandle } from 'react-icons/io5';

//internal import
import CartItem from '@component/cart/CartItem';
import LoginModal from '@component/modal/LoginModal';
import { UserContext } from '@context/UserContext';
import { SidebarContext } from '@context/SidebarContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcartList } from 'src/store/slice/CartSlice/CartListSlice';
import { useEffect } from 'react';

const Cart = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { isEmpty, items, cartTotal } = useCart();
  const { toggleCartDrawer, closeCartDrawer } = useContext(SidebarContext);



  const { AddToCartSuccess, AddToCartFetching } = useSelector((state) => state.AddToCartSlice);
  const { CartDeleteSuccess } = useSelector((state) => state.CartDeleteSlice);
  const { quantityIncrementFetching } = useSelector((state) => state.quantityIncrementSlice)
  const { quantityDecrementFetching } = useSelector((state) => state.quantityDecrementSlice)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchcartList());
  }, [AddToCartSuccess, AddToCartFetching, CartDeleteSuccess, quantityIncrementFetching, quantityDecrementFetching]);

  const { cartList } = useSelector((state) => state.cartListSlice)

  const {
    state: { userInfo },
  } = useContext(UserContext);

  const handleOpenLogin = () => {
    if (router.push('/?redirect=/checkout')) {
      toggleCartDrawer();
      setModalOpen(!modalOpen);
    }
    router.push('/Login')
  };

  const handelCheckOut = () => {
    if (userInfo) {

      router.push("/checkout")
      toggleCartDrawer();
      closeCartDrawer
    }
    else {
      setModalOpen(!modalOpen)
      toggleCartDrawer();
      closeCartDrawer
    }
  }

  const checkoutClass = (
    <button
      onClick={() => handelCheckOut()}
      className="w-full py-3 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 flex items-center justify-between bg-heading text-sm sm:text-base text-white focus:outline-none transition duration-300"
    >
      <span className="align-middle font-medium font-serif">
        Proceed To Checkout
      </span>
      <span className="rounded-lg font-bold font-serif py-2 px-3 bg-white text-cyan-600">
        ₹{cartList.sub_total}
        {/* ${cartTotal.toFixed(2)} */}
      </span>
    </button>
  );

  return (
    <>
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
        <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-indigo-50 border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
            <span className="text-xl mr-2 mb-1">
              <IoBagCheckOutline />
            </span>
            Shopping Cart
          </h2>
          <button
            onClick={closeCartDrawer}
            className="inline-flex text-base items-center justify-center text-gray-500 p-2 focus:outline-none transition-opacity hover:text-red-400"
          >
            <IoClose />
            <span className="font-sens text-sm text-gray-500 hover:text-red-400 ml-1">
              Close
            </span>
          </button>
        </div>
        <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          {cartList.results?.length <= 0 ? (
            <div className="flex flex-col h-full justify-center">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-cyan-100">
                  <span className="text-cyan-600 text-4xl block">
                    <IoBagHandle />
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-gray-700 text-lg pt-5">
                  Your cart is empty
                </h3>
                <p className="px-12 text-center text-sm text-gray-500 pt-2">
                  No items added in your cart. Please add product to your cart
                  list.
                </p>
              </div>
            </div>
          ) :

            cartList.results?.map((item, i) => (
              <CartItem key={i + 1} item={item} />
            ))}
        </div>
        <div className="mx-5 my-3">
          {items.length <= 0 ? (
            checkoutClass
          ) : (
            <span>
              {!userInfo ? (
                <div onClick={handleOpenLogin}>{checkoutClass}</div>
              ) : (
                <Link href="/checkout">
                  <a>{checkoutClass}</a>
                </Link>
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
