import { useState } from "react";
import BurnModal from "../components/UI/burn";

import dog from "../assets/blinkiBoi_website.gif";
import freeBoog from "../assets/72_VKrnf_400x400.jpg";

const FreeBoog = () => {
  const [error, setError] = useState(false);

  return (
    <section className="w-full flex justify-center">
      <div className="my-10 max-w-screen-2xl w-full flex-col flex items-center">
        {error && <BurnModal setVisibility={setError} />}

        <span className="text-[30px] md:text-[40px] text-[#C9C9C9]">
          Early oDD BOi Snoozers
        </span>
        <span className="font-extralight text-[30px] md:text-[40px] text-[#C9C9C9]">
          {" "}
          Mint your FREE bOOG
        </span>

        <div className="flex gap-5 my-5">
          <div className=" sm:w-[370px] w-[300px] relative">
            <img
              src={freeBoog}
              alt=""
              className="rounded-2xl"
            />
            <img
              src={dog}
              alt=""
              className="rounded-2xl sm:w-60 w-[200px] -bottom-7 -left-10 sm:-left-32 absolute"
            />
          </div>
        </div>

        <span className="text-[#D1D1D1] mt-10 text-center text-[20px] md:text-[25px]">
          You'll need 500 $oDD to mint bOOG{" "}
        </span>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          <input
            type="number"
            min={0}
            placeholder="Enter oDD BOi Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
          />
          <button className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]">
            Mint 1 bOOG
          </button>
        </div>

        {/* Tip */}
        <span className="text-[#D1D1D1] mt-10 text-center font-extralight text-[15px]">
          Your true token ID is OpenSea Token ID -1 <br />
          Or look at the last three digits on your NFT URL
        </span>
      </div>
    </section>
  );
};

export default FreeBoog;
