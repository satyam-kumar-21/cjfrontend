import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOneCourseAction,
  updateCourseAction,
} from "../../../store/Action/actionCourse";

function AddSyllabus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    syllabus: [],
  });

  const handleChange = (e, titleIndex, topicIndex) => {
    const { name, value } = e.target;
    const updatedSyllabus = [...formData.syllabus];
    if (topicIndex === undefined) {
      updatedSyllabus[titleIndex][name] = value;
    } else {
      updatedSyllabus[titleIndex].topics[topicIndex] = value;
    }
    setFormData({ ...formData, syllabus: updatedSyllabus });
  };

  const handleAddTitle = () => {
    const newId = formData.syllabus.length + 1;
    setFormData({
      ...formData,
      syllabus: [...formData.syllabus, { id: newId, title: "", topics: [] }],
    });
  };

  const handleAddTopic = (titleIndex) => {
    const updatedSyllabus = [...formData.syllabus];
    updatedSyllabus[titleIndex].topics.push("");
    setFormData({ ...formData, syllabus: updatedSyllabus });
  };

  const handleRemoveTopic = (titleIndex, topicIndex) => {
    const updatedSyllabus = [...formData.syllabus];
    updatedSyllabus[titleIndex].topics.splice(topicIndex, 1);
    setFormData({ ...formData, syllabus: updatedSyllabus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const course = await getOneCourseAction(courseId);
      const updatedCourse = {
        ...course,
        syllabus: formData.syllabus,
      };
      await dispatch(updateCourseAction(courseId, updatedCourse));
      console.log("Syllabus saved:", formData.syllabus);
      setFormData({ syllabus: [] });
      navigate(`/admin/courses/create/add-curriculum/${courseId}`);
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
                  Add Syllabus
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {formData.syllabus.map((title, titleIndex) => (
                  <div key={title.id}>
                    <label htmlFor={`title-${titleIndex}`} className="">
                      Title {titleIndex + 1}
                    </label>
                    <input
                      id={`title-${titleIndex}`}
                      name="title"
                      type="text"
                      value={title.title}
                      onChange={(e) => handleChange(e, titleIndex)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Title"
                    />
                    <ul>
                      {title.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>
                          <input
                            id={`topic-${titleIndex}-${topicIndex}`}
                            name={`topic-${titleIndex}-${topicIndex}`}
                            type="text"
                            value={topic}
                            onChange={(e) => handleChange(e, titleIndex, topicIndex)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Topic"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveTopic(titleIndex, topicIndex)}
                            className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                          >
                            Remove Topic
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleAddTopic(titleIndex)}
                      className="ml-2 px-3 py-2 bg-green-500 text-white rounded-md"
                    >
                      Add Topic
                    </button>
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
                    Save Syllabus
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

export default AddSyllabus;
