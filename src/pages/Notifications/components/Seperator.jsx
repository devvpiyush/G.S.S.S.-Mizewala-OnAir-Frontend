function Seperator({ date }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className="bg-white px-4 py-1.5 font-medium text-black text-sm whitespace-nowrap rounded-lg shadow-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {date}
      </span>
    </div>
  );
}

export default Seperator;
