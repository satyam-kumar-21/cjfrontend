import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOneCourseAction,
  updateCourseAction,
} from "../../../store/Action/actionCourse";

function AddInstructor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    // image: "",
  });
  const [instructors, setInstructors] = useState([]);
  const { courseId } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInstructor = {
      name: formData.name,
      bio: formData.bio,
      // image: formData.image,
    };

    setInstructors([...instructors, newInstructor]);
    setFormData({
      ...formData,
      name: "",
      bio: "",
      // image: "",
    });
  };

  const handleAddTechnologies = async () => {
    if (formData.name || formData.bio || formData.image) {
      await handleSubmit(new Event("submit"));
    }
    navigate(`/admin/courses/create/add-technology/${courseId}`);
  };

  const saveInstructorsToDatabase = async (courseId, instructorsData) => {
    try {
      const course = await getOneCourseAction(courseId);
      const updatedCourse = { ...course, instructor: instructorsData };
      await dispatch(updateCourseAction(courseId, updatedCourse));
      return updatedCourse;
    } catch (error) {
      console.error("Error saving instructors:", error);
      throw error;
    }
  };

  const handleSaveInstructors = async () => {
    try {
      await saveInstructorsToDatabase(courseId, instructors);
      setInstructors([]);
      // console.log("Instructors saved:", instructors);
    } catch (error) {
      console.log("Error while updating course", error);
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
                  Add Instructors
                </h2>
              </div>
  
              {instructors.length > 0 && (
                <div>
                  <button
                    onClick={handleSaveInstructors}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Instructors
                  </button>
                </div>
              )}
  
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Instructor Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bio
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {instructors.map((instructor, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {instructor.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {instructor.bio}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {instructor.image}
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="">
                    Instructor Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Instructor Name"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="">
                    Instructor Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    cols="40"
                    value={formData.bio}
                    onChange={handleChange}
                    autoComplete="bio"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Instructor Bio"
                  ></textarea>
                </div>
                {/* <div>
                  <label htmlFor="image" className="">
                    Instructor Image URL
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={formData.image}
                    onChange={handleChange}
                    autoComplete="image"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Instructor Image URL"
                  />
                </div> */}
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Instructor
                  </button>
                </div>
              </form>
  
              <div>
                <button
                  onClick={handleAddTechnologies}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Technologies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
  
}

export default AddInstructor;