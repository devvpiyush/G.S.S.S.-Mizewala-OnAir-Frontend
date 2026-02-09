// External Modules
import { format, getYear } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Graphics
import Holiday_Light from "@graphics/Holiday_Light.svg";

// Local Modules
import { APIsContext } from "@/contexts/APIs";
import { useHoliday } from "@hooks/ContextHooks";
import MarkerStudentRow from "./components/MarkerStudentRow";
import Preview from "../Dashboard/components/Preview";
import Message from "@components/Message";
import useHead from "@hooks/Head.jsx";
import { MarkerActions } from "@/store/slices/MarkerSlice";
import api from "@utils/api";

function Marker() {
  // Declarations
  const { AUTH_API_CALLED } = useContext(APIsContext);
  const SP_USER = useSelector((store) => store.SPECIAL_IDENTITY);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const [MESSAGE, SET_MESSAGE] = useState();
  const [PREVIEW_STATE, UPDATE_PREVIEW_STATE] = useState("hidden");
  const [STD_LIST, UPDATE_STD_LIST] = useState([]);

  useHead({
    title: "Marker | G.S.S.S. Mirzewala",
  });

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

  async function callAPI() {
    const response = await api(
      "GET",
      `t/marker/class/${SP_USER.teacherInfo.assignedClass}`,
    );
    if (response.isSuccess) {
      UPDATE_STD_LIST(response.data);
    }
  }

  useEffect(() => {
    if (!AUTH_API_CALLED && SP_USER.teacherInfo.assignedClass === null) {
      navigate("/");
    }

    callAPI();

    SET_MESSAGE(GetNotificationMessage());
  }, []);

  function handleMarkAttendence(entry) {
    UPDATE_STD_LIST(
      STD_LIST.map((STD) => {
        if (STD._id === entry.ID) {
          return { ...STD, marked: true };
        }
        return STD;
      }),
    );
    dispatch(MarkerActions.Mark(entry));
  }

  // Using Hooks
  const { isHoliday } = useHoliday();

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
              Class {SP_USER.teacherInfo.assignedClass}
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
                  <Preview
                    UPDATE_PREVIEW_STATE={handlePreview}
                    assignedClass={SP_USER.teacherInfo.assignedClass}
                  />
                </div>
              </>
            )}
            {STD_LIST.map((info) => {
              return (
                <MarkerStudentRow
                  _id={info._id}
                  name={info.name}
                  profilePictureUrl={info.profilePictureUrl}
                  fatherName={info.reference.fatherName}
                  isMarked={info.marked}
                  Mark={handleMarkAttendence}
                  key={info._id}
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
