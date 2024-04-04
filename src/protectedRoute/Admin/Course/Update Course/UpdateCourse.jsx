import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseAction, getOneCourseAction, updateCourseAction } from '../../../../store/Action/actionCourse';
import { useNavigate, useParams } from 'react-router-dom';
import AdminDashboard from '../../AdminDashboard';

function UpdateCourse() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector(state => state.course.course.data);

  useEffect(() => {
    dispatch(getOneCourseAction(courseId));
  }, [dispatch, courseId]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    startdate: '',
    enddate: '',
    duration: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        discountedPrice: course.discountedPrice,
        startdate: course.startdate,
        enddate: course.enddate,
        duration: course.duration,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    if(e.target.name === "image"){
      setFormData({...formData, [e.target.name] : e.target.value[0]})
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getAllCourseAction())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, [dispatch]); 


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

      const createdCourse = await dispatch(updateCourseAction(courseId,formDataToSend));
      console.log(createdCourse);
      // const courseId = createdCourse.data._id;

      navigate(`/admin/courses/`);
    } catch (error) {
      console.log("Create course error:", error);
    }
  };

  return (
    <>
      <div className="flex h-auto">
        <AdminDashboard />
        <div
          className="md:min-h-screen flex items-center w-full justify-center pb-16"
          
        >
          <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
            <div className="h-full flex flex-col justify-center space-y-8">
              <div>
                <h2 className="text-center text-3xl font-extrabold text-blue-900">
                  Update Course
                </h2>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title" className="">
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
                  <label htmlFor="description" className="">
                    Course description
                  </label>
                  <textarea
                    rows="4"
                    cols="40"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    autoComplete="description"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course description"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="price" className="">
                    Course profile
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="file"
                    value={formData.image}
                    onChange={handleChange}
                    autoComplete="actual price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Actual price"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="">
                    Actual price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    autoComplete="actual price"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Actual price"
                  />
                </div>
                <div>
                  <label htmlFor="discountedPrice" className="">
                    Discounted price
                  </label>
                  <input
                    id="discountedPrice"
                    name="discountedPrice"
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
                  <label htmlFor="duration" className="">
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
                    Update Course
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

export default UpdateCourse;
