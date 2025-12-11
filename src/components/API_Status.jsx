function API_Status({ type, message }) {
  return (
    <div className="py-2">
      <p
        className={`font-semibold ${
          type === "error" ? "text-red-500" : "text-green-700"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

export default API_Status;
