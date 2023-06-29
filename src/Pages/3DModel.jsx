import { useContext, useEffect, useState } from "react";
import Model3DModal from "../components/UI/model3D";
import Spline from "@splinetool/react-spline";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { AppContext } from "../context/appContext";
import boogABI from "../contracts/boogAbi.json";

const Model3d = () => {
  const [error, setError] = useState(false);
  const [hasNFT, sethasNFT] = useState(false);

  const { address, isConnected } = useAccount();
  const { boogCA, provider } = useContext(AppContext);

  const nftContract = new ethers.Contract(boogCA, boogABI, provider);

  const checkOwner = async () => {
    if (!isConnected) return;

    const balance = await nftContract.balanceOf(address);
    sethasNFT(ethers.utils.formatUnits(balance, 0) !== "0");
    setError(ethers.utils.formatUnits(balance, 0) === "0");
  };

  useEffect(() => {
    checkOwner();
  }, []);

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
            Claim bOOG 3D Model & Related files{" "}
          </span>
        </div>

        <div className="w-full h-[500px]  bg-[#131313] mt-5">
          <Spline
            style={{ border: "2px solid #5e5e5e" }}
            scene="https://prod.spline.design/Gtahyym8JDtbbwG2/scene.splinecode"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col mt-10 gap-5 items-center">
          {hasNFT && (
            <a
              href="/"
              download={"../assets/bOOG_3D_Assets.zip"}
            >
              <button className="w-[140px] h-[40px] bg-[#FFB800] text-black rounded-[8px]">
                DOWNLOAD
              </button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Model3d;
