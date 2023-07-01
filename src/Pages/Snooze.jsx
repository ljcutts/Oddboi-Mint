import { useState } from "react";
import BurnModal from "../components/UI/burn";

import dog from "../assets/1.jpg";
import eyes from "../assets/2.jpg";
import close from "../assets/close.png"
import { useContract, useSigner } from "wagmi";
import abi from "../contracts/master.json"


const Snooze = () => {
  const [error, setError] = useState(false);
  const [collection, setCollection] = useState("1");
  const [tokenId, setTokenId] = useState("0")
  const [tokenId2, setTokenId2] = useState("0");
  const [tokenId3, setTokenId3] = useState("0");
  const [tokenId4, setTokenId4] = useState("0");
  const [modal, setModal] = useState("")
  const [isItStaked, setIsItStaked] = useState(false)
  const [pendingReward, setPendingReward] = useState(0)


   const { data: signer } = useSigner();

   const contract = useContract({
     address: "",
     abi: abi,
     signerOrProvider: signer,
   });

   const snooze = async () => {
     await contract.stakeNew(collection, tokenId);
   };

   const unSnooze = async () => {
     await contract.unStakeNew(collection, tokenId);
   };

   const checkReward = async() => {
    //await contract.pendingRewardNew(collection, tokenId);
     setModal("reward")
   }

   const isStaked = async() => {
    //const isThisStaked = await contract.tokenIdIsStaked(collection, tokenId);
    setModal("stake")
    setIsItStaked(true)
   }

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
            value={tokenId}
            placeholder="Enter Token ID"
            className="w-[230px] outline-none h-[50px] px-4 text-[#000]"
            onChange={(e) => setTokenId(Number(e.target.value))}
          />
          {/* Tip */}
          <span className="text-[#D1D1D1] mt-2 text-center font-extralight text-[15px]">
            Your true token ID is OpenSea Token ID -1 <br />
            Or look at the last three digits on your NFT URL
          </span>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-5">
            <button
              onClick={snooze}
              className="text-[20px] uppercase font-bold rounded-tl-none w-[160px] h-[60px] bg-[#FFB800] rounded-[8px]"
            >
              Snooze
            </button>

            <button
              onClick={unSnooze}
              className="text-[20px] uppercase font-bold rounded-tl-none w-[160px] h-[60px] bg-[#FFB800] rounded-[8px]"
            >
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
              value={tokenId2}
              onChange={(e) => setTokenId2(Number(e.target.value))}
              min={0}
              placeholder="Enter oDD Token ID"
              className="w-[180px] sm:w-[230px] outline-none h-[50px] px-4 text-[#000]"
            />
            <button
              onClick={checkReward}
              className="text-[15px] uppercase font-bold w-[140px] h-[50px] bg-[#FFB800] rounded-[8px]"
            >
              Check Reward
            </button>
          </div>

          {/* is Staked? */}
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={tokenId3}
              onChange={(e) => setTokenId3(Number(e.target.value))}
              placeholder="Enter oDD Token ID"
              className="w-[180px] sm:w-[230px] outline-none h-[50px] px-4 text-[#000]"
            />
            <button
              onClick={isStaked}
              className="text-[15px] uppercase font-bold w-[140px] h-[50px] bg-[#FFB800] rounded-[8px]"
            >
              is Staked?
            </button>
          </div>
          {modal != "" && (
            <div className="bg-yellow-400 text-center grid fixed place-items-center z-50 w-[100%] h-[100%] top-0 bottom-[15rem] left-0">
              <div className="bg-black w-[65%] h-[60%] rounded-[8px]">
                <div className="flex items-center justify-between">
                  <div></div>
                  <span className="text-[30px] ml-5 md:text-[40px] relative top-2 text-[#C9C9C9]">
                    From Which Collection
                  </span>
                  <div>
                    <img
                      onClick={() => setModal(false)}
                      src={close}
                      alt=""
                      className="cursor-pointer relative right-4 w-[25px] h-[25px]"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-5 justify-around">
                  <img
                    src={dog}
                    alt=""
                    onClick={() => setCollection("1")}
                    className={
                      collection !== "1"
                        ? "rounded-2xl md:w-[30%] w-[25%] cursor-pointer"
                        : "border-[4px] md:w-[30%] w-[25%] cursor-pointer border-yellow-400 rounded-2xl"
                    }
                  />
                  <img
                    src={eyes}
                    alt=""
                    onClick={() => setCollection("2")}
                    className={
                      collection === "1"
                        ? "rounded-2xl  md:w-[30%] w-[25%] cursor-pointer"
                        : "border-[4px]  md:w-[30%] w-[25%] cursor-pointer border-yellow-400 rounded-2xl"
                    }
                  />
                </div>
                {modal === "stake" && (
                  <div className="mt-8 text-[30px] mr-[1rem]">
                    TokenId <span className="text-yellow-400">{tokenId3}</span>{" "}
                    Is Staked:{" "}
                    {isItStaked ? (
                      <span className="text-green-500">True</span>
                    ) : (
                      <span className="text-red-500">False</span>
                    )}
                  </div>
                )}
                {modal === "reward" && (
                  <div className="mt-8 text-[30px] mr-[1rem]">
                    TokenId <span className="text-yellow-400">{tokenId2}</span>{" "}
                    With Pending Reward: {pendingReward}
                  </div>
                )}
              </div>
            </div>
          )}
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
