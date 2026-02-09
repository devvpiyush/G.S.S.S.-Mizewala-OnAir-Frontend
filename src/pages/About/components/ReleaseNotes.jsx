// External Modules
import { useEffect, useState } from "react";
import { format } from "date-fns";

// Local Modules
import api from "@utils/api";
import useHead from "@hooks/Head.jsx";

function ReleaseNotes() {
  useHead({
    title: "Release Notes | G.S.S.S. Mirzewala",
  });
  const [RELEASE_NOTES, UPDATE_RELEASE_NOTES] = useState([]);
  async function getNotes() {
    const response = await api("GET", "public/updates", false);
    if (response.isSuccess) {
      UPDATE_RELEASE_NOTES(response.data);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="p-4">
      <ul className="flex flex-col px-2 md:px-6 gap-4 list-disc">
        {RELEASE_NOTES.reverse().map((UPDATE) => {
          return (
            <li key={UPDATE._id}>
              <div className="flex flex-col gap-4 font-semibold">
                <div>
                  <span>
                    {UPDATE.type} {UPDATE.version} (
                    {format(new Date(UPDATE.createdAt), "d MMM. yyyy")}) -
                    &nbsp;
                  </span>
                  <span className="font-normal">{UPDATE.description}</span>
                </div>
                <div className="flex flex-col gap-3 px-0 md:px-2">
                  {Object.entries(UPDATE.changes).map(([title, changes]) => (
                    <div key={title}>
                      <span>{title}</span>
                      <ul className="flex flex-col py-2 px-8 gap-1 list-disc">
                        {changes.map((FEATURE, i) => {
                          return (
                            <li className="font-normal" key={i}>
                              {FEATURE}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReleaseNotes;
