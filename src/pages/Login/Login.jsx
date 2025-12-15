// External Modules
import { Form, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Local Modules
import { useBSF } from "@hooks/SecurityHooks";
import API_Loader from "@components/API_Loader";
import API_Status from "@components/API_Status";
import { User_Actions } from "@/store/slices/UserSlice";
import useHead from "@hooks/Head.jsx";

// Utilities
import api from "@utils/api";

// Icons
import Open_Eye from "@icons/Open_Eye.svg";
import Close_Eye from "@icons/Close_Eye.svg";

// Styles
import styles from "./Login.module.css";

function Login() {
  useHead({
    title: "Login | G.S.S.S. Mirzewala",
  });
  // Declarations
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [USTA_PIN, SET_USTA_PIN] = useState("");
  const [Password, SET_Password] = useState("");

  const [API_CALLED, SET_API_CALLED] = useState(false);
  const [ERROR, SET_ERROR] = useState(null);

  const [Password_Visibility, SET_Password_Visibility] = useState("hidden");
  const [Eye_Icon_Visibility, SET_Eye_Icon_Visibility] = useState("hidden");

  // References
  const EyeIcon = useRef();

  // Functions
  function handleSkip() {
    navigate("/");
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    // Sanitizing Data
    const ustaPin = useBSF(USTA_PIN);
    const password = useBSF(Password);

    try {
      SET_API_CALLED(true);
      const response = await api("POST", "auth/login", true, {
        ustaPin,
        password,
      });
      if (response.status === 200 && response.data.success) {
        const { name, userType, gender, photoUrl } = response.data.mongodata;
        if (userType === "STD") {
          const { studentRef } = response.data.mongodata;
          dispatch(
            User_Actions.SET_USER({
              name,
              userType,
              gender,
              studentRef,
              photoUrl,
            })
          );
        } else if (userType === "TCH") {
          const { teacherRef } = response.data.mongodata;
          dispatch(
            User_Actions.SET_USER({
              name,
              userType,
              gender,
              teacherRef,
              photoUrl,
            })
          );
        } else {
          const { adminRef } = response.data.mongodata;
          dispatch(
            User_Actions.SET_USER({
              name,
              userType,
              gender,
              adminRef,
              photoUrl,
            })
          );
        }
        navigate("/");
      } else {
        SET_ERROR(response.data.message);
      }
    } catch (error) {
      SET_ERROR(error.message);
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
    // navigate("/"); Navigate if User if LoggedIn
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
        {ERROR !== null && <API_Status type="error" message={ERROR} />}
        <div className="flex flex-col gap-4 mt-4">
          {API_CALLED && <API_Loader />}
          <button
            type="submit"
            className={`bg-black text-white font-inter w-fit rounded-sm cursor-pointer font-semibold px-12 py-2`}
          >
            {ERROR !== null ? "Retry" : "Login"}
          </button>
        </div>
      </Form>
      <div className="w-full flex flex-row justify-between">
        <Link to="/help">
          <button className="text-base font-semibold font-inter cursor-pointer px-2">
            Need Help?
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
