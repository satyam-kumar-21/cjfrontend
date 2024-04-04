import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneCourseAction, updateCourseAction } from "../../../store/Action/actionCourse";

function AddTechnologies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    technologies: [],
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
        technologies: formData.technologies,
      };
      await dispatch(updateCourseAction(courseId, updatedCourse));
      console.log("Technologies saved:", formData.technologies);
      setFormData({ technologies: [] });
      navigate(`/admin/courses/create/add-what-you-will-learn/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleAddTechnology = () => {
    setFormData({ ...formData, technologies: [...formData.technologies, ""] });
  };

  const handleTechnologyChange = (index, value) => {
    const updatedTechnologies = [...formData.technologies];
    updatedTechnologies[index] = value;
    setFormData({ ...formData, technologies: updatedTechnologies });
  };

  const handleRemoveTechnology = (index) => {
    const updatedTechnologies = [...formData.technologies];
    updatedTechnologies.splice(index, 1);
    setFormData({ ...formData, technologies: updatedTechnologies });
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
                  Add Technologies
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {formData.technologies.map((technology, index) => (
                  <div key={index}>
                    <label htmlFor={`technology-${index}`} className="">
                      Technology {index + 1}
                    </label>
                    <div className="flex">
                      <input
                        id={`technology-${index}`}
                        name={`technology-${index}`}
                        type="text"
                        value={technology}
                        onChange={(e) =>
                          handleTechnologyChange(index, e.target.value)
                        }
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Technology Name"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index)}
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
                    onClick={handleAddTechnology}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Technology
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Technologies
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

export default AddTechnologies;
