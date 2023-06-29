import { useState } from "react";
import BurnModal from "../components/UI/burn";

import dog from "../assets/1.jpg";
import eyes from "../assets/2.jpg";

const Snooze = () => {
  const [error, setError] = useState(false);
  const [collection, setCollection] = useState("1");

  return (
    <section className="w-full flex justify-center">
      <div className="my-10 max-w-screen-2xl w-full flex-col flex items-center">
        {error && <BurnModal setVisibility={setError} />}

        <span className="text-[30px] md:text-[40px] text-[#C9C9C9]">
          Snooze your oDD NFT{" "}
        </span>

        <div className="flex gap-5 my-5">
          <div className="flex gap-2">
            <img
              src={dog}
              alt=""
              onClick={() => setCollection("1")}
              className={
                collection !== "1"
                  ? "rounded-2xl w-[170px] sm:w-[300px] cursor-pointer"
                  : "border-[4px] w-[170px] sm:w-[300px] cursor-pointer border-yellow-400 rounded-2xl"
              }
            />
            <img
              src={eyes}
              alt=""
              onClick={() => setCollection("2")}
              className={
                collection === "1"
                  ? "rounded-2xl w-[170px] sm:w-[300px] cursor-pointer"
                  : "border-[4px] w-[170px] sm:w-[300px] cursor-pointer border-yellow-400 rounded-2xl"
              }
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          <input
            type="number"
            min={0}
            placeholder="Enter Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
          />
          {/* Tip */}
          <span className="text-[#D1D1D1] mt-2 text-center font-extralight text-[15px]">
            Your true token ID is OpenSea Token ID -1 <br />
            Or look at the last three digits on your NFT URL
          </span>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-5">
            <button className="text-[20px] uppercase font-bold rounded-tl-none w-[160px] h-[60px] bg-[#FFB800] rounded-[8px]">
              Snooze
            </button>

            <button className="text-[20px] uppercase font-bold rounded-tl-none w-[160px] h-[60px] bg-[#FFB800] rounded-[8px]">
              Unsnooze
            </button>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-7 items-center text-center max-w-lg">
            <span className="text-[20px] text-[#A4A4A4]">
              <span className="font-bold">Snooze</span> is a soft- staking
              mechanic <br />
              Your oDD NFT remains in your wallet <br />
              Earn 10 $oDD/day as a reward for snoozing
            </span>
            <span className="text-[20px] text-[#A4A4A4]">
              <span className="font-bold">UnSnooze</span> unstakes your oDD NFT{" "}
              <br />
              You will stop earning daily $oDD rewards
            </span>
          </div>
        </div>

        {/* Interface */}
        <div className="bg-[#171717] mt-10 py-3 sm:py-8 px-4 sm:px-10 rounded-xl flex flex-col items-center gap-2">
          <h3 className="font-bold text-white mb-4 sm:mb-10 text-[24px]">
            Already Snoozed?
          </h3>
          {/* Check reward */}
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              placeholder="Enter oDD Token ID"
              className="w-[180px] sm:w-[230px] outline-none h-[50px] px-4 text-[#000]"
            />
            <button className="text-[15px] uppercase font-bold w-[140px] h-[50px] bg-[#FFB800] rounded-[8px]">
              Check Reward
            </button>
          </div>

          {/* is Staked? */}
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              placeholder="Enter oDD Token ID"
              className="w-[180px] sm:w-[230px] outline-none h-[50px] px-4 text-[#000]"
            />
            <button className="text-[15px] uppercase font-bold w-[140px] h-[50px] bg-[#FFB800] rounded-[8px]">
              is Staked?
            </button>
          </div>

          {/* Claim $oDD */}
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              placeholder="Enter oDD Token ID"
              className="w-[180px] sm:w-[230px] outline-none h-[50px] px-4 text-[#000]"
            />
            <button className="text-[15px] uppercase font-bold w-[140px] h-[50px] bg-[#FFB800] rounded-[8px]">
              Claim $oDD
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Snooze;
