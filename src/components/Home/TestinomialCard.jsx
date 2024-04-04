import React from 'react';

const TestimonialCard = ({ name, imageSrc, testimonial }) => {
  return (
    <div className="flex max-w-sm rounded overflow-hidden shadow-2xl bg-white p-4">
      <img className="w-20 h-20 rounded-full mr-4" src={imageSrc} alt={name} />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-xm">{testimonial}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
