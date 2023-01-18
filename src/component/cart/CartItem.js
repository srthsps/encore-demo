import { useContext, useEffect } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
//internal import
import useAddToCart from "@hooks/useAddToCart";
import { SidebarContext } from "@context/SidebarContext";
import { fetchAddToCart } from "src/store/slice/CartSlice/AddToCartSlice";
import { fetchProductQuantity } from "src/store/slice/CartSlice/ProductQuantityEditSlice";


const CartItem = ({ item }) => {
  // const { updateItemQuantity, removeItem } = useCart();
  // const { handleIncreaseQuantity } = useAddToCart();
  const { closeCartDrawer } = useContext(SidebarContext);

  const diaptach = useDispatch()



  // const handleDecreaseQuantity = (id, item) => {
    
  //   const quantity = item.price * item.quantity + item.price
  //   console.log("incree.....",quantity);

  //   diaptach(fetchProductQuantity({ payload: quantity, productID: id }))

  // }




  return (
    <div className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0">
      <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
        <img
          key={item.id}
          src={item.image}
          width={40}
          height={40}
          alt={item.brand}
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <Link href={`/product/${item.slug}`}>
          <a
            onClick={closeCartDrawer}
            className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1"
          >
            {item.brand}
          </a>
        </Link>
        <span className="text-xs text-gray-400 mb-1">
          Item Price ${item.price}
        </span>
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm md:text-base text-heading leading-5">
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            {/* <span>${(item.price * item.quantity).toFixed(2)}</span> */}
          </div>
          <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
            <button
              // onClick={() => handleDecreaseQuantity(item.id,item)}
            >
              <span className="text-dark text-base">
                <FiMinus />
              </span>
            </button>
            <p className="text-sm font-semibold text-dark px-1">
              {item.quantity}
            </p>
            <button 
            // onClick={() => handleIncreaseQuantity(item.id, item.price)}
            >
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
