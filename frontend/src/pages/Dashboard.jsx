import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";

const Dashboard =()=> {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/videos`,
        { withCredentials: true }
      );
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async()=>{
    try {
     
     const res = await axios.post(`${API_URL}/api/auth/logout`,{
         withCredentials: true 
     })   

     if(res)
     { 
        localStorage.removeItem("isAuth"); 
        navigate("/");
     }
        
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchVideos();

    socket.emit("join", "temp");

    socket.on("videoProcessed", (updatedVideo) => {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === updatedVideo._id ? updatedVideo : v
        )
      );
    });

    return () => socket.off("videoProcessed");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">🎥 Video Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Upload
          </button>

          <button
            onClick={ handleLogout}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 Content */}
      <div className="p-6 max-w-6xl mx-auto">

        {/* Empty state */}
        {videos.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold mb-2">
              No videos yet 🎬
            </h2>
            <p className="text-gray-500 mb-4">
              Upload your first video to get started
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Upload Video
            </button>
          </div>
        )}

      
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {v.title}
              </h3>

              {/* Status */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    v.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700 animate-pulse"
                  }`}
                >
                  {v.status}
                </span>
              </div>

             
              {v.status === "completed" && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">
                    Sensitivity:
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      v.sensitivity === "safe"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.sensitivity}
                  </span>
                </div>
              )}

             
              {v.status === "completed" ? (
                <video
                  className="w-full rounded-lg"
                  controls
                  src={`${API_URL}/api/videos/stream/${v.filename}`}
                />
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-400 text-sm">
                    Processing video...
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard