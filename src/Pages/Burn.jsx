import { useState } from "react";
import BurnModal from "../components/UI/burn";

const Burn = () => {
  const [error, setError] = useState(false);

  return (
    <section className="w-full flex justify-center">
      <div className="my-10 max-w-screen-2xl w-full flex-col flex items-center">
        {error && <BurnModal setVisibility={setError} />}

        <span className="text-[40px] text-[#C9C9C9]">Burn your oDD BOi</span>

        {/* Instructions 1*/}
        <div className="flex flex-col items-center">
          <span className="font-medium text-[25px]">
            Enter your oDD Token ID
          </span>
          <span className="font-light text-[15px]">
            Your oDD NFT will be bURNED Forever
          </span>
        </div>

        <div className="flex gap-5 my-5">
          <div className="bg-white rounded-2xl h-[390px] w-[370px]"></div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          <input
            type="number"
            min={0}
            placeholder="Enter oDD BOi Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
          />
          <button className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]">
            BURN
          </button>
        </div>
        <button
          onClick={() => setError(true)}
          className="mt-2 w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]"
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

export default Burn;
