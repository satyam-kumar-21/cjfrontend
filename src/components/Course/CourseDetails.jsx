import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faBook,
  faLock,
  faQuestionCircle,
  faUser,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function CourseDetails() {
  const { id } = useParams();

  const courseDetails = useSelector((state) =>
    state.course.course.data.find((course) => course._id === id)
  );

  const [activeSyllabus, setActiveSyllabus] = useState(null);

  const toggleActiveSyllabus = (id) => {
    setActiveSyllabus(activeSyllabus === id ? null : id);
  };


  return (
    <div className="pt-16 min-h-screen p-0 md:p-[20vh] bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-100 rounded-md md:p-8 md:mb-8 p-1 mb-1 flex flex-col md:flex-row-reverse">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src={courseDetails.image}
              alt={courseDetails.title}
              className="w-full h-80 rounded-md"
            />
          </div>
          <div className="md:w-1/2 pr-8">
            <h1 className="md:text-2xl text-xl font-bold text-gray-900 md:mb-4 mb-2">
              {courseDetails.title}
            </h1>
            <div className="md:mb-4 mb-1">
              {courseDetails.startdate && (
                <p className="text-lg text-gray-700">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="mr-2 mr-0 text-blue-500"
                  />
                  <span className="font-semibold">Start Date:</span>{" "}
                  {courseDetails.startdate.split("T")[0]}
                </p>
              )}
              {courseDetails.enddate && (
                <p className="text-lg text-gray-700">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="mr-2 text-blue-500"
                  />
                  <span className="font-semibold">End Date:</span>{" "}
                  {courseDetails.enddate.split("T")[0]}
                </p>
              )}
              <p className="text-lg text-gray-700">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="mr-2 text-blue-500"
                />
                <span className="font-semibold">Duration:</span>{" "}
                {courseDetails.duration}
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Buy Now
            </button>
          </div>
        </div>

        <div className="rounded-md shadow-2xl bg-gray-100 md:p-8 p-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
            Course Description
          </h1>
          <h2 className="text-gray-800 md:text-xl text:sm font-semibold">
            {courseDetails.description}
          </h2>
        </div>

        <div className="rounded-md shadow-2xl md:p-8 p-4 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
            Instructors
          </h2>
          {courseDetails.instructor.map((instructor, index) => (
            <div key={index} className="flex items-center md:mb-6 mb-2">
              <img
                // src={instructor.image}
                src="https://imgs.search.brave.com/pTopBbUFdYAukv2XiZZOGHPGZN-03eJBBMyU1u9QCD0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8zMC0z/MDc0MTZfcHJvZmls/ZS1pY29uLXBuZy1p/bWFnZS1mcmVlLWRv/d25sb2FkLXNlYXJj/aHBuZy1lbXBsb3ll/ZS5wbmc"
                alt={instructor.name}
                className="md:w-12 md:h-12 w-6 h-6 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="text-blue-600 text-xl  font-bold">
                  {instructor.name}
                </h4>
                <p className="text-gray-800 md:text-xl text:sm font-semibold">
                  {instructor.bio}
                </p>
                {/* <div className="flex flex-wrap">
                  <h3 className="text-xl font-semibold text-pink-800 mr-2">
                    Technologies Expertise:
                  </h3>
                  {courseDetails.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2"
                    >
                      {tech}
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-md shadow-2xl md:p-8 p-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
            What You Will Learn
          </h1>
          <ul className="list-disc list-inside text-gray-800 md:text-xl  font-semibold">
            {courseDetails.whatYouWillLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-md shadow-2xl md:p-8 p-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
            Syllabus
          </h1>
          {courseDetails.syllabus.map((section) => (
            <div key={section.id} className="mb-4 border rounded-md p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleActiveSyllabus(section.id)}
              >
                <h3 className="text-gray-800 text-xl font-semibold">
                  {section.title}
                </h3>
                <FontAwesomeIcon
                  icon={
                    activeSyllabus === section.id ? "angle-up" : "angle-down"
                  }
                  className="text-gray-600"
                />
              </div>
              {activeSyllabus === section.id && (
                <ul className="list-disc list-inside text-blue-700 text-lg font-semibold ml-4">
                  {section.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl shadow-2xl md:p-8 p-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="mr-2 text-blue-500"
            />
            Course Curriculum
          </h1>
          <ul className="space-y-4">
            {courseDetails.curriculum.map((item) => (
              <li
                key={item.id}
                className="flex items-center text-gray-900 md:text-xl text-lg font-semibold"
              >
                {item.isLocked ? (
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-red-500 mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="text-green-500 mr-2 cursor-pointer hover:text-blue-500"
                  />
                )}
                <span
                  className={item.isLocked ? "text-gray-500" : "text-gray-900"}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md shadow-2xl md:p-8 p-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="mr-2 text-blue-500"
            />
            Q&A
          </h1>
          <div className="space-y-4">
            {courseDetails.qa.map((item) => (
              <div key={item.id} className="border rounded-md md:p-4 p-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleActiveSyllabus(item.id)}
                >
                  <h3 className="text-red-600 md:text-xl text-lg font-semibold">
                  <span className="font-bold text-red-900">Question :- </span>
                    {item.question}
                  </h3>
                  <FontAwesomeIcon
                    icon={
                      activeSyllabus === item.id ? "angle-up" : "angle-down"
                    }
                    className="text-gray-600"
                  />
                </div>
                {activeSyllabus === item.id && (
                  <p className="text-blue-700 mt-2 text-lg md:text-xl"><span className="font-bold text-green-500">Answer :- </span>{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
