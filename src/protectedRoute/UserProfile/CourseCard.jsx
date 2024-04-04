// CourseCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CourseCard({ id, title, image, price, discountedPrice, duration, enrolled }) {
    const discountPercentage = ((price - discountedPrice) / price * 100).toFixed(2);
    const navigate = useNavigate();
  
    const handleLecturePage = () => {
      navigate(`/profile/lecture/watch/${id}`);
    }
    return (
      <div onClick={handleLecturePage} className="hover:cursor-pointer border rounded-lg bg-white overflow-hidden shadow-md md:m-2 m-1">
        <img src={image} alt={title} className="w-full md:h-60 h-70 object-cover shadow-2xl" />
        <div className="p-4">
          <h1 className="text-lg font-semibold text-gray-900 md:mb-2 mb-1">{title}</h1>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-gray-700 text-lg">
                <span className="md:font-bold font-semibold text-xl">₹{discountedPrice}</span>
                {discountedPrice < price && (
                  <>
                    <span className="text-red-500 line-through ml-2">₹{price}</span>
                    <span className="bg-green-400 text-white px-2 py-1 rounded-full text-sm ml-2">
                      {discountPercentage}% Off
                    </span>
                  </>
                )}
              </h3>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 font-bold md:text-lg text-sm">Duration: <br />{duration}</h2>
            <div>
              <Link to={`/course/${id}`}>
                <button className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600 transition-colors duration-300 ease-in-out">Explore</button>
              </Link>
    
              {enrolled ? (
                <button className="bg-gray-400 font-semibold text-white px-4 py-2 rounded-md">Watch</button>
              ) : (
                <button className="bg-green-500 font-bold text-white px-4 py-2 rounded-md">Enroll Now</button>
              )}
              
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CourseCard;
  
