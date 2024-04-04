import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCourseAction } from "../../../store/Action/actionCourse";
import { getAllLecturesAction } from "../../../store/Action/lectureAction";
import { updateUserProfileAction } from "../../../store/Action/actionUser";
import { RiVideoLine } from "react-icons/ri";

export default function Gallery() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [videoLengths, setVideoLengths] = useState({});
  const [currentVideo, setCurrentVideo] = useState("");
  const [watchedVideos, setWatchedVideos] = useState([]);

  // Ref to track watched videos
  const watchedVideosRef = useRef([]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Initialize watchedVideos with the user's watched videos from the Redux store
    setWatchedVideos(user.watchedVideos || []);

    // Fetch courses and lectures
    // dispatch(getAllCourseAction())
    //   .then(() => setLoading(false))
    //   .catch((error) => {
    //     console.error("Error fetching courses:", error);
    //     setLoading(false);
    //   });
    dispatch(getAllLecturesAction())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching lectures:", error);
        setLoading(false);
      });
  }, [dispatch, user.watchedVideos]);

  const lectures = useSelector((state) => state.lecture.lectures.lectures);
  const courseLectures = lectures.filter(
    (lecture) => lecture.course === courseId
  );

  // console.log("Ram");

  const getVideoLength = async (url) => {
    const video = document.createElement("video");
    video.src = url;
    return new Promise((resolve, reject) => {
      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        resolve(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      });
      video.addEventListener("error", (e) => {
        reject(e);
      });
    });
  };

  const currVedio = useSelector((state) => state.user.user.currentVideo);
  const curr = lectures.find((lecture) => lecture._id === currVedio);

  useEffect(() => {
    if (curr) {
      setCurrentVideo(curr.video);
    }
  }, [lectures, curr]);

  // console.log("Ram");

  useEffect(() => {
    const fetchVideoLengths = async () => {
      const lengths = {};
      for (let lecture of courseLectures) {
        try {
          const length = await getVideoLength(lecture.video);
          lengths[lecture._id] = length;
        } catch (error) {
          console.error("Error fetching video length:", error);
        }
      }
      setVideoLengths(lengths);
    };

    fetchVideoLengths();
  }, []);

  const userId = useSelector((state) => state.user.user._id);

  const calculateNinetyPercentDuration = async (videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration;
        resolve(duration * 0.9);
      });
      video.addEventListener("error", (e) => {
        reject(e);
      });
      video.load();
    });
  };

  const handleClick = async (lecture) => {
    setCurrentVideo(lecture.video);

    // Calculate the 90% duration of the video
    const ninetyPercentDuration = await calculateNinetyPercentDuration(
      lecture.video
    );

    // Add event listener to track progress
    const videoElement = document.getElementById("videoPlayer");
    videoElement.addEventListener("timeupdate", function () {
      if (
        videoElement.currentTime >= ninetyPercentDuration &&
        !watchedVideosRef.current.includes(lecture._id)
      ) {
        const updatedWatchedVideos = [...watchedVideosRef.current, lecture._id];
        watchedVideosRef.current = updatedWatchedVideos; // Update the ref

        // Update the state using the latest value from the ref
        setWatchedVideos(updatedWatchedVideos);

        // Dispatch an action to update the user's watched videos
        dispatch(
          updateUserProfileAction(userId, {
            name: user.name,
            email: user.email,
            watchedVideos: updatedWatchedVideos,
            currentVideo:
              updatedWatchedVideos.length > 0
                ? updatedWatchedVideos[updatedWatchedVideos.length - 1]
                : null,
          })
        );
      }
    });

    // Play the video when it's loaded
    videoElement.play();
  };

  const courseName = useSelector((state) => {
    const course = state.course.course.data.find(
      (course) => course._id === courseId
    );
    return course ? course.title : "";
  });

  const image =
    "https://imgs.search.brave.com/OGwUKxpBFhBzj2jEgFM6U7OfIuQYVzC6HJz3T8WU4GA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi93ZWIt/ZGV2ZWxvcG1lbnQt/d29yZC1jbG91ZC1j/b25jZXB0LWdyZXkt/YmFja2dyb3VuZC04/ODY1MDYyNC5qcGc";


    
    
  return (
    <div className="md:pt-[15vh] flex md:flex-row flex-col w-full h-full pt-[7vh]">
      {/* ///////////////////////// */}

      <div className="w-screen flex md:h-screen h-50vh flex-row md:mx-5 mx-0">
        <div className="w-full md:h-3/4 h-full">
          {/* <video controls className="w-full h-5/6">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
          <video
            id="videoPlayer"
            key={currentVideo}
            controls
            className="w-full md:h-full h-[30vh] object-contain"
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div class="flex justify-between md:pt-[6vh] md:pb-0 pt-2 pb-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a target="_blank" href="#">Download Resources</a>
            </button>
          
          </div>

          {/* <h3 className="text-2xl p-2 font-semibold">{courseName}</h3> */}
        </div>
      </div>

      {/* ///////////////////////// */}
      <div
        className="md:w-3/6 w-full shadow-lg shadow-gray-600 overflow-y-scroll flex flex-col  mr-5  border-slate-200 border-2 rounded-lg"
        style={{
          height: "calc(min(38vw, 650px), 60vh)",
          maxHeight: "80vh",
        }}
      >
        <h3 className=" text-2xl p-2 font-semibold">{courseName}</h3>
        {courseLectures.map((lecture, index) => (
          <div
            key={index}
            className="hover:bg-gray-300 hover:cursor-pointer md:p-2 pl-3 pr-3 border-2 rounded-xl h-2/6 shadow-xl shadow-gray-300"
            onClick={() => handleClick(lecture)}
          >
            <img className=" w-[35%] h-20 my-4 mx-2 float-left" src={image} />

            <p className="ml-2 font-semibold pt-6 pl-8 text-sm">
              <span>{lecture.lectureNumber}</span>. {lecture.title}
              <input
                type="checkbox"
                checked={watchedVideos.includes(lecture._id)}
                className="float-right form-checkbox h-4 w-4 text-blue-500"
                readOnly
              />
            </p>

            <span className="ml-auto text-blue-500">
              <RiVideoLine className="inline-block" /> {/* Video icon */}
              {/* Video length */}
              {videoLengths[lecture._id]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
