import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLectureAction } from '../../../../store/Action/lectureAction';

const LectureCard = ({ lecture }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFullScreen = () => {
    setIsFullScreen(true);
    const video = document.getElementById('lecture-video');
    video.requestFullscreen();
  };

  const handleDeleteLecture = () => {
    dispatch(deleteLectureAction(lecture._id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 mr-4 md:w-[22.5%] " style={{  flex: '0 0 auto'}}>
      <div className="mb-2">
        <h4 className="text-lg font-semibold">{lecture.title}</h4>
        <p className="text-gray-500">Lecture no. {lecture.lectureNumber}</p>
      </div>
      <div className="aspect-w-16 aspect-h-9">
        <video onClick={handleFullScreen} id="lecture-video" className="object-cover w-full h-full" controls>
          <source src={lecture.video} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex justify-between mt-2">
        <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Update</button>
        <button onClick={() => setIsDeleteModalOpen(true)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">Delete</button>
        <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Notes</button>
      </div>

      
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this lecture?
            </p>
            <div className="flex justify-end">
              <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 mr-2">
                Cancel
              </button>
              <button onClick={handleDeleteLecture} className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureCard;
