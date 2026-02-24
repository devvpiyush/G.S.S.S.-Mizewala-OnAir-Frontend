// External Modules
import { Link } from "react-router-dom";

// Assets
import MusicIcon from "@icons/Music.svg";
import MarkerIcon from "@icons/Marker.svg";

function Tools() {
  return (
    <div className="w-full px-6 py-4 flex flex-row items-center gap-10 bg-white rounded-lg">
      <Link to="/music">
        <div className="flex flex-col items-center jusify-center gap-1 cursor-pointer">
          <img src={MusicIcon} alt="Music_Icon" width={28} height={28} />
          <p className="text-sm font-medium">Music</p>
        </div>
      </Link>
      <Link to="/marker">
        <div className="flex flex-col items-center jusify-center gap-1 cursor-pointer">
          <img src={MarkerIcon} alt="Music_Icon" width={28} height={28} />
          <p className="text-sm font-medium">Marker</p>
        </div>
      </Link>
    </div>
  );
}

export default Tools;
