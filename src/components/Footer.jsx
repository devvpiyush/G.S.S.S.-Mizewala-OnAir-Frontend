// React Router (Components)
import { Link } from "react-router-dom";

// Icons
import Instagram from "@social/Instagram.svg";
import X from "@social/X.svg";
import Threads from "@social/Threads.svg";

function Footer() {
  return (
    <div className="w-full p-8 py-6 bg-white">
      <div className="flex items-center justify-center pb-3">
        <p className="font-semibold text-base md:text-lg text-center">
          <span className="font-semibold" style={{ color: "var(--primary)" }}>
            Govt. Sen. Sec. School&nbsp;
          </span>
          <span className="font-semibold" style={{ color: "var(--secondary)" }}>
            Mirzewala (335038),&nbsp;
          </span>
          Sri Ganganagar - Rajasthan.
        </p>
      </div>
      <hr className="text-gray-300" />
      <div className="flex items-center justify-between flex-col md:flex-row pt-4">
        <div className="hidden md:flex flex-wrap gap-x-8 items-center">
          <Link
            to="/about"
            className="font-semibold text-gray-400 transition-colors duration-300 ease-in-out hover:text-[royalblue]"
          >
            Who we are?
          </Link>
          <Link
            to="/release_notes"
            className="font-semibold text-gray-400 transition-colors duration-300 ease-in-out hover:text-[royalblue]"
          >
            Release Notes
          </Link>
          <Link
            to="/credits"
            className="font-semibold text-gray-400 transition-colors duration-300 ease-in-out hover:text-[royalblue]"
          >
            Credits
          </Link>
        </div>
        <div className="flex items-center justify-end gap-4 md:gap-6">
          <Link target="_blank" to="https://www.instagram.com/gsssmirzawala/">
            <img
              src={Instagram}
              width={25}
              alt="Instragram_Icon"
              className="cursor-pointer"
            />
          </Link>
          <img src={X} width={25} alt="X_Icon" className="cursor-pointer" />
          <img
            src={Threads}
            width={25}
            alt="Threads_Icon"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
