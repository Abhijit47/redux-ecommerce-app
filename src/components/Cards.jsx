import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { toast } from 'react-hot-toast';
import { ProgressBar } from 'react-loader-spinner';
import { getAllProducts } from '../redux/actions/productAction';

const Cards = () => {
  const [cardData, setCardData] = useState([]);

  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  const handleAddToCart = (card) => {
    dispatch(addToCart(card));
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

  useEffect(() => {
    if (products?.length === 0) {
      dispatch(getAllProducts());
    }
    setCardData(products);
  }, [dispatch, products]);

  return (
    <section className='container mx-auto py-8'>
      <h3 className='text-center text-3xl font-sans font-semibold mb-6'>
        Products
      </h3>
      {isError && (
        <h1 className='text-center text-red-600 text-2xl'>
          Something went wrong try again!!!
        </h1>
      )}
      {isLoading ? (
        <div className='h-full flex justify-center items-center'>
          <ProgressBar
            height='80'
            width='800'
            ariaLabel='progress-bar-loading'
            wrapperStyle={{}}
            wrapperClass='progress-bar-wrapper'
            borderColor='#F4442E'
            barColor='#51E5FF'
          />
        </div>
      ) : (
        <div className='flex gap-8 flex-wrap justify-center'>
          {cardData?.map((card, index) => (
            <div
              className='bg-slate-100 h-[30rem] sm:w-[20rem] lg:w-3/12 p-4 flex flex-col justify-center gap-4 shadow-lg'
              key={index}>
              <div className='object-cover h-44 object-center'>
                <img
                  src={card.thumbnail}
                  alt={card.brand}
                  className='rounded-md shadow-md h-full w-full hover:scale-110 transition-all delay-200 duration-200'
                />
              </div>
              <h5 className='font-sans font-semibold text-2xl capitalize text-center'>
                {card.title.substr(0, 20)}
              </h5>
              <div className='flex flex-wrap gap-2 justify-center'>
                <span className='card-badge'>
                  ₹&nbsp;
                  {new Intl.NumberFormat('en-IN', {
                    maximumSignificantDigits: 3,
                  }).format(card.price * 100)}
                </span>
                <span className='card-badge'>
                  ⭐&nbsp;{card.rating.toFixed(1)}
                </span>
                <span className='card-badge'>{card.brand}</span>
              </div>
              <div>
                <p className='capitalize text-xs'>description</p>
                <h5 className='text-md font-sans'>
                  {card.description.length > 20
                    ? `${card.description.substr(0, 30)} ...`
                    : card.description}
                </h5>
              </div>
              <div>
                <p className='capitalize text-xs'>category</p>
                <h5 className='capitalize font-semibold text-lg'>
                  {card.category}
                </h5>
              </div>
              <div className='flex justify-center'>
                <button
                  className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md transition-all delay-150 duration-150 text-slate-50'
                  onClick={() => handleAddToCart(card)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cards;
