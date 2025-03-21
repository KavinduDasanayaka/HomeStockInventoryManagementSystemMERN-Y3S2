import React, { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const UploadImage = ({ avatar, setAvatar }) => {
  const fileRef = useRef(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileName, setFileName] = useState("Not selected file");

  const handleFileUpload = (file) => {
    if (!file) return;

    setFileName(file.name);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("File upload error: ", error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatar(downloadURL);
        });
      }
    );
  };

  return (
    <div className="flex items-center space-x-4 file:p-4 rounded-lg">
      {/* Upload section */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="w-full h-[200px] border-2 border-dashed border-blue-500 rounded-lg p-4 flex flex-col items-center justify-center bg-blue-50">
          <svg
            className="text-blue-500 h-16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" />
          </svg>
          <p className="text-center text-gray-700">Browse File to upload!</p>
        </div>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Upload Image
        </button>

        {filePerc > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${filePerc}%` }}
            ></div>
          </div>
        )}

        {fileUploadError && (
          <p className="text-red-600 font-semibold mt-2">
            File upload failed. Please try again.
          </p>
        )}
      </div>

      {/* Uploaded image section */}
      {avatar && (
        <div className="flex justify-center items-center">
          <img
            src={avatar}
            alt="Uploaded"
            className="rounded-lg w-[300px] h-[300px] object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
