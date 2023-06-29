import { useContext, useState } from "react";
import BurnModal from "../components/UI/burn";
import burn from "../assets/BurnBOi.jpg";
import burn1 from "../assets/bOOG_03.jpg";

import { AppContext } from "../context/appContext";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { ethers } from "ethers";
import snoBurnAbi from "../contracts/master.json";
import boiABI from "../contracts/boiAbi.json";
import boogABI from "../contracts/boogAbi.json";

const Burn = () => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { switchNetwork } = useSwitchNetwork();

  const [error, setError] = useState(false);
  const [collection, setCollection] = useState("1");
  const [id, setId] = useState();

  const { snoBurnCa, boiCA, boogCA } = useContext(AppContext);

  const handleId = (e) => {
    if (e.target.value < 0) return;
    setId(e.target.value);
  };

  const burnNFT = async () => {
    if (!isConnected) return alert("Not Connected!");
    const burnCont = new ethers.Contract(snoBurnCa, snoBurnAbi, signer);

    try {
      if (collection === "1") {
        const boiCont = new ethers.Contract(boiCA, boiABI, signer);
        const appr = await boiCont.setApprovalForAll(
          "0x85f192b5711270144bafd2828347bc08daeac2a7",
          true
        );

        await appr.wait();

        const burn = await burnCont.burnToken(collection, id);
        await burn.wait();

        console.log("success");
      } else {
        const boogCont = new ethers.Contract(boogCA, boogABI, signer);

        const appr = await boogCont.approve(snoBurnCa, id);

        await appr.wait();

        const burn = await burnCont.burnToken(collection, id);
        await burn.wait();

        console.log("sec");
      }
    } catch (error) {
      console.log(error);
      alert("Something wrong happened, check token ID or network");
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
                collection === "1"
                  ? "border-[4px] cursor-pointer border-yellow-400 rounded-2xl"
                  : "rounded-2xl cursor-pointer"
              }
            />
          </div>
          <div className="w-[350px]">
            <img
              src={burn1}
              alt=""
              onClick={() => setCollection("2")}
              className={
                collection === "2"
                  ? "border-[4px] cursor-pointer border-yellow-400 rounded-2xl"
                  : "rounded-2xl cursor-pointer"
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
            placeholder="Enter Your Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
          />
          <button
            onClick={burnNFT}
            className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]"
          >
            BURN
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

export default Burn;
