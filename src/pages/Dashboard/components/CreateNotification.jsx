// React Hooks
import { useRef, useState } from "react";

// React Redux (Hooks)
import { useSelector } from "react-redux";

// Reacr Router (Components)
import { Form, Link } from "react-router-dom";

// Icons
import Image from "@icons/Image.svg";
import Send from "@icons/Send.svg";
import Synchronize from "@icons/Synchronize.svg";

function CreateNotification() {
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  // Who can see the Notification?
  const [CAN_VIEW, SET_CAN_VIEW] = useState("Who can see your Notification?");

  function handleViewChanger() {
    if (CAN_VIEW === "Everyone") {
      SET_CAN_VIEW("Staff");
    } else if (CAN_VIEW === "Staff") {
      SET_CAN_VIEW("Schoolies");
    } else {
      SET_CAN_VIEW("Everyone");
    }
  }

  // Image Selector
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file selection
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  }

  return (
    <Form className="bg-white border-1 border-[#c0c0c0] rounded-[10px]">
      <div className="flex items-start gap-3 p-3">
        <img width={40} height={40} src={USER.avatarUrl} alt="Avatar" />
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
              className="w-full min-h-20 max-h-50 outline-none font-normal text-black resize-none"
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                width={150}
                className="rounded-sm"
              />
            )}
          </div>
          <div>
            {/* Hidden input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {/* Gallery Icon - Triggers file Selector */}
            <img
              src={Image}
              width={20}
              alt="Upload_Image"
              className="cursor-pointer mt-2"
              onClick={() => {
                fileInputRef.current.click();
              }}
            />
          </div>
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
    </Form>
  );
}

export default CreateNotification;
