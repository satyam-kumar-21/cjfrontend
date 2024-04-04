import React from 'react';

export default function Video({ video, title }) {
    
    // console.log("props:", video);
    return (
        <div className=" w-screen  flex h-screen flex-row mx-5">
            <div className="w-full h-3/4  mt-4 px-2 pt-2 rounded-xl border-2 border-slate-400">
                {/* <video controls className="w-full h-5/6">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <iframe
                    controls  // Add controls for video playback
                    src={video}
                    className="w-full h-5/6"
                    allowFullScreen  // Allow fullscreen mode
                    title={title}
                ></iframe>
                <div className="mt-1 h-1/3 text-left text-xl text-slate-600">
                    Title: {title}
                </div>

               
                
            </div>

            
        </div>
    );
}