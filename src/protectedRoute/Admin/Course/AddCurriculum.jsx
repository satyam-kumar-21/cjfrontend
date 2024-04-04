import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOneCourseAction,
  updateCourseAction,
} from "../../../store/Action/actionCourse";

function AddCurriculum() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    curriculum: [],
  });

  const handleChange = (e, index) => {
    const { name, value, type } = e.target;
    const updatedCurriculum = [...formData.curriculum];
    updatedCurriculum[index][name] = type === "checkbox" ? e.target.checked : value;
    setFormData({ ...formData, curriculum: updatedCurriculum });
  };

  const handleAddTitle = () => {
    setFormData({
      ...formData,
      curriculum: [...formData.curriculum, { title: "", isLocked: false }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const course = await getOneCourseAction(courseId);
      const updatedCourse = {
        ...course,
        curriculum: formData.curriculum,
      };
      await dispatch(updateCourseAction(courseId, updatedCourse));
      console.log("Curriculum saved:", formData.curriculum);
      setFormData({ curriculum: [] });
      navigate(`/admin/courses/create/add-qa/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error);
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
                  Add Curriculum
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {formData.curriculum.map((title, index) => (
                  <div key={index}>
                    <label htmlFor={`title-${index}`} className="">
                      Title {index + 1}
                    </label>
                    <input
                      id={`title-${index}`}
                      name="title"
                      type="text"
                      value={title.title}
                      onChange={(e) => handleChange(e, index)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Title"
                    />
                    <label htmlFor={`locked-${index}`} className="">
                      Locked
                    </label>
                    <input
                      id={`locked-${index}`}
                      name="isLocked"
                      type="checkbox"
                      checked={title.isLocked}
                      onChange={(e) => handleChange(e, index)}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={handleAddTitle}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Title
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Curriculum
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

export default AddCurriculum;
