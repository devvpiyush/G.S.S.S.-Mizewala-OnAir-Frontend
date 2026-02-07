// External Modules
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Local Modules
import api from "@utils/api.js";
import { useBRTSF } from "@/hooks/SecurityHooks";

// Icons
// import Image from "@icons/Image.svg";
import Send from "@icons/Send.svg";
import Synchronize from "@icons/Synchronize.svg";

function Create() {
  // Declarations
  const USER = useSelector((store) => store.COMMON_IDENTITY);

  // Constants & States
  const [CONTENT, UPDATE_CONTENT] = useState("");
  const [CAN_VIEW, SET_CAN_VIEW] = useState("Who can see your Post?");
  const [ERROR, SET_ERROR] = useState("");
  const [SUCCESS, SET_SUCCESS] = useState("");
  // const fileInputRef = useRef(null);
  // const [selectedImage, setSelectedImage] = useState(null);

  function handleViewChanger() {
    if (CAN_VIEW === "Everyone") {
      SET_CAN_VIEW("Staff");
    } else if (CAN_VIEW === "Staff") {
      SET_CAN_VIEW("Schoolies");
    } else {
      SET_CAN_VIEW("Everyone");
    }
  }

  // Handle file selection
  // function handleFileChange(e) {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    SET_ERROR(null);
    SET_SUCCESS(null);
    if (CAN_VIEW === "Who can see your Post?") {
      SET_ERROR('*Choose "Who can see your Post?".');
    } else {
      const response = await api("POST", "p/create", true, {
        content: useBRTSF(CONTENT),
        showTo: CAN_VIEW,
      });
      if (response.data.isSuccess) {
        UPDATE_CONTENT("");
        SET_CAN_VIEW("Who can see your Post?");
        SET_SUCCESS(response.data.message);
      } else {
        SET_SUCCESS(null);
        SET_ERROR("Failed to Create Post.");
      }
    }
  }

  return (
    <form
      className="bg-white border-1 border-[#c0c0c0] rounded-[10px]"
      onSubmit={handleSubmit}
    >
      <div className="flex items-start gap-3 p-3">
        <img
          width={40}
          height={40}
          src={USER.profilePictureUrl}
          alt="Profile-Picture"
          className="rounded-full"
        />
        <div className="w-full flex flex-col">
          <Link to="" className="font-semibold">
            {USER.name}
          </Link>
          <div>
            <textarea
              id="content"
              name="content"
              autoComplete="off"
              placeholder="What's new to notify?"
              required
              value={CONTENT}
              onChange={(e) => {
                UPDATE_CONTENT(e.target.value);
              }}
              className="w-full min-h-20 max-h-50 outline-none font-normal text-black resize-none"
            />
            {/* {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                width={150}
                className="rounded-sm"
              />
            )} */}
            {ERROR !== "" && (
              <p className="text-red-600 font-semibold">{ERROR}</p>
            )}
            {SUCCESS !== "" && (
              <p className="text-green-700 font-semibold">{SUCCESS}</p>
            )}
          </div>
          {/* <div> */}
          {/* Hidden input */}
          {/* <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            /> */}
          {/* Gallery Icon - Triggers file Selector */}
          {/* <img
              src={Image}
              width={20}
              alt="Upload_Image"
              className="cursor-pointer mt-2"
              onClick={() => {
                fileInputRef.current.click();
              }}
            /> */}
          {/* </div> */}
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <button
          type="button"
          className="flex gap-2 text-[#c0c0c0] font-semibold cursor-pointer"
          onClick={handleViewChanger}
        >
          {CAN_VIEW}
          <img src={Synchronize} width={15} />
        </button>
        <button
          type="submit"
          className="cursor-pointer px-3 w-fit rounded-sm font-semibold"
        >
          <img src={Send} alt="Send" />
        </button>
      </div>
    </form>
  );
}

export default Create;
