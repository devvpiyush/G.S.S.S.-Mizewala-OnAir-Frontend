// Local Modules
import Upload from "./Upload";

function Hotbar({ neutralizeModal, setUrl, setFile }) {
  return (
    <>
      <div className="px-4 py-2 sm:min-w-[30vw] sm:justify-self-center flex gap-10 sm:gap-20 border border-[#c0c0c0] bg-white rounded-full items-center">
        <Upload
          neutralizeModal={neutralizeModal}
          setUrl={setUrl}
          setFile={setFile}
        />
      </div>
    </>
  );
}

export default Hotbar;
