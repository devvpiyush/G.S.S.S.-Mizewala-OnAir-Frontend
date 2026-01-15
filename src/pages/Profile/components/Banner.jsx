// Assets
import VerifiedIcon from "@icons/Verified.svg";

function Banner({ USER_INFO }) {
  console.log(USER_INFO);
  return (
    <>
      <div className="px-2">
        <div
          className={`w-full min-h-40 border-3 ${
            USER_INFO?.isOnline ? "border-green-800" : "border-black"
          }  bg-white rounded-md`}
        >
          <div className="flex flex-row items-center justify-end py-2 px-4">
            {USER_INFO?.isVerified && (
              <img
                src={VerifiedIcon}
                alt="Verified_Icon"
                width={35}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <div
          className={`p-1 relative -top-14 -left-4 min-w-20 max-w-20 min-h-20 max-h-20 border-3 ${
            USER_INFO?.isOnline ? "border-green-800" : "border-black"
          } rounded-full bg-white`}
        >
          <img
            src={USER_INFO?.avatarUrl}
            alt={`${USER_INFO?.name}' Avatar`}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
