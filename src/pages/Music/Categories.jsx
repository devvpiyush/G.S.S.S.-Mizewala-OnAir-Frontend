function Categories({ list, selected, changeCategory }) {
  return (
    <div className="w-full py-2 px-6 flex items-center justify-center gap-8">
      <button
        className={`w-fit px-6 py-1 ${selected === "All" ? "bg-black text-white" : "bg-white text-black"} rounded-lg font-medium cursor-pointer border border-[#c0c0c0]`}
        style={{ fontFamily: "Inter, sans-serif" }}
        key={Math.random()}
        onClick={() => changeCategory("All")}
      >
        All
      </button>
      {list.map((category) => {
        return category === "Other" ? null : (
          <button
            className={`w-fit px-6 py-1 ${selected === category ? "bg-black text-white" : "bg-white text-black"} rounded-md font-medium cursor-pointer border border-[#c0c0c0]`}
            style={{ fontFamily: "Inter, sans-serif" }}
            key={Math.random()}
            onClick={() => changeCategory(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default Categories;
