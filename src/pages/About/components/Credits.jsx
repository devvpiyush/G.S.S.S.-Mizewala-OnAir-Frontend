// Data
import CREDITS_LIST from "@/data/Credits";

// Local Modules
import useHead from "@hooks/Head.jsx";

function Credits() {
  useHead({
    title: "Credits | G.S.S.S. Mirzewala",
  });
  return (
    <div className="p-4">
      <ul className="flex flex-col gap-4 list-disc px-0 md:px-8">
        {CREDITS_LIST.map((CREDIT) => {
          return (
            <li key={CREDIT.SERIAL_NUMBER}>
              <span className="font-semibold">{CREDIT.CREDIT_FOR} </span>
              <span className="font-semibold">
                (by {CREDIT.CREDIT_TO}) -&nbsp;
              </span>
              <a
                className="text-blue-700 font-semibold"
                target="_blank"
                href={CREDIT.LINKING_APP_LINK}
              >
                {CREDIT.LINKING_APP} Link
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Credits;
