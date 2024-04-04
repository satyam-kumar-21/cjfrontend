import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate } from "react-router-dom";
import { createCourseAction } from "../../../store/Action/actionCourse";
import { useDispatch } from "react-redux";

function AddCourseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    discountedPrice: "",
    startdate: "",
    enddate: "",
    duration: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discountedPrice", formData.discountedPrice);
      formDataToSend.append("startdate", formData.startdate);
      formDataToSend.append("enddate", formData.enddate);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("image", formData.image);

      const createdCourse = await dispatch(createCourseAction(formDataToSend));
      const courseId = createdCourse.data._id;

      navigate(`/admin/courses/create/add-instructor/${courseId}`);
    } catch (error) {
      console.log("Create course error:", error);
    }
  };

  return (
    <>
      <div className="flex h-auto pt-20">
        <AdminDashboard />

        <div
          className="bg-gray-200 md:min-h-screen flex items-center w-full justify-center pb-16"
          
        >
          <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
            <div className="h-full flex flex-col justify-center space-y-8">
              <div>
                <h2 className="text-center text-3xl font-extrabold text-blue-900">
                  Create course
                </h2>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title" className="sr-only">
                    Course name
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    autoComplete="title"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course name"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="sr-only">
                    Course description
                  </label>
                  <textarea
                    rows="4"
                    cols="40"
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    autoComplete="description"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course description"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="image" className="">
                    Choose course profile image
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    
                  />
                </div>
                <div>
                  <label htmlFor="price" className="sr-only">
                    Actual price
                  </label>
                  <input
                    id="price"
                    name="price"
                    required
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    autoComplete="actual price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Actual price"
                  />
                </div>
                <div>
                  <label htmlFor="discountedPrice" className="sr-only">
                    Discounted price
                  </label>
                  <input
                    id="discountedPrice"
                    name="discountedPrice"
                    required
                    type="number"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    autoComplete="Discounted price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Discounted price"
                  />
                </div>
                <div>
                  <label htmlFor="startdate" className="">
                    Course start date
                  </label>
                  <input
                    id="startdate"
                    name="startdate"
                    type="date"
                    value={formData.startdate}
                    onChange={handleChange}
                    autoComplete="Discounted price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course start date"
                  />
                </div>
                <div>
                  <label htmlFor="enddate" className="">
                    Course end date
                  </label>
                  <input
                    id="enddate"
                    name="enddate"
                    type="date"
                    value={formData.enddate}
                    onChange={handleChange}
                    autoComplete="Discounted price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course end date"
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="sr-only">
                    Course duration
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    value={formData.duration}
                    onChange={handleChange}
                    autoComplete="Discounted price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course duration in text form"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCourseForm;
