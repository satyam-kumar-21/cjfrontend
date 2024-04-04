import React from "react";

const Mission = () => {
  return (
    <div className="bg-gray-200 md:p-8 p-2 md:pl-20 flex flex-col md:flex-row items-center rounded-lg shadow-md">
      <div className="md:w-1/2 md:pr-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
          Our Mission
        </h2>
        <p className="text-lg text-black">
          Our mission at Coding Junction is to democratize access to
          high-quality coding education. We believe that everyone, regardless of
          background or experience, should have the opportunity to learn and
          excel in programming. Through our affordable courses and resources, we
          aim to empower individuals to pursue their passions and succeed in the
          tech industry.
        </p>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0 md:h-[60vh] h-[20vh] flex justify-center">
        <img
          src="https://via.placeholder.com/400"
          className="rounded-lg shadow-lg"
          alt="Mission"
        />
      </div>
    </div>
  );
};

export default Mission;
