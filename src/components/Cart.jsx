import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decrementCartItem,
  emptyCartItems,
  removeToCart,
} from '../redux/features/cartSlice';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

function Cart() {
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { carts } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
    toast.success('Items added to your cart.', {
      duration: 1500,
      position: 'top-center',
      className: 'bg-green-500 text-white',
      icon: '✅',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  };

  const handleRemoveCart = (itemId) => {
    dispatch(removeToCart(itemId));
    toast.success('Item successfully removed from your cart.', {
      duration: 1800,
      position: 'top-center',
      className: 'bg-green-500 text-white',
      icon: '❌',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  };

  const handleDecrement = (item) => {
    dispatch(decrementCartItem(item));
    toast.error('Items remove to your cart.', {
      duration: 1500,
      position: 'top-center',
      className: 'bg-green-500 text-white',
      icon: '❎',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  };

  const handleEmptyCart = () => {
    dispatch(emptyCartItems());
    toast.dismiss('All items successfully removed to your cart.', {
      duration: 2000,
      position: 'top-center',
      className: 'bg-green-500 text-white',
      icon: '✅',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  };

  // calculate total price
  const calcTotalPrice = () => {
    let totalPrice = 0;

    carts.map((cartItem, index) => {
      return (totalPrice =
        cartItem.price * 100 * cartItem.quantity + totalPrice);
    });
    setTotalPrice(totalPrice);
  };

  // calculate total quantity
  const calTotalQuantity = () => {
    let totalQuantity = 0;

    carts.map((cartItem, index) => {
      return (totalQuantity = cartItem.quantity + totalQuantity);
    });
    setTotalQuantity(totalQuantity);
  };

  // make payment
  const handleMakePayment = async (products) => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

      const API_URI = process.env.REACT_APP_PAYMENT_LINK;

      const response = await axios.post(API_URI, products);
      const session = response.data.data.session;
      console.log(session);

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    calcTotalPrice();
    calTotalQuantity();
  });

  return (
    <>
      <div>
        <div className='flex h-[85dvh] items-center justify-center py-8'>
          <button
            onClick={() => setShow(!show)}
            className='py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white'>
            See your cart
          </button>
        </div>
        {show && (
          <div
            className='w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0'
            id='chec-div'>
            <div
              className='w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700'
              id='checkout'>
              <div className='flex md:flex-row flex-col justify-end' id='cart'>
                {/* Left side */}
                <div
                  className='lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen'
                  id='scroll'>
                  <div
                    className='flex items-center text-gray-500 hover:text-gray-600 cursor-pointer'
                    onClick={() => setShow(!show)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-chevron-left'
                      width={16}
                      height={16}
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <polyline points='15 6 9 12 15 18' />
                    </svg>
                    <p className='text-sm pl-2 leading-none'>Back</p>
                  </div>
                  <div className='flex justify-between items-center p-4'>
                    <p className='text-5xl font-black leading-10 text-gray-800'>
                      Items<span className='text-sm'>({carts.length})</span>
                    </p>
                    {carts.length <= 0 ? null : (
                      <div>
                        <button
                          className='flex gap-2 items-center bg-red-500 hover:bg-red-600 rounded-md px-3 py-1 text-slate-50'
                          onClick={handleEmptyCart}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-4 h-4 text-slate-50'>
                            <path
                              fillRule='evenodd'
                              d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span>Empty cart</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {carts.length <= 0 ? (
                    <div className='flex flex-col mt-14 justify-center items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-12 h-12 text-slate-800'>
                        <path
                          fillRule='evenodd'
                          d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <h3 className='text-3xl'>Your cart is empty!</h3>
                    </div>
                  ) : (
                    <Fragment>
                      {carts.map((cartItem, index) => (
                        <div
                          className='md:flex items-center py-8 border-t border-gray-200'
                          key={index}>
                          <div className='w-1/4'>
                            <img
                              src={cartItem.thumbnail}
                              alt=''
                              className='w-full h-full object-center object-cover'
                            />
                          </div>
                          <div className='md:pl-3 md:w-3/4'>
                            <p className='text-xs leading-3 text-gray-800 md:pt-0 pt-4 capitalize'>
                              {cartItem.category}
                            </p>
                            <div className='flex items-center justify-between w-full pt-1'>
                              <p className='text-base font-black leading-none text-gray-800'>
                                {cartItem.title}
                              </p>
                              <div className='flex justify-end'>
                                <button
                                  className='px-3 py-1'
                                  onClick={
                                    cartItem.quantity <= 1
                                      ? () => handleRemoveCart(cartItem.id)
                                      : () => handleDecrement(cartItem)
                                  }>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'>
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                </button>
                                <div className='w-2/12'>
                                  <input
                                    type='text'
                                    id='item-count'
                                    value={cartItem.quantity}
                                    readOnly
                                    className='w-full h-full rounded-md border border-slate-900 text-center'
                                  />
                                </div>
                                <button
                                  className='px-3 py-1'
                                  onClick={() => handleIncrement(cartItem)}>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='w-6 h-6'>
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className='text-xs leading-3 text-gray-600 py-2'>
                              {cartItem.brand}
                            </p>
                            <p className='text-xs leading-3 text-gray-600 py-2'>
                              {cartItem.description}
                            </p>
                            <p className='w-96 text-xs leading-3 text-gray-600'>
                              Discount:&nbsp;{cartItem.discountPercentage}
                              &nbsp;%
                            </p>
                            <div className='flex items-center justify-between pt-5 pr-6'>
                              <div className='flex itemms-center'>
                                <p className='text-xs leading-3 underline text-gray-800 cursor-pointer'>
                                  Add to favorites
                                </p>
                                <button
                                  onClick={() => handleRemoveCart(cartItem.id)}
                                  className='text-xs leading-3 underline text-red-500 pl-5 cursor-pointer'>
                                  Remove
                                </button>
                              </div>
                              <p className='text-base font-black leading-none text-gray-800'>
                                ₹&nbsp;
                                {new Intl.NumberFormat('en-IN', {
                                  maximumSignificantDigits: 3,
                                }).format(
                                  cartItem.price * 100 * cartItem.quantity
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  )}
                </div>

                {/* Right side */}
                <div className='xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full'>
                  <div className='flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto'>
                    <div>
                      <p className='text-4xl font-black leading-9 text-gray-800'>
                        Summary
                      </p>
                      <div className='flex items-center justify-between pt-16'>
                        <p className='text-base leading-none text-gray-800'>
                          Quantity
                        </p>
                        <p className='text-base leading-none text-gray-800'>
                          {totalQuantity}&nbsp;pcs
                        </p>
                      </div>
                      <div className='flex items-center justify-between pt-5'>
                        <p className='text-base leading-none text-gray-800'>
                          Subtotal
                        </p>
                        <p className='text-base leading-none text-gray-800'>
                          ₹&nbsp;
                          {new Intl.NumberFormat('en-IN', {
                            maximumSignificantDigits: 3,
                          }).format(totalPrice)}
                        </p>
                      </div>
                      <div className='flex items-center justify-between pt-5'>
                        <p className='text-base leading-none text-gray-800'>
                          Shipping
                        </p>
                        <p className='text-base leading-none text-gray-800'>
                          ₹&nbsp;0.00
                        </p>
                      </div>
                      <div className='flex items-center justify-between pt-5'>
                        <p className='text-base leading-none text-gray-800'>
                          Tax
                        </p>
                        <p className='text-base leading-none text-gray-800'>
                          ₹&nbsp;0.00
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center pb-6 justify-between lg:pt-5 pt-20'>
                        <p className='text-2xl leading-normal text-gray-800'>
                          Total
                        </p>
                        <p className='text-2xl font-bold leading-normal text-right text-gray-800'>
                          ₹&nbsp;
                          {new Intl.NumberFormat('en-IN', {
                            maximumSignificantDigits: 3,
                          }).format(totalPrice)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleMakePayment(carts)}
                        className='text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white hover:bg-gray-900 transition-all delay-75 duration-100'>
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default Cart;
