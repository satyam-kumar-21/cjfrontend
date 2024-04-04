import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteCourseAction,
  getAllCourseAction,
} from "../../../store/Action/actionCourse";
import { useNavigate } from "react-router-dom";
import { createLectureAction } from "../../../store/Action/lectureAction";

function CourseCard({ course, showDeleteButton }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete =async () => {
    await dispatch(deleteCourseAction(course._id)); // Dispatch delete action with course ID
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/admin/courses/update/${course._id}`);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };
  const handleUploadLecture = () => {
    setIsUploadModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllCourseAction());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    video: "",
    lectureNumber: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setIsUploadModalOpen(false);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("video", formData.video);
      
      formDataToSend.append("lectureNotes", formData.lectureNotes);
      // Ensure you're capturing lectureNumber correctly or set a default/static value as needed
      formDataToSend.append("lectureNumber", formData.lectureNumber);

      // Include formDataToSend in your request and set the content type header
      const lecture = await dispatch(createLectureAction(course._id, formDataToSend));

      return lecture.data

    } catch (error) {
      console.log(
        "Create lecture error:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleSeeAllLectures = () => {
    navigate(`/admin/courses/all-lectures/${course._id}`);
  };

  return (
    <>
      <div className=" shadow-2xl  md:mt-5 mt-0 md:pl-10 pl-0 md:h-[35vh] md:pr-20 pr-0 rounded-lg overflow-hidden flex items-center md:flex-row flex-col md:p-4 p-0 w-full">
        {/* Left side */}
        <div className="md:w-1/3 w-3/4">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Right side */}
        <div className="md:w-2/3 w-full md:px-4 px-1">
          <h2 className="text-lg font-semibold md:mb-4 mb-1">{course.title}</h2>
          <div className="flex justify-between md:pb-0 pb-2">
            {showDeleteButton && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white md:py-2 py-2 md:px-6 px-2 rounded-md hover:bg-red-600 mr-2"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white md:py-2 py-2 md:px-6 px-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Update
            </button>
            <button
              onClick={handleUploadLecture}
              className="bg-green-500 text-white md:py-2 py-2 md:px-6 px-2 rounded-md hover:bg-green-600 mr-2"
            >
              Upload Lecture
            </button>
            <button onClick={handleSeeAllLectures} className="bg-gray-500 text-white md:py-2 py-2 md:px-6 px-2 rounded-md hover:bg-gray-600">
              See Lectures
            </button>
          </div>
        </div>
        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-md">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete this course?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Upload Lecture Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4 text-center">
              Upload Lecture
            </p>
            {/* Your upload lecture form or content goes here */}
            <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-6">
              <input
                onChange={handleChange}
                value={formData.title}
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                className="ring-1 p-2 ring-black rounded-xl"
              />
              <input
              onChange={handleChange}
              value={formData.lectureNotes}
              id="lectureNotes"
              type="text"
              name="lectureNotes"
              placeholder="Enter notes drive link"
              className="ring-1 p-2 ring-black rounded-xl"
            />
              <input
                onChange={handleChange}
                type="file"
                name="video"
                id="video"
                className="ring-1 ring-black rounded-xl"
              />
              <div className="flex">
                <button
                  onClick={handleCloseUploadModal}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                {/* Add your logic to handle uploading lectures */}
                <button
                  type="submit" // Add type="submit" to make the button submit the form
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseCard;
