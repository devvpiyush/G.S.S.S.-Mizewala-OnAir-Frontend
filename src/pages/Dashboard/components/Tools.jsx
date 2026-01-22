// External Modules
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Local Modules
import styles from "./styles/Tools.module.css";

// Assets
import MarkerIcon from "@icons/Marker.svg";
import MusicIcon from "@icons/Music.svg";

function Tools() {
  const SP_INFO = useSelector((store) => store.SPECIAL_IDENTITY);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white p-8 rounded-sm flex flex-row items-center justify-between overflow-x-auto gap-8 scroll-smooth">
      {SP_INFO.teacherInfo.assignedClass !== null && (
        <div className={styles.outline}>
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <img src={MarkerIcon} alt="Marker Icon" className="max-w-10" />
              <h4 className="text-center font-semibold">Marker</h4>
            </div>
            <div>
              <p className="text-center font-light text-[15px] px-3">
                Marker tool developed by G.S.S.S. Mirzewala is a tool that
                allows Class Teachers to Mark attendence of Students of their
                class on a daily basic as Present or Absent.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center py-3">
            <button
              className={styles.BUTTON}
              onClick={() => {
                navigate("/dashboard/marker");
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tools;
