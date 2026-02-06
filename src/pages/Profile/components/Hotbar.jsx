// External Modules
import { useRef } from "react";

// Assets
import UploadIcon from "@icons/Upload.svg";

function Hotbar({ neutralizeModal, setUrl, setFile }) {
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
      <div className="px-4 py-2 sm:min-w-[30vw] sm:justify-self-center flex gap-10 sm:gap-20 border border-[#c0c0c0] bg-white rounded-full items-center">
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
      </div>
    </>
  );
}

export default Hotbar;
