// React Redux (Hooks)
import { useSelector } from "react-redux";

// Dashboards
import Teacher from "./Teacher";
import Student from "./Student";

function Dashboard() {
  const USER = useSelector((store) => store.USER);
  return (
    <>
      {USER.userType === "TCH" && <Teacher />}
      {USER.userType === "STD" && <Student />}
    </>
  );
}

export default Dashboard;
