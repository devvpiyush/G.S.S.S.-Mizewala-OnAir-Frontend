// External Modules
import axios from "axios";
import { Form, Link } from "react-router-dom";

// React Hooks
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Local Hooks
import { useBSF } from "@hooks/SecurityHooks";

// Icons
import Open_Eye from "@icons/Open_Eye.svg";
import Close_Eye from "@icons/Close_Eye.svg";

// Styles
import styles from "./Login.module.css";

function Login() {
  // Declarations
  const navigate = useNavigate();

  // States
  const [USTA_PIN, SET_USTA_PIN] = useState("");
  const [Password, SET_Password] = useState("");
  const [API_CALLED, SET_API_CALLED] = useState(false);
  const [Password_Visibility, SET_Password_Visibility] = useState("hidden");
  const [Eye_Icon_Visibility, SET_Eye_Icon_Visibility] = useState("hidden");

  // References
  const EyeIcon = useRef();

  // Functions
  function handleSkip() {
    sessionStorage.setItem("Guest", true);
    navigate("/");
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    // Sanitizing Data
    const ustaPin = useBSF(USTA_PIN);
    const password = useBSF(Password);

    // Creating Credentials Object
    const Credentials = {
      ustaPin,
      password,
    };

    try {
      SET_API_CALLED(true);
      const response = await axios.post(
        "https://backend-9gh6.onrender.com/api/auth/login",
        Credentials,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      throw Error(error);
    } finally {
      SET_API_CALLED(false);
    }
  }

  function handlePasswordVisibility() {
    if (Password_Visibility === "hidden") {
      EyeIcon.current.src = Open_Eye;
      EyeIcon.current.alt = "Open_Eye_Icon";
      SET_Password_Visibility("visible");
    } else {
      EyeIcon.current.src = Close_Eye;
      EyeIcon.current.alt = "Close_Eye_Icon";
      SET_Password_Visibility("hidden");
    }
  }

  useEffect(() => {
    const IsUser = sessionStorage.getItem("User");
    if (IsUser) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.App}>
      <Form
        className="w-full flex flex-col items-start"
        onSubmit={handleOnSubmit}
      >
        <div className="px-2 w-full flex justify-end">
          <a
            className={`font-saira text-blue-600 font-semibold cursor-pointer`}
            onClick={handleSkip}
          >
            Skip
          </a>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <h2 className={`font-inter text-2xl`}>Welcome back!</h2>
          <p className={`font-inter text-sm font-light`}>
            We're glad to see you again. Let's get started!
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 py-2 mt-10">
          <div className="w-[95%] flex flex-col gap-2">
            <label
              htmlFor="USTA_PIN"
              className={`text-base font-medium font-inter`}
            >
              USTA PIN
            </label>
            <div className="w-[100%] flex flex-row items-center gap-2 pr-2 border-2 border-[#c0c0c0] rounded-sm shadow-sm hover:border-blue-600 transition-colors ease-in-out duration-300">
              <input
                type="text"
                className={styles.INPUTS}
                required
                id="USTA_PIN"
                value={USTA_PIN}
                minLength={11}
                maxLength={11}
                onChange={(e) => SET_USTA_PIN(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Password"
              className={`text-base font-medium FONT_INTER`}
            >
              Password
            </label>
            <div className="w-[95%] flex flex-row items-center gap-2 pr-3 border-2 border-[#c0c0c0] rounded-sm shadow-sm hover:border-blue-600 transition-colors ease-in-out duration-300">
              <input
                type={Password_Visibility === "visible" ? "text" : "password"}
                className={styles.INPUTS}
                required
                id="Password"
                value={Password}
                minLength={8}
                onChange={(e) => {
                  SET_Password(e.target.value);
                  if (e.target.value.length > 0) {
                    SET_Eye_Icon_Visibility("visible");
                  } else {
                    SET_Eye_Icon_Visibility("hidden");
                  }
                }}
              />
              <div>
                {Eye_Icon_Visibility === "visible" ? (
                  <img
                    src={Close_Eye}
                    ref={EyeIcon}
                    alt="Close_Eye_Icon"
                    className="cursor-pointer"
                    onClick={handlePasswordVisibility}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <button
            type="submit"
            className={
              "bg-black text-white font-inter w-fit rounded-sm cursor-pointer font-semibold px-12 py-2"
            }
            disabled={API_CALLED}
          >
            {API_CALLED ? "Logging in..." : "Login"}
          </button>
        </div>
      </Form>
      <div className="w-full flex flex-row justify-between">
        <Link to="/help">
          <button
            className={`text-base font-semibold font-inter bg-black md:bg-transparent text-white md:text-black py-1 md:py-0 px-2 md:px-0 rounded-sm md:rounded-none cursor-pointer`}
          >
            Need Help?
          </button>
        </Link>
        <Link to="/about">
          <button
            className={`text-base font-semibold font-inter bg-black md:bg-transparent text-white md:text-black py-1 md:py-0 px-2 md:px-0 rounded-sm md:rounded-none cursor-pointer`}
            onClick={handleSkip}
          >
            About
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
