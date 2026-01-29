// External Modules
import { useSelector } from "react-redux";

// Local Modules
import useHead from "@hooks/Head.jsx";
import Teacher from "./Teacher";
import Student from "./Student";
import Admin from "./Admin";

function Dashboard() {
  useHead({
    title: "Dashboard | G.S.S.S. Mirzewala",
  });
  const USER = useSelector((store) => store.COMMON_IDENTITY);
  return (
    <>
      {USER.userType === "Student" && <Student />}
      {USER.userType === "Teacher" && <Teacher />}
      {USER.userType === "Admin" && <Admin />}
    </>
  );
}

export default Dashboard;
