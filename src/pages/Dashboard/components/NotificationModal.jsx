// React Hooks
import { useRef, useState } from "react";

// React Redux (Hooks)
import { useSelector } from "react-redux";

// Reacr Router (Components)
import { Form, Link } from "react-router-dom";

// Icons
import Avatar from "@/assets/public/Avatar.svg";
import Clock from "@icons/Clock.svg";
import Image from "@icons/Image.svg";
import Send from "@icons/Send.svg";
import Synchronize from "@icons/Synchronize.svg";

function NotificationModal({ UPDATE_MODAL_STATE }) {
  const USER = useSelector((store) => store.USER);
  // Who can see the Notification?
  const [CAN_VIEW, SET_CAN_VIEW] = useState("Who can see your Notification?");

  function handleViewChanger() {
    if (CAN_VIEW === "Everyone") {
      SET_CAN_VIEW("Staff");
    } else if (CAN_VIEW === "Staff") {
      SET_CAN_VIEW("Schoolies");
    } else if (CAN_VIEW === "Schoolies") {
      SET_CAN_VIEW("Non-Schoolies");
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
    <Form
      method="POST"
      className="bg-white min-w-[500px] max-md:min-w-[350px] max-w-[500px] max-md:max-w-[350px] rounded-[10px] shadow-lg"
    >
      <div className="flex items-center justify-between py-3 px-4">
        <button
          type="button"
          className="font-semibold text-red-500 cursor-pointer"
          onClick={() => UPDATE_MODAL_STATE("hidden")}
        >
          Cancel
        </button>
        <p className="font-semibold">Release Notification</p>
        <img src={Clock} width={25} alt="Clock" className="cursor-pointer" />
      </div>
      <hr />
      <div className="flex items-start gap-3 p-3">
        <img src={Avatar} alt="Avatar" />
        <div className="w-full flex flex-col">
          <Link to="" className="font-semibold">
            {USER.name}
          </Link>
          <div>
            <textarea
              id="content"
              name="content"
              autoComplete="off"
              placeholder="What's new?"
              required
              className="w-full min-h-30 max-md:min-h-10 max-h-50 outline-none font-semibold text-[#c0c0c0] resize-none"
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
              alt="Add_Image"
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
          className="flex gap-2 font-semibold text-[#c0c0c0] cursor-pointer"
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

export default NotificationModal;
