import { useContext, useState } from "react";
import BurnModal from "../components/UI/burn";
import burn from "../assets/BurnBOi.jpg";
import burn1 from "../assets/bOOG_03.jpg";

import { AppContext } from "../context/appContext";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { ethers } from "ethers";
import abi from "../contracts/master.json";

const Burn = () => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { switchNetwork } = useSwitchNetwork();

  const [error, setError] = useState(false);
  const [collection, setCollection] = useState("1");
  const [id, setId] = useState();

  const { masterCa } = useContext(AppContext);

  const handleId = (e) => {
    if (e.target.value < 0) return;
    setId(e.target.value);
  };

  const burnNFT = async () => {
    if (!isConnected) return alert("Not Connected!");

    const contract = new ethers.Contract(masterCa, abi, signer);

    console.log(collection, id, masterCa);

    try {
      const burnToken = await contract.burn(collection, id);
      await burnToken.wait();

      alert("NFT Burnt!");
    } catch (error) {
      console.log(error);
    }
  };

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

        <div className="flex justify-center flex-wrap gap-3 my-5">
          <div className="w-[350px]">
            <img
              src={burn}
              alt=""
              onClick={() => setCollection("1")}
              className={
                collection !== "1"
                  ? "rounded-2xl cursor-pointer"
                  : "border-[4px] cursor-pointer border-yellow-400 rounded-2xl"
              }
            />
          </div>
          <div className="w-[350px]">
            <img
              src={burn1}
              alt=""
              onClick={() => setCollection("2")}
              className={
                collection === "1"
                  ? "rounded-2xl cursor-pointer"
                  : "border-[4px] cursor-pointer border-yellow-400 rounded-2xl"
              }
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          <input
            onChange={handleId}
            value={id}
            type="number"
            min={0}
            placeholder="Enter oDD BOi Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
          />
          <button
            onClick={burnNFT}
            className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]"
          >
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
