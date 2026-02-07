// External Modules
import { useRef } from "react";

// Assets
import UploadIcon from "@icons/Upload.svg";

function Upload({ neutralizeModal, setUrl, setFile }) {
  // Constants, References & States
  const fileInputRef = useRef(null);

  // Handle file selection
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // store file for upload
      const imageUrl = URL.createObjectURL(selectedFile);
      setUrl(imageUrl); // show preview immediately
      neutralizeModal();
    }
  }

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Upload button */}
      <img
        src={UploadIcon}
        alt="Upload Icon"
        width={35}
        className="cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      />
    </>
  );
}

export default Upload;
