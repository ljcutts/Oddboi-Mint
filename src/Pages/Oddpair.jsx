import { useState } from "react";
import OddpairModal1 from "../components/UI/oddPair1";
import OddpairModal2 from "../components/UI/oddPair2";

import oddpair1 from "../assets/5BoogsFAST.gif";
import oddpair2 from "../assets/72_VKrnf_400x400.jpg";

const Oddpair = () => {
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  return (
    <section className="w-full flex justify-center">
      <div className="my-10 max-w-screen-2xl w-full flex-col flex items-center">
        {error1 && <OddpairModal1 setVisibility={setError1} />}
        {error2 && <OddpairModal2 setVisibility={setError2} />}

        <span className="text-[40px] text-[#C9C9C9]">Mint your oDD Pair</span>

        <div className="flex justify-center gap-5 my-5 flex-wrap">
          <div className="bg-white rounded-2xl w-[360px]">
            <img
              src={oddpair1}
              alt=""
              className="rounded-xl"
            />
          </div>
          <div className="bg-white rounded-2xl w-[360px]">
            <img
              src={oddpair2}
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          <button
            disabled={true}
            className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]"
          >
            MINT
          </button>
        </div>

        {/* demo buttons */}
        <div className="flex gap-1 mt-2">
          {/* <button
            onClick={() => setError1(true)}
            className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]"
          >
            Modal 1
          </button>
          <button
            onClick={() => setError2(true)}
            className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]"
          >
            Modal 2
          </button> */}
        </div>

        {/* Tip */}
        <span className="text-[#D1D1D1] mt-5 text-center font-extralight text-[15px]">
          If you have won an oDD Pair, you''ll be able to mint{" "}
        </span>
      </div>
    </section>
  );
};

export default Oddpair;
