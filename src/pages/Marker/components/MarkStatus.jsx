function MarkStatus({ _id, Text, Background, Status, Mark }) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        name={`STATUS-${_id}`}
        value={Status}
        className="peer hidden"
        onClick={() => {
          Mark(Status);
        }}
      />
      <span
        className={`flex items-center justify-center px-3 py-1 rounded-sm ${Background} text-white font-semibold peer-checked:bg-yellow-500 transition`}
      >
        {Text}
      </span>
    </label>
  );
}

export default MarkStatus;
