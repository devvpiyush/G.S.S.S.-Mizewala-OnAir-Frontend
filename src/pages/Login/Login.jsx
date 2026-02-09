// External Modules
import { Form, Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Local Modules
import { useBSF } from "@hooks/SecurityHooks";
import API_Loader from "@components/API_Loader";
import useHead from "@hooks/Head.jsx";
import { APIsContext } from "@/contexts/APIs";
import api from "@utils/api";
import { SpecialIdentityActions } from "@/store/slices/SpecialIdentitySlice";
import { CommonIdentityActions } from "@/store/slices/CommonIdentitySlice";

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
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  const { LOGIN_API_CALLED, SET_LOGIN_API_CALLED, AUTH_API_CALLED } =
    useContext(APIsContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [MI_PIN, SET_MI_PIN] = useState("");
  const [Password, SET_Password] = useState("");
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
    const miPin = useBSF(MI_PIN);
    const password = useBSF(Password);

    try {
      SET_ERROR(null);
      SET_LOGIN_API_CALLED(true);
      const response = await api("POST", "auth/login", true, {
        miPin,
        password,
      });
      let refObj = response.data.reference;
      delete response.data.reference;
      dispatch(
        CommonIdentityActions.SETUP_NEW_USER({
          ...response.data,
        }),
      );
      if (response.data.userType === "Teacher") {
        dispatch(
          SpecialIdentityActions.SETUP_TEACHER({
            ...refObj,
          }),
        );
      } else if (response.data.userType === "Student") {
        dispatch(
          SpecialIdentityActions.SETUP_STUDENT({
            ...refObj,
          }),
        );
      } else if (response.data.userType === "Admin") {
        dispatch(
          SpecialIdentityActions.SETUP_ADMIN({
            ...refObj,
          }),
        );
      }
      navigate("/");
    } catch (error) {
      SET_ERROR(error?.message || "Something went wrong!");
    } finally {
      SET_LOGIN_API_CALLED(false);
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
    if (!AUTH_API_CALLED && USER.isLoggedIn) {
      navigate("/");
    }
  }, [AUTH_API_CALLED, navigate]);

  return (
    <div className={styles.App}>
      <Form
        className="w-full flex flex-col items-start"
        onSubmit={handleOnSubmit}
      >
        <div className="px-2 w-full flex justify-end">
          <a
            className="text-blue-600 font-semibold cursor-pointer"
            style={{ fontFamily: "'Saira', sans-serif" }}
            onClick={handleSkip}
          >
            Skip
          </a>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <h2
            className="text-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Welcome back!
          </h2>
          <p
            className="text-sm font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We're glad to see you again. Let's get started!
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 py-2 mt-10">
          <div className="w-[95%] flex flex-col gap-2">
            <label
              htmlFor="miPin"
              className="text-base font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              MI PIN
            </label>
            <div className="w-[100%] flex flex-row items-center gap-2 pr-2 border-2 border-[#c0c0c0] rounded-sm shadow-sm hover:border-blue-600 transition-colors ease-in-out duration-300">
              <input
                type="text"
                className={styles.INPUTS}
                required
                id="miPin"
                value={MI_PIN}
                minLength={11}
                maxLength={11}
                onChange={(e) => SET_MI_PIN(e.target.value)}
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
          {LOGIN_API_CALLED && <API_Loader />}
          <button
            type="submit"
            className="bg-black text-white w-fit rounded-sm cursor-pointer font-semibold px-12 py-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {ERROR !== null ? "Retry" : "Login"}
          </button>
        </div>
      </Form>
      <div className="w-full flex flex-row justify-between">
        <Link to="/help">
          <button
            className="text-base font-semibold cursor-pointer px-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Need Help?
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
