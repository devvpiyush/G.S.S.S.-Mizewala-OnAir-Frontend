// React Router (Components)
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import Home from "@icons/Home.svg";
import Gallery from "@icons/Gallery.svg";
import Dashboard from "@icons/Dashboard.svg";
import About from "@icons/About.svg";
import Notifications from "@icons/Notifications.svg";

function Navigation() {
  const USER = useSelector((store) => store.USER);
  return (
    <div className="flex md:hidden fixed bottom-0 w-full items-center justify-between px-8 pt-4 pb-6 bg-white gap-1">
      <div>
        <Link to="/">
          <img src={Home} alt="Home" width={25} />
        </Link>
      </div>
      <div>
        <Link to="/gallery">
          <img src={Gallery} alt="Gallery" width={25} />
        </Link>
      </div>
      {USER.userType !== "GUEST" ? (
        <div>
          <Link to="/dashboard">
            <img src={Dashboard} alt="Dashboard" width={25} />
          </Link>
        </div>
      ) : null}
      <div>
        <Link to="/about">
          <img src={About} alt="About" width={25} />
        </Link>
      </div>
      <div>
        <Link to="/notifications">
          <img src={Notifications} alt="Notifications" width={25} />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
