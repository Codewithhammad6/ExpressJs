import { useState } from 'react';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Sedan',
    'SUV',
    'Truck',
    'Sports',
    'Luxury',
    'Electric',
    'Hybrid'
  ];

  const featuredCars = [
    {
      id: 1,
      name: 'Tesla Model S',
      price: '$79,990',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      type: 'Electric',
      rating: 4.8,
      year: 2023,
      mileage: '5,000 mi'
    },
    {
      id: 2,
      name: 'Ford Mustang GT',
      price: '$43,090',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      type: 'Sports',
      rating: 4.6,
      year: 2022,
      mileage: '12,000 mi'
    },
    {
      id: 3,
      name: 'Toyota RAV4',
      price: '$28,475',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      type: 'SUV',
      rating: 4.5,
      year: 2023,
      mileage: '8,500 mi'
    },
    {
      id: 4,
      name: 'Chevrolet Silverado',
      price: '$36,800',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      type: 'Truck',
      rating: 4.4,
      year: 2021,
      mileage: '25,000 mi'
    },
  ];

  const carAccessories = [
    {
      id: 1,
      name: 'Car Cover',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      name: 'Car Vacuum Cleaner',
      price: '$59.99',
     image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 3,
      name: 'Dash Cam',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 4,
      name: 'Car Mount',
      price: '$119.99',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
  ];

  return (
    <div className="mt-32 min-h-screen bg-base-100">
 
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-200" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2083&q=80)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Find Your Dream Car</h1>
            <p className="mb-5">Browse our extensive collection of new and used vehicles. Quality cars at affordable prices.</p>
            <button className="btn btn-primary">Shop Now</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Cars */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCars.map((car) => (
            <div key={car.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-4 pt-4">
                <img src={car.image} alt={car.name} className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title">{car.name}</h3>
                  <div className="badge badge-primary">{car.type}</div>
                </div>
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <span className="ml-1">{car.rating}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{car.year}</span>
                  <span>{car.mileage}</span>
                </div>
                <div className="card-actions justify-between items-center">
                  <span className="text-xl font-bold">{car.price}</span>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="btn btn-outline btn-primary">View All Cars</button>
        </div>
      </div>

      {/* Car Accessories */}
      <div className="container mx-auto px-4 py-12 bg-base-200 rounded-box">
        <h2 className="text-3xl font-bold text-center mb-8">Car Accessories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {carAccessories.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-4 pt-4">
                <img src={item.image} alt={item.name} className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <div className="card-actions justify-between items-center">
                  <span className="text-xl font-bold">{item.price}</span>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-circle">
                      <HeartIcon className="h-5 w-5" />
                    </button>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Help Finding Your Perfect Car?</h2>
        <p className="mb-8 max-w-2xl mx-auto">Our team of experts is here to help you find the perfect vehicle that fits your needs and budget.</p>
        <button className="btn btn-primary btn-lg">Contact Us</button>
      </div>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-neutral text-neutral-content border-base-300">
        <div className="items-center grid-flow-col">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
          <p>AutoMarket Ltd. <br/>Providing reliable car services since 2010</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;