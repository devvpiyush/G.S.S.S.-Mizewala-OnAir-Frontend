// Dependencies
import { format, getYear } from "date-fns";

// React Hooks
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Local Hooks
import { useHoliday } from "@hooks/ContextHooks";

// Assets
import Avatar from "@/assets/public/Avatar.svg";

// Graphics
import Holiday_Light from "@graphics/Holiday_Light.svg";

// Local Components
import MarkerStudentRow from "../components/MarkerStudentRow";
import Preview from "../components/Preview";
import Message from "@components/Message";

// Utilities
import api from "@utils/api";

// Redux Slices
import { MarkerActions } from "@/store/slices/MarkerSlice";

function Marker() {
  const [PREVIEW_STATE, UPDATE_PREVIEW_STATE] = useState("hidden");
  const [Class, SetClass] = useState(9);
  const dispatch = useDispatch();

  function handleMarkAttendence(entry) {
    UPDATE_STD_LIST(
      STD_LIST.map((STD) => {
        if (STD.ID === entry.ID) {
          return { ...STD, marked: true };
        }
        return STD; // Return other objects as they are
      })
    );
    dispatch(MarkerActions.Mark(entry));
  }

  // Using Hooks
  const { isHoliday } = useHoliday();

  // States
  const [STD_LIST, UPDATE_STD_LIST] = useState([]);

  const [MESSAGE, SET_MESSAGE] = useState();
  const Messages = [
    "☕ Take a break! Attendance is also sipping chai today.",
    "🏖️ It’s a holiday! If you try marking attendance, even the system will say ‘chill karo’ 😌",
    "📚 School closed, attendance closed, stress also closed. Enjoy!",
    "📵 No attendance today. System on Do Not Disturb mode.",
    "😴 Even our servers are snoring today. Enjoy the holiday!",
    "☕ Attendance ni lagni aaj! System v cha peen baitha ae 😂",
  ];

  function GetNotificationMessage() {
    const RandomNumber = Math.floor(Math.random() * Messages.length);
    return Messages[RandomNumber];
  }

  useEffect(() => {
    api("GET", `tch/get/students/class/${Class}`).then((res) => {
      if (res.status === 200 && res.data.success) {
        UPDATE_STD_LIST(res.data.mongodata);
      }
    });
    SET_MESSAGE(GetNotificationMessage());
  }, []);

  // Preview
  function handlePreview() {
    if (PREVIEW_STATE === "hidden") {
      UPDATE_PREVIEW_STATE("visible");
    } else {
      UPDATE_PREVIEW_STATE("hidden");
    }
  }

  return (
    <>
      {isHoliday === true ? (
        <Message MESSAGE={MESSAGE} Graphic={Holiday_Light} />
      ) : (
        <div className="bg-white rounded-md border-2 border-gray-700">
          <div className="flex items-center justify-between py-3 px-4 max-sm:px-2">
            <span className="text-[#c0c0c0] text-lg max-sm:hidden font-semibold">
              {format(new Date(), "do")} {format(new Date(), "MMM.")}{" "}
              {getYear(new Date())}
            </span>
            <span className="text-lg max-sm:text-base font-semibold text-red-500">
              Class {Class}
            </span>
            <button
              type="button"
              className="font-semibold text-white bg-blue-400 px-3 py-1 rounded-sm cursor-pointer max-sm:text-sm"
              onClick={handlePreview}
            >
              Preview
            </button>
          </div>
          <hr />
          <div className="flex flex-col gap-4 py-3 pl-2 pr-1">
            {PREVIEW_STATE === "visible" && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <Preview UPDATE_PREVIEW_STATE={handlePreview} />
                </div>
              </>
            )}
            {STD_LIST.map((info) => {
              return (
                <MarkerStudentRow
                  Avatar={Avatar} // Temporary
                  USTA_PIN={info.ustaPin}
                  Name={info.name}
                  Father={info.studentRef.fatherName}
                  isMarked={info.marked}
                  key={info.ustaPin}
                  Mark={handleMarkAttendence}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Marker;
