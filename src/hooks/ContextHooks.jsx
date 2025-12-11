// React Context (Hooks)
import { useContext } from "react";

// 1. Basic Preferences Context
import PrefContext from "@/storage/Preferences";

export const usePreference = () => useContext(PrefContext);

// 2. Holiday Context
import HolidayContext from "@/storage/Holiday";

export const useHoliday = () => useContext(HolidayContext);

// 3. Auth Context
import AuthContext from "@/storage/Auth";

export const useAuth = () => useContext(AuthContext);
