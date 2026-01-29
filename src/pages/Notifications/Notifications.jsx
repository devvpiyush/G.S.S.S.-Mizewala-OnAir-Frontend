// External Modules
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

// Local Modules
import api from "@utils/api.js";
import useHead from "@hooks/Head.jsx";
import Notification from "./components/Notification";
import Seperator from "./components/Seperator";

function Notifications() {
  // Declarations
  const USER = useSelector((store) => store.COMMON_IDENTITY);

  // State
  const [POSTS, UPDATE_POSTS] = useState([]);

  useHead({
    title: "Notifications | G.S.S.S. Mirzewala",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (USER?.userType === "Teacher" && USER?.isLoggedIn) {
          const response = await api("GET", "p/fetch/staff");
          UPDATE_POSTS(response.data.data);
        } else if (USER?.userType === "Student" && USER?.isLoggedIn) {
          const response = await api("GET", "p/fetch/schoolies");
          UPDATE_POSTS(response.data.data);
        } else {
          const response = await api("GET", "p/fetch/everyone");
          UPDATE_POSTS(response.data.data);
        }
      } catch (error) {
        console.log(error?.message || "Something went Wrong!");
      }
    };
    fetchPosts();
  }, []);

  // 🔹 GROUP POSTS BY SAME DAY
  const POSTS_BY_DATE = useMemo(() => {
    return POSTS.reduce((acc, post) => {
      const dateKey = format(parseISO(post.createdAt), "MMMM d, yyyy");

      (acc[dateKey] ||= []).push(post);
      return acc;
    }, {});
  }, [POSTS]);

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(POSTS_BY_DATE).map(([date, posts]) => (
        <div key={date} className="flex flex-col gap-2">
          <Seperator date={date} />
          {posts.map((Post) => (
            <Notification
              key={Post._id}
              Avatar={Post.poster.avatarUrl}
              posterName={Post.poster.name}
              text={Post.content || "Loading..."}
              time={format(parseISO(Post.createdAt), "hh:mm a")}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
