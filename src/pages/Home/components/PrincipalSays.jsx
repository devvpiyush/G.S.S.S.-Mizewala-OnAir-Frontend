// Assets
import Principal from "../../../../public/Principal.jpeg";

function PrincipalSays() {
  return (
    <div className="w-full p-6 flex flex-col-reverse sm:flex-row justify-between gap-6 bg-white rounded-sm">
      <div className="w-full flex flex-col gap-2">
        <h1
          className="text-md sm:text-xl font-medium tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          What our principal Says?
        </h1>
        <p
          className="text-sm sm:text-base font-normal tracking-wider"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Our Principal shares a vision of quality education, discipline, and
          holistic development. With a strong commitment to academic excellence
          and moral values, the message inspires students to grow into
          responsible, confident, and capable individuals ready to serve
          society.
        </p>
      </div>
      <div className="w-full sm:w-1/3 flex flex-col gap-4 items-center justify-center">
        <img
          src={Principal}
          alt="Principal"
          className="max-w-36 sm:max-w-52 max-h-36 sm:max-h-52 rounded-full"
        />
        <div className="text-center">
          <h1 className="font-semibold">Mr. Parveen Middha</h1>
          <h2 className="font-normal">Principal</h2>
        </div>
      </div>
    </div>
  );
}

export default PrincipalSays;
