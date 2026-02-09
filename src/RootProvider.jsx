// External Modules
import { Provider as ReduxProvider } from "react-redux";

// Context API Providers
import APIsProvider from "@/contexts/APIs";
import { HolidayProvider } from "@/contexts/Holiday";
import { PrefProvider } from "@/contexts/Preferences";
import { AuthProvider } from "@/contexts/Auth";

// Local Modules
import STORE from "./store/index";

function RootProvider({ children }) {
  return (
    <ReduxProvider store={STORE}>
      <APIsProvider>
        <AuthProvider>
          <PrefProvider>
            <HolidayProvider>{children}</HolidayProvider>
          </PrefProvider>
        </AuthProvider>
      </APIsProvider>
    </ReduxProvider>
  );
}

export default RootProvider;
