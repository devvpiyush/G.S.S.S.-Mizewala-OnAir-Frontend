// React Hooks
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

// Data
import Information from "@/data/Information";

// Local Components
import Intro from "./components/Intro";
import Quote from "./components/Quote";
import Question from "./components/Question";
import NewUpdate from "./components/NewUpdate";
import API from "@utils/API";

function Home() {
  // New Update Notification (Block)
  const [NOTIFY, SET_NOTIFY] = useState();
  const [NEW_UPDATE_DATA, SET_NEW_UPDATE_DATA] = useState(null);

  async function CheckNewUpdate() {
    SET_NEW_UPDATE_DATA(null);
    const response = await API("GET", "public/latestupdate", false);
    if (
      format(new Date(response.data.mongodata.createdAt), "yyyyMMdd") <=
      format(addDays(new Date(), 30), "yyyyMMdd")
    ) {
      SET_NOTIFY(true);
      return response.data.mongodata;
    } else {
      SET_NOTIFY(false);
    }
  }

  useEffect(() => {
    CheckNewUpdate().then((data) => {
      SET_NEW_UPDATE_DATA(data);
    });
  }, []);

  return (
    <>
      {NOTIFY && <NewUpdate SET_NOTIFY={SET_NOTIFY} data={NEW_UPDATE_DATA} />}
      <Quote />
      <Intro />
      {Information.map((Info, Index) => (
        <Question
          key={Index}
          Title={Info.TITLE}
          Hindi_Title={Info.HINDI_TITLE}
          Description={Info.DESCRIPTION}
          Hindi_Description={Info.HINDI_DESCRIPTION}
          Color={Info.COLOR}
        />
      ))}
    </>
  );
}

export default Home;
