// External Modules
import { useContext, useState } from "react";

// Local Modules
import { APIsContext } from "@/contexts/APIs";
import api from "@utils/api";

// Assets
import CloseIcon from "@icons/Close.svg";

function Modal({ url, file, neutralizeModal }) {
  // Declarations
  const { SET_PROFILE_API_CALLED } = useContext(APIsContext);
  const [ERROR, SET_ERROR] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      SET_PROFILE_API_CALLED(true);
      const res = await api("PUT", "u/put/p/profilePicture", true, formData);
      if (res.isSuccess) {
        window.location.reload();
      }
    } catch (error) {
      SET_ERROR(error);
    } finally {
      SET_PROFILE_API_CALLED(false);
    }
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background dim */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={neutralizeModal}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-[#c0c0c0] bg-white p-6 shadow-md">
        {/* Close button */}
        <img
          src={CloseIcon}
          alt="Close_Icon"
          width={40}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          onClick={neutralizeModal}
        />

        {/* Title */}
        <h2 className="mb-6 text-center text-sm font-medium text-blue-600">
          Profile Preview
        </h2>

        {/* Profile Picture Preview */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 ring-4 ring-gray-200">
            {url ? (
              <img
                src={url}
                alt="Profile preview"
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-gray-400" />
            )}
          </div>
        </div>

        {ERROR && (
          <p className="text-center text-sm text-red-500 font-semibold mb-2">
            {ERROR}
          </p>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            className="w-40 rounded-full bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
