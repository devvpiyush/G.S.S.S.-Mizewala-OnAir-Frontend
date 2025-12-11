// React Redux (Hooks)
import { useSelector } from "react-redux";

// React Router (Components)
import { Link } from "react-router-dom";

// Icons
import Home from "@icons/Home.svg";
import Gallery from "@icons/Gallery.svg";
import Dashboard from "@icons/Dashboard.svg";
import About from "@icons/About.svg";
import Notifications from "@icons/Notifications.svg";

// Assets
import Avatar from "@/assets/public/Avatar.svg";

function Navbar() {
  const USER = useSelector((store) => store.USER);
  return (
    <nav className="flex items-center justify-between w-full p-4 bg-white shadow-md">
      <div>
        <span
          className="text-xl font-semibold"
          style={{ color: "var(--primary)" }}
        >
          G.S.S.S.{" "}
        </span>
        <span
          className="text-xl font-semibold"
          style={{ color: "var(--secondary)" }}
        >
          Mirzewala
        </span>
      </div>
      <div className="flex items-center gap-8">
        <div className="hidden md:block cursor-pointer">
          <Link to="/">
            <img src={Home} width={25} alt="Home" />
          </Link>
        </div>
        <div className="hidden md:block cursor-pointer">
          <Link to="/gallery">
            <img src={Gallery} width={25} alt="Gallery" />
          </Link>
        </div>
        {USER.userType !== "GUEST" ? (
          <div className="hidden md:block cursor-pointer">
            <Link to="/dashboard">
              <img src={Dashboard} width={25} alt="Dashboard" />
            </Link>
          </div>
        ) : null}
        <div className="hidden md:block cursor-pointer">
          <Link to="/about">
            <img src={About} width={25} alt="About" />
          </Link>
        </div>
        <div className="hidden md:block cursor-pointer">
          <Link to="/notifications">
            <img src={Notifications} width={25} alt="Notifications" />
          </Link>
        </div>
        <Link to={USER.userType === "GUEST" ? "/login" : "/profile"}>
          <button
            className={`flex items-center justify-center border-1 rounded-full p-1 px-2 gap-2 cursor-pointer`}
            type="button"
          >
            <img
              src={Avatar}
              width={24}
              height={24}
              alt="Avatar"
              loading="lazy"
            />
            <span className="font-semibold text-md">
              {USER.userType === "GUEST" ? "Login" : USER.name}
            </span>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
