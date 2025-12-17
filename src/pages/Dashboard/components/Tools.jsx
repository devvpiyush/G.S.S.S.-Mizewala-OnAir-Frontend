// Local Components
import ToolCard from "./ToolCard";

function Tools() {
  const Tools = [
    {
      Name: "Marker",
      Description:
        "Marker tool developed by G.S.S.S. Mirzewala is a tool that allows Class Teachers to Mark attendence of Students of their class on a daily basic as Present or Absent.",
      Icon: "src/assets/Icons/Marker.svg",
      Route: "/dashboard/marker",
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
