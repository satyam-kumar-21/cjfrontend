import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToUserAction } from "../../store/Action/actionUser";

function CourseCard({ id, title, image, price, discountedPrice, duration }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.user._id);
  const userCourses = useSelector((state) => state.user.user.courses || []);

  console.log(userCourses);
  const isEnrolled = userCourses.includes(id);
  // const isEnrolled = false

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:5050/api/payment/orders";
      const { data } = await axios.post(orderUrl, {
        amount: discountedPrice || price,
      });
      initPayment(data.data);
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_g6eiOXSsKay9YG",
      amount: data.amount,
      currency: data.currency,
      name: title,
      description: "Test Transaction",
      image: image,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5050/api/payment/verify";
          await axios.post(verifyUrl, response);
          const data1 = await dispatch(addCourseToUserAction(userId, id));
          console.log("Data is :", data1);
          navigate("/profile");
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-md m-2 md:m-2">
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover shadow-2xl"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">{title}</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-gray-700 text-lg">
              <span className="text-red-500 font-bold line-through">
                ₹{price}
              </span>
              <br />
              <span className="text-green-600 font-bold text-2xl">
                ₹{discountedPrice || price}
              </span>
              {discountedPrice && (
                <span className="bg-green-400 text-yellow-300 font-bold px-2 py-1 rounded-full text-sm ml-2">
                  {(((price - discountedPrice) / price) * 100).toFixed(2)}% Off
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-600 font-bold text-lg">
            Duration: <br />
            {duration}
          </h2>
          <div>
            <Link to={`/course/${id}`}>
              <button className="bg-blue-500 font-bold text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                Explore
              </button>
            </Link>
            {isEnrolled ? (
              <button className="bg-gray-400 font-bold text-white px-4 py-2 rounded-md">
                Enrolled
              </button>
            ) : (
              <button
                onClick={handlePayment}
                className="bg-green-500 font-bold text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
