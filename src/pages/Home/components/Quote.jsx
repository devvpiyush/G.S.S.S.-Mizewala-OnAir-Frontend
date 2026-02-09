import { useEffect, useState } from "react";
import api from "@utils/api";

function Quote() {
  const [QUOTE, SET_QUOTE] = useState();

  async function fetchQuote() {
    try {
      const response = await api("GET", "public/quote", false);
      if (response.isSuccess) {
        SET_QUOTE(response.data);
      }
    } catch (error) {
      SET_QUOTE("Teachers plant seeds of knowledge that grow forever.");
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="rounded-[7px] p-6 bg-white flex items-center justify-center flex-col gap-3.5">
      <h1 className="text-3xl border-b-2 border-b-gray-800">
        Quote of The Day
      </h1>
      <p className="text-xl text-center max-sm:text-lg">"{QUOTE}"</p>
    </div>
  );
}

export default Quote;
