// ManageCourse.jsx
import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminDashboard";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourseAction, getAllCourseAction } from "../../../store/Action/actionCourse";
import { getAllLecturesAction } from "../../../store/Action/lectureAction";

function ManageCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.course.data); // Add null check here


  const handleDeleteCourse = async (courseId) => {
    try {
      await dispatch(deleteCourseAction(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
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

  useEffect(() => {
    dispatch(getAllLecturesAction())
        .then(() => setLoading(false))
        .catch((error) => {
            console.error("Error fetching lectures:", error);
            setLoading(false);
        });
}, [dispatch]);




  return (
    <>
      <div className="flex h-auto pt-20">
        <AdminDashboard />

        <div className="pt-10 flex-1 flex flex-col bg-gray-200">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => navigate("/admin/courses/create")}
              className="bg-blue-700 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded"
            >
              Create New Course
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full ">
            {Array.isArray(courses) && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  showDeleteButton={true}
                  onDelete={() => handleDeleteCourse(course._id)}
                />
              ))
            ) : (
              <div className="h-80 w-full flex justify-center items-center text-gray-500">
                <h1 className="font-bold text-2xl right-7 pl-10">
                  No courses available
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCourse;
