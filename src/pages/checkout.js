import React, { useState } from "react";
import dynamic from "next/dynamic";
import { CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import { useDispatch, useSelector } from "react-redux";
import { fetchcartList } from "src/store/slice/CartSlice/CartListSlice";
import { useEffect } from "react";
import { fetchPlaceOrder } from "src/store/slice/CartSlice/PlaceOrderSlice";
import { toast } from "react-toastify";
import { notifyError, notifySuccess } from "@utils/toast";
import { useRouter } from "next/router";


const Checkout = () => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
  } = useCheckoutSubmit();

  const router = useRouter();

  const { AddToCartSuccess, AddToCartFetching } = useSelector(
    (state) => state.AddToCartSlice
  );
  const { CartDeleteSuccess } = useSelector((state) => state.CartDeleteSlice);
  const { quantityIncrementFetching } = useSelector(
    (state) => state.quantityIncrementSlice
  );
  const { quantityDecrementFetching } = useSelector(
    (state) => state.quantityDecrementSlice
  );
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { cartList, cartItems } = useSelector((state) => state.cartListSlice);
  // state

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [state, setState] = useState("");
  // const [totalPrice, setTotalPrice] = useState("");

  let customer = {
    first_name,
    last_name,
    phone,
    email,
  }

  let address = {
    street_address,
    country,
    city,
    state,
    district,
    zipcode,

  }



  const resetState = () => {
    setFirstName(""),
      setLastName(""),
      setEmail(""),
      setPhone(""),
      setStreetAddress(""),
      setDistrict(""),
      setCity(""),
      setCountry(""),
      setZipCode(""),
      setState("")
    // setTotalPrice("")
  }


  const Submit = (e) => {
    e.preventDefault()

    let error = undefined;

    if (first_name === "") {
      error = "Please enter firstname";
    } else if (last_name === "") {
      error = "Please enter lastname";
    } else if (phone === "") {
      error = "Please enter phone number";
    } else if (!emailRegex.test(email)) {
      error = "Please enter valid email";
    } else if (email === "") {
      error = "Please enter email";
    } else if (street_address === "") {
      error = "Please enter Street address ";
    } else if (country === "") {
      error = "Please enter country";
    } else if (city === "") {
      error = "Please enter city";
    } else if (state === "") {
      error = "Please enter state";
    } else if (district === "") {
      error = "Please enter district";
    } else if (zipcode === "") {
      error = "Please enter zipcode";
    }

    if (error) {
      notifyError(error);
    } else {

      dispatch(fetchPlaceOrder({ customer, address, total_price: cartList.sub_total }))
      resetState()
      notifySuccess("Your order placed.")
      setTimeout(() => {
        
        router.push('/')
      }, 2000);

    }

  }


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcartList());
  }, [
    AddToCartSuccess,
    AddToCartFetching,
    CartDeleteSuccess,
    quantityIncrementFetching,
    quantityDecrementFetching,

  ]);
  // setTotalPrice()
  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={(e) => Submit(e)}>
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01. Personal Details
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">

                        {/* First Name */}
                        <input
                          placeholder="First Name"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                          className={
                            "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                          }
                        />

                      </div>
                      {/* Last Name */}
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          placeholder="Last Name"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          className={
                            "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                          }
                        />
                      </div>

                      {/* Mobile No */}
                      <div className="col-span-6 sm:col-span-3">
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            placeholder="Mobile No"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={
                              "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                            }
                          />
                        </div>
                      </div>
                      {/* Email */}
                      <div className="col-span-6 sm:col-span-3">
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={
                              "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02. Shipping Details
                    </h2>
                    {/* Street Address */}
                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-3">
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            placeholder="Street Address"
                            value={street_address}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            className={
                              "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                            }
                          />
                        </div>
                      </div>
                      {/* Country */}
                      <div className="col-span-3">
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className={
                              "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                            }
                          />
                        </div>
                      </div>
                      {/* City */}
                      <div className="col-span-3">
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={
                              "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                            }
                          />
                        </div>
                      </div>
                      {/* State */}
                      <div className="col-span-3">
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className={
                              "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                            }
                          />
                        </div>
                      </div>


                      {/* District */}
                      <div className="col-span-6 sm:col-span-3">


                        <input
                          placeholder="District"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className={
                            "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                          }
                        />

                      </div>
                      {/* Zipcode */}
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          placeholder="Zipcode"
                          value={zipcode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className={
                            "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                          }
                        />
                      </div>
                    </div>

                    {/* <Label label="Shipping Cost" /> */}
                    {/* <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value="FedEx"
                          time="Today"
                          cost={60}
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value="UPS"
                          time="7 Days"
                          cost={20}
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03. Payment Details
                    </h2>
                    {showCard && (
                      <div className="mb-3">
                        <CardElement />{' '}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name="Cash On Delivery"
                          value="COD"
                          Icon={IoWalletSharp}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name="Credit Card"
                          value="Card"
                          Icon={ImCreditCard}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>
                    </div>
                  </div> */}

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link href="/">
                        <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                          <span className="text-xl mr-2">
                            <IoReturnUpBackOutline />
                          </span>
                          Continue Shopping
                        </a>
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        onClick={(e) => (Submit(e))}

                        className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">Processing</span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {" "}
                            Confirm
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  Order Summary
                </h2>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}

                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">

                  </form>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    Total cost
                    <span className="font-serif font-extrabold text-lg">
                      {" "}
                      ₹{cartList.sub_total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
