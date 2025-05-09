import "./style.css";
import React, { useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const FileUpload = ({ photoImage, onFileChange }) => {
  const initialImageUrl =
    "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"; // Replace with your actual initial image URL

  const [backgroundImage, setBackgroundImage] = useState(photoImage || initialImageUrl); // Use initialImageUrl or passed photoImage
  const fileInputRef = useRef(null);

  // Open file input dialog when the icon is clicked
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result); // Set preview of the image
      };
      reader.readAsDataURL(file);

      // Send the file back to the parent component
      onFileChange(file); // Pass the file to the parent to handle uploading
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-9 lg:py-20">
        <div className="flex justify-center">
          <div
            className="w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48"
            onClick={handleIconClick}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${backgroundImage})`, // Fallback to default image if no image is found
              position: "relative", // Position relative to position the icon inside
              border: "1px solid #ccc", // Optional: Add a border for better visibility
            }}
          >
            <FaPencilAlt
              size={20}
              style={{
                position: "absolute", // Position the icon absolutely within the div
                bottom: 5, // Position it near the bottom
                right: 5, // Position it near the right edge
                backgroundColor: "white", // Optional: Add background for better visibility
                borderRadius: "50%", // Optional: Make the icon background circular
                padding: 5, // Optional: Add padding around the icon
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*" // Accept only image files
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
