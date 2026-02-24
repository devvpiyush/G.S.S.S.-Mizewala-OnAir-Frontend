// React Router (Components)
import { Form } from "react-router-dom";

// React Redux (Hooks)
import { useSelector } from "react-redux";

// Local Components
import Preview_STD from "./Preview_STD";

function Preview({ UPDATE_PREVIEW_STATE }) {
  const SHEET = useSelector((store) => store.MARKER_SHEET);
  const STD_LIST = [];
  JSON.parse(JSON.stringify(SHEET)).map((entries) => {
    STD_LIST.push(entries);
  });
  function handleSubmit() {
    console.log("Hi", SHEET);
  }
  return (
    <Form className="bg-white min-w-[90vw] max-w-[90vh] max-md:max-w-[350px] rounded-[10px] shadow-lg">
      <div className="flex items-center justify-between py-3 px-4">
        <button
          type="button"
          className="font-semibold text-red-500 cursor-pointer"
          onClick={UPDATE_PREVIEW_STATE}
        >
          Cancel
        </button>
        <p className="font-semibold">Preview</p>
        <button
          type="submit"
          className="font-semibold text-white bg-blue-400 px-3 py-1 rounded-sm cursor-pointer max-sm:text-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <hr />
      <div className="flex flex-col gap-4 justify-between rounded-sm px-3 py-2">
        {STD_LIST.length === 0 ? (
          <p className="my-4 text-center font-semibold text-gray-500">
            You haven’t marked the attendance for any student yet.
          </p>
        ) : (
          STD_LIST.map((STD) => {
            return (
              <Preview_STD
                name={STD.name}
                parentName={STD.parentName}
                status={STD.status}
                key={STD._id}
              />
            );
          })
        )}
      </div>
    </Form>
  );
}

export default Preview;
