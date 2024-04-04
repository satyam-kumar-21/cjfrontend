// AdminMain.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../store/Action/actionUser";
import DateTime from "./DateTime";

function AdminMain() {
  const dispatch = useDispatch();
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getAllUserAction());
      if (response && response.success) {
        setTotalUser(response.users.length);
      } else {
        console.log("Failed to fetch users");
      }
    };
    fetchData();
  }, [dispatch]);

  const totalCourse = useSelector((state) => state.course.course.data);
  const courseL = totalCourse.length;

  return (
    <>
      <div className="md:flex-1 w-full md:p-2 p-0 flex flex-col">
        <DateTime />
        <div className="bg-gray-300 md:p-2 p-0 rounded-2xl md:mb-4 mb-2">
          <h1 className="text-2xl md:text-xl lg:text-2xl text-gray-600 font-bold text-center">
            Welcome to Admin Panel
          </h1>
        </div>

        <div className="flex flex-col md:flex-row mb-4 uppercase text-center">
          {/* Users section */}
          <div className="bg-gray-300 text-gray-600 p-8 mr-0 md:mr-4 rounded-md flex-1 mb-4 md:mb-0">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
              Total Users
            </h2>
            <h3 className="text-base md:text-lg lg:text-xl font-bold">
              {totalUser}
            </h3>
          </div>

          {/* Courses section */}
          <div className="bg-gray-300 text-gray-600 p-8 mr-0 md:mr-4 rounded-md flex-1">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
              Total Course
            </h2>
            <h3 className="text-base md:text-lg lg:text-xl font-bold">
              {courseL}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMain;
