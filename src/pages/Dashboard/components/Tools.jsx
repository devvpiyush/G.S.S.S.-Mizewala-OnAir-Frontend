// External Modules
import { Link } from "react-router-dom";

// Assets
import MusicIcon from "@icons/Music.svg";

function Tools() {
  return (
    <div className="w-full px-6 py-4 flex flex-row items-center bg-white rounded-lg">
      <Link to="/music">
        <div className="flex flex-col items-center jusify-center gap-1 cursor-pointer">
          <img src={MusicIcon} alt="Music_Icon" width={28} height={28} />
          <p className="text-sm font-medium">Music</p>
        </div>
      </Link>
    </div>
  );
}

export default Tools;
