import React, { useEffect, useState } from 'react';
import AdminDashboard from '../../AdminDashboard';
import LectureCard from './LectureCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseAction } from '../../../../store/Action/actionCourse';
import { getAllLecturesAction } from '../../../../store/Action/lectureAction';

function AllLectures() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null); // Initialize course state with null

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

    // Use the useSelector hook to access the courses state from Redux
    const courses = useSelector(state => state.course.course.data);

    // Find the course with the matching courseId
    useEffect(() => {
        if (courses && courses.length > 0) {
            const foundCourse = courses.find(course => course._id === courseId);
            setCourse(foundCourse);
        }
    }, [courses, courseId]);

    // Use the lectures state from Redux
    const lectures = useSelector((state) => state.lecture.lectures.lectures);

    // Filter lectures for the current course
    const courseLectures = lectures.filter(lecture => lecture.course === courseId);

    return (
        <>
            {course && (
                <h2 className='text-white pb-2 text-center font-semibold md:text-2xl text-xl bg-gray-800'>{course.title}</h2>
            )}
            <div className='md:pt-[8vh] flex h-auto'>
                <AdminDashboard />
                <div className="flex flex-wrap md:flex-row flex-col h-auto">
                    {courseLectures.map((lecture) => (
                        <LectureCard
                            key={lecture._id}
                            lecture={lecture}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllLectures;
