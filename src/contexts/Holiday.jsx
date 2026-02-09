// Dependencies
import { format, getDate, getMonth, getYear } from "date-fns";

// React Dependencies
import { createContext, useState } from "react";

const HolidayContext = createContext();

// Data
import Holidays from "@/data/Holidays.js";

export const HolidayProvider = ({ children }) => {
  function determineHoliday() {
    let isHoliday = false;
    if (format(new Date(), "EEEE") === "Sunday") {
      isHoliday = true;
    } else if (
      Holidays.find(
        (holiday) =>
          holiday.Date ===
          `${getDate(new Date())}${getMonth(new Date())}${getYear(new Date())}`
      )
    ) {
      isHoliday = true;
    }
    return isHoliday;
  }

  const [isHoliday, SET_HOLIDAY_STATUS] = useState(determineHoliday);
  return (
    <HolidayContext.Provider value={{ isHoliday, SET_HOLIDAY_STATUS }}>
      {children}
    </HolidayContext.Provider>
  );
};

// Exportion (Block)
export default HolidayContext;
