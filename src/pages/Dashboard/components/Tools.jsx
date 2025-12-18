// Local Components
import ToolCard from "./ToolCard";

// Assets
import MarkerIcon from "@icons/Marker.svg";
import MusicIcon from "@icons/Music.svg";

function Tools() {
  const Tools = [
    {
      Name: "Marker",
      Description:
        "Marker tool developed by G.S.S.S. Mirzewala is a tool that allows Class Teachers to Mark attendence of Students of their class on a daily basic as Present or Absent.",
      Icon: MarkerIcon,
      Route: "/dashboard/marker",
    },
    {
      Name: "Music",
      Description:
        "G.S.S.S. Mirzewala Music Player is a simple tool for teachers to play prayers, motivational, and educational audio, helping create a positive and focused school environment.",
      Icon: MusicIcon,
      Route: "/dashboard/music",
    },
  ];

  return (
    <div className="w-full bg-white p-8 rounded-sm flex flex-row items-center justify-between overflow-x-auto gap-8 scroll-smooth">
      {Tools.map((Tool) => {
        return (
          <ToolCard
            Name={Tool.Name}
            Description={Tool.Description}
            Icon={Tool.Icon}
            Route={Tool.Route}
            key={Tool.Name}
          />
        );
      })}
    </div>
  );
}

export default Tools;
