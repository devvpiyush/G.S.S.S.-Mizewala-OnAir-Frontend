function Notification({ profilePictureUrl, posterName, posterId, text, time }) {
  return (
    <div className="w-full flex flex-col px-2 py-1 bg-white border-1 border-[#c0c0c0] rounded-md">
      <div className="flex flex-row px-2 py-2 gap-4">
        <img
          src={profilePictureUrl}
          alt="Poster_Profile_Picture"
          className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-full"
        />
        <div className="w-full flex flex-col">
          <a
            href={`profile/${posterId}`}
            className="w-fit font-semibold cursor-pointer"
          >
            Posted by {posterName}
          </a>
          <p className="text-sm font-normal text-gray-500 tracking-wide">
            {text.length > 100 ? text.slice(0, 100) + "..." : text}
          </p>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-400 text-end">{time}</span>
    </div>
  );
}

export default Notification;
