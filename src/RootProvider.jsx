// Dependencies (Block)
import { Provider as ReduxProvider } from "react-redux";

// Context API Providers (Block)
import { HolidayProvider } from "./storage/Holiday";
import { PrefProvider } from "./storage/Preferences";
import { AuthProvider } from "./storage/Auth";

// React Redux (Block)
import STORE from "./store/index";

function RootProvider({ children }) {
  return (
    <ReduxProvider store={STORE}>
      <AuthProvider>
        <PrefProvider>
          <HolidayProvider>{children}</HolidayProvider>
        </PrefProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default RootProvider;
