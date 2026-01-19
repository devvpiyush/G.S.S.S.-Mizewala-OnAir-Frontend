// Local Components
import MarkStatus from "./MarkStatus";

function MarkerStudentRow({ _id, avatarUrl, name, fatherName, Mark }) {
  function handleMarkAttendence(status) {
    // Creating Entry Object
    Mark({
      _id,
      name,
      fatherName,
      status,
    });
  }
  return (
    <div className="flex flex-row justify-between px-3 py-2 rounded-sm">
      <div className="flex flex-row">
        <img
          src={avatarUrl}
          style={{
            minWidth: "2.5rem",
            maxWidth: "2.5rem",
            minHeight: "2.5rem",
            maxHeight: "2.5rem",
            borderRadius: "50%",
          }}
        />
        <div className="flex flex-col items-start justify-start px-3">
          <span className="font-semibold">{name}</span>
          <span className="font-semibold text-sm text-[#c0c0c0] tracking-wide">
            S/O {fatherName}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 border-2 border-white">
        <MarkStatus
          _id={_id}
          Text="P"
          Background="bg-green-700"
          Status="Present"
          Mark={handleMarkAttendence}
        />
        <MarkStatus
          _id={_id}
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
