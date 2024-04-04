import React, { useState } from "react";
import AdminDashboard from "../AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOneCourseAction,
  updateCourseAction,
} from "../../../store/Action/actionCourse";

function AddQA() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    qa: [],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQA = [...formData.qa];
    updatedQA[index][name] = value;
    setFormData({ ...formData, qa: updatedQA });
  };

  const handleAddQA = () => {
    const newQA = {
      id: formData.qa.length + 1, // Increment id based on current length
      question: "",
      answer: "",
    };
    setFormData({
      ...formData,
      qa: [...formData.qa, newQA],
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const course = await getOneCourseAction(courseId);
      const updatedCourse = {
        ...course,
        qa: formData.qa,
      };
      await dispatch(updateCourseAction(courseId, updatedCourse));
    //   console.log("QA saved:", formData.qa);
      setFormData({ qa: [] });
      navigate(`/admin/courses/`);
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
                  Add QA
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {formData.qa.map((item, index) => (
                  <div key={index}>
                    <label htmlFor={`question-${index}`} className="">
                      Question {index + 1}
                    </label>
                    <input
                      id={`question-${index}`}
                      name="question"
                      type="text"
                      value={item.question}
                      onChange={(e) => handleChange(e, index)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Question"
                    />
                    <label htmlFor={`answer-${index}`} className="">
                      Answer {index + 1}
                    </label>
                    <input
                      id={`answer-${index}`}
                      name="answer"
                      type="text"
                      value={item.answer}
                      onChange={(e) => handleChange(e, index)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Answer"
                    />
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={handleAddQA}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add QA
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save QA
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

export default AddQA;
