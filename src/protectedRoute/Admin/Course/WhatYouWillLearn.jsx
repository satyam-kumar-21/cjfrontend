import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneCourseAction, updateCourseAction } from "../../../store/Action/actionCourse";

function WhatYouWillLearn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    whatYouWillLearn: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const course = await getOneCourseAction(courseId);
      const updatedCourse = {
        ...course,
        whatYouWillLearn: formData.whatYouWillLearn,
      };
      await dispatch(updateCourseAction(courseId, updatedCourse));
      console.log("What You Will Learn saved:", formData.whatYouWillLearn);
      setFormData({ whatYouWillLearn: [] });
      navigate(`/admin/courses/create/add-syllabus/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleAddLearn = () => {
    setFormData({ ...formData, whatYouWillLearn: [...formData.whatYouWillLearn, ""] });
  };

  const handleLearnChange = (index, value) => {
    const updatedLearn = [...formData.whatYouWillLearn];
    updatedLearn[index] = value;
    setFormData({ ...formData, whatYouWillLearn: updatedLearn });
  };

  const handleRemoveLearn = (index) => {
    const updatedLearn = [...formData.whatYouWillLearn];
    updatedLearn.splice(index, 1);
    setFormData({ ...formData, whatYouWillLearn: updatedLearn });
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
                  What You Will Learn
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {formData.whatYouWillLearn.map((learn, index) => (
                  <div key={index}>
                    <label htmlFor={`learn-${index}`} className="">
                      What You Will Learn {index + 1}
                    </label>
                    <div className="flex">
                      <input
                        id={`learn-${index}`}
                        name={`learn-${index}`}
                        type="text"
                        value={learn}
                        onChange={(e) =>
                          handleLearnChange(index, e.target.value)
                        }
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="What You Will Learn"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLearn(index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={handleAddLearn}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Learn
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save What You Will Learn
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

export default WhatYouWillLearn;
