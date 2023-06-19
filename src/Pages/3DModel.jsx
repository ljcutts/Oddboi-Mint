import { useState } from "react";
import Model3DModal from "../components/UI/model3D";
import Spline from "@splinetool/react-spline";

const Model3d = () => {
  const [error, setError] = useState(false);

  return (
    <section className="w-full flex justify-center">
      <div className="px-2 my-10 max-w-screen-2xl w-full flex-col flex items-center">
        {error && <Model3DModal setVisibility={setError} />}

        <span className="text-[30px] mb-5 md:text-[40px] text-[#C9C9C9]">
          Download bOOG 3D File
        </span>

        {/* Instructions 1*/}
        <div className="flex flex-col items-center">
          <span className="font-medium text-[25px]">
            Enter your oDD Token ID
          </span>
          <span className="font-light text-[15px]">
            Claim bOOG 3D Model & Related files{" "}
          </span>
        </div>

        <div className="w-full h-[500px]  bg-[#131313] mt-5">
          <Spline
            style={{ border: "2px solid #5e5e5e" }}
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          <input
            type="number"
            min={0}
            placeholder="Enter oDD bOOG Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
          />
          <a
            href="/"
            download={"../assets/close.png"}
          >
            <button className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]">
              DOWNLOAD
            </button>
          </a>
        </div>

        <button
          onClick={() => setError(true)}
          className="w-[140px] mt-1 h-[40px] bg-[#FFB800] text-black rounded-[8px]"
        >
          Modal
        </button>

        {/* Tip */}
        <span className="text-[#D1D1D1] mt-10 text-center font-extralight text-[15px]">
          Your true token ID is OpenSea Token ID -1 <br />
          Or look at the last three digits on your NFT URL
        </span>
      </div>
    </section>
  );
};

export default Model3d;
