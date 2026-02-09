// React Context (Hooks)
import { useContext } from "react";

// 1. Basic Preferences Context
import PrefContext from "@/contexts/Preferences";

export const usePreference = () => useContext(PrefContext);

// 2. Holiday Context
import HolidayContext from "@/contexts/Holiday";

export const useHoliday = () => useContext(HolidayContext);
