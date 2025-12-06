// Dependencies
import { format, getDate, getMonth, getYear } from "date-fns";

// Local Components
import MarkStatus from "./MarkStatus";

function MarkerStudentRow({ Avatar, USTA_PIN, Name, Father, Mark }) {
  function handleMarkAttendence(status) {
    // Creating Entry Object
    const Entry = {
      USTA_PIN: USTA_PIN,
      Name: Name,
      Father: Father,
      Status: status,
      Date: `${getYear(new Date())}-${String(getMonth(new Date()) + 1).padStart(
        2,
        "0"
      )}-${getDate(new Date())}`,
      Time: `${(new Date().getHours() % 12)
        .toString()
        .padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getSeconds()
        .toString()
        .padStart(2, "0")} ${format(new Date(), "a")}`,
    };
    Mark(Entry);
  }
  return (
    <div className="flex flex-row justify-between px-3 py-2 rounded-sm">
      <div className="flex flex-row">
        <img src={Avatar} width={40} />
        <div className="flex flex-col items-start justify-start px-3">
          <span className="font-semibold">{Name}</span>
          <span className="font-semibold text-sm text-[#c0c0c0] tracking-wide">
            S/O {Father}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 border-2 border-white">
        <MarkStatus
          STD_USTA_PIN={USTA_PIN}
          Text="P"
          Background="bg-green-700"
          Status="Present"
          Mark={handleMarkAttendence}
        />
        <MarkStatus
          STD_USTA_PIN={USTA_PIN}
          Text="A"
          Background="bg-red-700"
          Status="Absent"
          Mark={handleMarkAttendence}
        />
      </div>
    </div>
  );
}

export default MarkerStudentRow;
