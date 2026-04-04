import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      return alert("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/api/videos/upload`,
        formData,
        { withCredentials: true }
      );

      alert("Uploaded successfully");

     
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Upload Video</h2>

         
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleUpload}>

        
          <input
            placeholder="Enter video title"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          
          <div className="mb-4 border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="fileUpload"
            />

            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="text-gray-500">
                {file ? file.name : "Click to select a video"}
              </p>
            </label>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg "
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>

        </form>
      </div>
    </div>
  );
}