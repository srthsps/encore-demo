import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { IoBagAddSharp, IoAdd, IoRemove } from 'react-icons/io5';

import Price from '@component/common/Price';
import Discount from '@component/common/Discount';
import ProductModal from '@component/modal/ProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddToCart } from 'src/store/slice/CartSlice/AddToCartSlice';
import { fetchcartList } from 'src/store/slice/CartSlice/CartListSlice';
import { notifyError, notifySuccess } from '@utils/toast';

const ProductCard = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const { items, addItem, updateItemQuantity, inCart } = useCart();

  const { AddToCartSuccess, AddToCartFetching } = useSelector((state) => state.AddToCartSlice)
  const dispatch = useDispatch()
  console.log("kb", AddToCartFetching);

  useEffect(() => {
    dispatch(fetchcartList())
  }, [AddToCartSuccess, AddToCartFetching])


  // const handleAddItem = (p) => {
  //   console.log("id:::", p.id)
  //   const newItem = {
  //     ...p,
  //     id: p.id,
  //   };
  //   addItem(newItem);
  // };

  const diaptach = useDispatch()

  const handleAddItem = (id) => {
    const productID = {
      product: id
    }

    diaptach(fetchAddToCart({ payload: productID }))
    if (!product.out_of_stock) {

      notifySuccess("Product added your Cart.")
    }
    else {
      notifyError("Product is out of Stock.")

    }
  }

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />

      <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative">
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="relative flex justify-center w-full cursor-pointer"
        >
          {product.quantity <= 0 && (
            <span className="absolute inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 border-0 rounded-full text-xs font-semibold font-serif z-10 left-4 top-4">
              Stock Out
            </span>
          )}
          <Discount product={product} />

          <img
            src={product.image}
            width={160}
            height={80}
            alt={product.brand_name}
            className="object-cover p-4 transition duration-150 ease-linear transform group-hover:scale-105"
          />
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">{product.brand}</span>
            </h2>
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              <p>
                Product Code: {product.product_code}
              </p>

            </span>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price product={product} card={true} />
            <button
              onClick={() => handleAddItem(product.id)}
              disabled={product.quantity < 1}
              aria-label="cart"
              className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-cyan-500 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white transition-all"
            >
              {' '}
              <span className="text-xl">
                <IoBagAddSharp />
              </span>{' '}
            </button>
            {/* {cartList?.results? (
              <div>
                {cartList?.results?.map(
                  (item) =>
                    item.id === product.id && (
                      <div
                        key={item.id}
                        className="h-9 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 bg-cyan-500 text-white rounded"
                      >
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <span className="text-dark text-base">
                            <IoRemove />
                          </span>
                        </button>
                        <p className="text-sm text-dark px-1 font-serif font-semibold">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          disabled={product.quantity === item.quantity}
                        >
                          <span className="text-dark text-base">
                            <IoAdd />
                          </span>
                        </button>
                      </div>
                    )
                )}{' '}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product.id)}
                disabled={product.quantity < 1}
                aria-label="cart"
                className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-cyan-500 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white transition-all"
              >
                {' '}
                <span className="text-xl">
                  <IoBagAddSharp />
                </span>{' '}
              </button>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
