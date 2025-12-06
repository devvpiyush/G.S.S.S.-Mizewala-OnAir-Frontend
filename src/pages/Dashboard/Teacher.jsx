// React Hooks
import { useState } from "react";

// Local Components
import Notification from "./components/Notification";
import NotificationModal from "./components/NotificationModal";
import Tools from "./components/Tools";

function Teacher() {
  const [MODAL_STATE, UPDATE_MODAL_STATE] = useState("hidden");
  function handleModalState() {
    if (MODAL_STATE === "hidden") {
      UPDATE_MODAL_STATE("visible");
    } else {
      UPDATE_MODAL_STATE("hidden");
    }
  }

  return (
    <>
      <Notification UPDATE_MODAL_STATE={handleModalState} />
      {MODAL_STATE === "visible" && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40"></div>
          <div className="flex items-center justify-center fixed inset-0 z-50">
            <NotificationModal UPDATE_MODAL_STATE={UPDATE_MODAL_STATE} />
          </div>
        </>
      )}
      <Tools />
    </>
  );
}

export default Teacher;
