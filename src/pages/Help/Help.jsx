// External Modules
import { Form, Link } from "react-router-dom";
import { useState } from "react";

// Local Modules
import { useBRTSF } from "@hooks/SecurityHooks";
import api from "@utils/api";
import API_Loader from "@components/API_Loader";
import API_Status from "@components/API_Status";
import useHead from "@hooks/Head.jsx";

// Styles
import styles from "./Help.module.css";

// Data
import CardInfo from "@/data/HelpCards";

function Help() {
  useHead({
    title: "Help | G.S.S.S. Mirzewala",
  });
  const [API_CALLED, SET_API_CALLED] = useState(false);
  const [ERROR, SET_ERROR] = useState(null);
  const [SUCCESS, SET_SUCCESS] = useState(null);

  const [Email, SET_Email] = useState("");
  const [Concern, SET_Concern] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    const email = useBRTSF(Email);
    const concern = useBRTSF(Concern);

    try {
      SET_ERROR(null);
      SET_SUCCESS(null);
      SET_API_CALLED(true);
      const response = await api("POST", "help/submit", false, {
        email,
        concern,
      });

      SET_SUCCESS(response.data.message);
      SET_Email("");
      SET_Concern("");
    } catch (error) {
      SET_ERROR(error?.message || "Failed to submit help request");
    } finally {
      SET_API_CALLED(false);
    }
  }
  return (
    <div className={styles.App}>
      <div className="w-full text-end">
        <Link to="/login">
          <span className="text-blue-600 font-semibold cursor-pointer">
            Go Back
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Need Help?</h1>
        <p
          className="font-extralight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Can’t find your concern? Fill out the form below and we’ll get back to
          you shortly!
        </p>
      </div>
      <div className="mt-10">
        <Form onSubmit={handleOnSubmit} className={styles.FORM}>
          <div className="flex flex-col gap-2">
            <label htmlFor="emailInput" className="text-base font-medium">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              value={Email}
              autoComplete="email"
              required
              className={`w-[95%] max-sm:w-full ${styles.INPUTS}`}
              onChange={(e) => SET_Email(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="concernInput" className="text-base font-medium">
              Your Concern
            </label>
            <textarea
              id="concernInput"
              value={Concern}
              autoComplete="off"
              maxLength={10000}
              required
              className={`w-[95%] max-sm:w-full min-h-32 max-h-60 ${styles.INPUTS}`}
              onChange={(e) => SET_Concern(e.target.value)}
            ></textarea>
          </div>
          {ERROR !== null && <API_Status type="error" message={ERROR} />}
          {SUCCESS !== null && <API_Status type="success" message={SUCCESS} />}
          {API_CALLED ? (
            <API_Loader />
          ) : (
            <button
              type="submit"
              className="bg-black text-white w-fit rounded-sm cursor-pointer font-semibold px-6 py-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {ERROR !== null ? "Retry" : "Submit"}
            </button>
          )}
        </Form>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl text-center">FAQs</h1>
        <div className={styles.CARDS_CONTAINER}>
          {CardInfo.map((Card) => {
            return (
              <div className={styles.CARDS} key={Card.SERIAL_NUMBER}>
                <span className={styles.CIRCLES}>{Card.SERIAL_NUMBER}</span>
                <h2 className="font-semibold">{Card.QUESTION}</h2>
                <p
                  className="font-light text-lg"
                  style={{ fontFamily: "'Saira', sans-serif" }}
                >
                  <strong className="font-semibold">Ans: </strong>
                  {Card.ANSWER}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Help;
