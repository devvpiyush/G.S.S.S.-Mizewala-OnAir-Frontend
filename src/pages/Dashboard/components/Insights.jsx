// Local Hooks
import { usePreference } from "@hooks/ContextHooks";

function Insights() {
  const { LANGUAGE } = usePreference();

  const DATES = [];

  function getColor(STATUS) {
    let color = null;
    if (STATUS === "PRESENT") {
      color = "#007736";
    } else if (STATUS === "ABSENT") {
      color = "#f71919";
    } else if (STATUS === "HOLIDAY") {
      color = "#FFA109";
    } else {
      color = "#000";
    }
    return color;
  }

  return (
    <div className="w-full py-4 px-6 rounded-sm bg-white">
      <h2 className="text-xl text-[#c0c0c0] font-semibold">
        {LANGUAGE === "hi" ? "उपस्थिति विवरण " : "Yours Insights "}(
        {format(new Date(), "MMMM")})
      </h2>
      <div className="w-full flex flex-wrap px-0 md:px-3 pt-3 md:pt-5 pb-8 gap-y-6 gap-x-10 overflow-y-auto">
        {DATES.map((DATE) => {
          let COLOR = getColor(DATE.STATUS);
          return (
            // Date
            <div
              className={`min-w-12 min-h-12 flex items-center justify-center rounded-sm bg-[${COLOR}] shadow-md shadow-neutral-950`}
              key={DATE.DATE}
            >
              <span className="text-white text-xl font-semibold">
                {DATE.DATE}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row max-sm:flex-wrap item-center gap-4 py-2">
        <div className="flex items-center justify-center">
          <div
            className={`min-w-6 min-h-6 rounded-full cursor-pointer bg-[#007736]`}
          ></div>
          <span className="font-semibold">
            &nbsp;<strong>= </strong>
            {LANGUAGE === "hi" ? "उपस्थित" : "Present"}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={`min-w-6 min-h-6 rounded-full cursor-pointer bg-[#f71919]`}
          ></div>
          <span className="font-semibold">
            &nbsp;<strong>= </strong>
            {LANGUAGE === "hi" ? "अनुपस्थित" : "Absent"}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={`min-w-6 min-h-6 rounded-full cursor-pointer bg-[#FFA109]`}
          ></div>
          <span className="font-semibold">
            &nbsp; <strong>= </strong>
            {LANGUAGE === "hi" ? "अवकाश" : "Holiday"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Insights;
