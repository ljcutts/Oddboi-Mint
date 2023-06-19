import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAccount, useSigner } from "wagmi";
import { lowerGpa, lowerGpb, lowerWL } from "./constants/lists";
import abi from "./contracts/abi.json";

import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import { ethers } from "ethers";
import { fromBn } from "./utils";

const Main = () => {
  const limitTotal = 100;
  const limitPresale = 4;
  const limitGrpa = 5;
  const limitGrpb = 4;

  const totalGpa = 50;
  const totalGpb = 30;

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contAdd = "0xeCB2E8df1C54581E5Db267772a612a1755D25904";

  const statProv = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );

  const nftContract = new ethers.Contract(contAdd, abi, statProv);

  const [copied, setCopied] = useState(false);

  const [isPresale, setisPresale] = useState(false);
  const [listedPs, setlistedPs] = useState(false);
  const [totalSupply, settotalSupply] = useState(0);

  const [statGpaMints, setstatGpaMints] = useState(0);
  const [statGpbMints, setstatGpbMints] = useState(0);

  const [discount, setDiscount] = useState(false);
  const [group, setGroup] = useState("Community");

  const [userMinted, setUserMinted] = useState(0);
  const [freeMinted, setfreeMinted] = useState(0);
  const [presaleFreeMint, setpresaleFreeMint] = useState(0);

  const [inputAmount, setInputAmount] = useState(1);

  const leafNodes = lowerWL.map((addr) => keccak256(addr));
  const merkleTree1 = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  const leafNodes2 = lowerGpa.map((addr) => keccak256(addr));
  const merkleTree2 = new MerkleTree(leafNodes2, keccak256, {
    sortPairs: true,
  });

  const leafNodes3 = lowerGpb.map((addr) => keccak256(addr));
  const merkleTree3 = new MerkleTree(leafNodes3, keccak256, {
    sortPairs: true,
  });

  const changeCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const handleInputChange = (e) => {
    setInputAmount(Number(e.target.value));
  };

  const buf2hex = (x) => "0x" + x.toString("hex");

  const getPresaleProof = (addr) => {
    return merkleTree1.getProof(keccak256(addr)).map((x) => buf2hex(x.data));
  };

  const getGpaProof = (addr) => {
    return merkleTree2.getProof(keccak256(addr)).map((x) => buf2hex(x.data));
  };

  const getGpbProof = (addr) => {
    return merkleTree3.getProof(keccak256(addr)).map((x) => buf2hex(x.data));
  };

  const fetchData = async () => {
    const statA = await nftContract.maxFreeMintA();
    setstatGpaMints(fromBn(statA));

    const statB = await nftContract.maxFreeMintB();
    setstatGpbMints(fromBn(statB));

    const tsup = await nftContract.totalSupply();
    settotalSupply(fromBn(tsup));

    if (isConnected) {
      const userBal = await nftContract.balanceOf(address);
      setUserMinted(fromBn(userBal));

      const freeMints = await nftContract.freeMints(address);
      setfreeMinted(fromBn(freeMints));

      const psFreeMints = await nftContract.presaleMintCounter(address);
      setpresaleFreeMint(fromBn(psFreeMints));
    }
  };

  useEffect(() => {
    if (isConnected) {
      if (isPresale) {
        const check = lowerWL.includes(address.toLocaleLowerCase());
        setlistedPs(check);
        fetchData();
      } else {
        const gpPs = lowerWL.includes(address.toLocaleLowerCase());
        if (gpPs) {
          setGroup("Presale");
          setDiscount(true);
          fetchData();
          return;
        }
        const gpA = lowerGpa.includes(address.toLocaleLowerCase());
        if (gpA) {
          setGroup("Group A");
          setDiscount(true);
          fetchData();
          return;
        }
        const gpB = lowerGpb.includes(address.toLocaleLowerCase());
        if (gpB) {
          setGroup("Group B");
          setDiscount(true);
          fetchData();
          return;
        } else {
          setGroup("Community");
          setDiscount(false);
          fetchData();
        }
      }
    }
    fetchData();
  }, [address]);

  const presaleMint = async () => {
    if (!isConnected) return alert("Not Connected!");

    const wnftContract = new ethers.Contract(contAdd, abi, signer);

    try {
      const check = await wnftContract.checkListed(getPresaleProof(address));

      if (!check) return alert("Not part of Presale!");

      const mint = await wnftContract.presaleMint(
        inputAmount,
        getPresaleProof(address)
      );

      await mint.wait();
      alert("Presale mint executed!");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const gpaMint = async () => {
    if (!isConnected) return alert("Not Connected!");

    const wnftContract = new ethers.Contract(contAdd, abi, signer);

    try {
      const check = await wnftContract.checkListed(getGpaProof(address));

      if (!check) return alert("Not part of Group A");

      const mint = await wnftContract.groupAMint(
        getGpaProof(address),
        inputAmount
      );

      await mint.wait();
      alert("Group A mint executed!");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const gpbMint = async () => {
    if (!isConnected) return alert("Not Connected!");

    const wnftContract = new ethers.Contract(contAdd, abi, signer);

    try {
      const check = await wnftContract.checkListed(getGpbProof(address));

      if (!check) return alert("Not part of Group B");

      const mint = await wnftContract.groupBMint(
        getGpbProof(address),
        inputAmount
      );

      await mint.wait();
      alert("Group B mint executed!");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async () => {
    if (!isConnected) return alert("Not Connected!");

    const wnftContract = new ethers.Contract(contAdd, abi, signer);

    try {
      if (group === "Presale") {
        const check = await wnftContract.checkListed(getPresaleProof(address));
        if (!check) return alert("Not part of Presale");
        const mint = await wnftContract.mint(
          getPresaleProof(address),
          inputAmount,
          {
            value: ethers.utils.parseEther((0.01 * inputAmount).toString()),
          }
        );

        await mint.wait();
        alert("Discounted Mint Executed!");
        fetchData();
      } else if (group === "Group A") {
        const check = await wnftContract.checkListed(getGpaProof(address));
        if (!check) return alert("Not part of Group A");
        const mint = await wnftContract.mint(
          getGpaProof(address),
          inputAmount,
          {
            value: ethers.utils.parseEther((0.01 * inputAmount).toString()),
          }
        );

        await mint.wait();
        alert("Discounted Mint Executed!");
        fetchData();
      } else if (group === "Group B") {
        const check = await wnftContract.checkListed(getGpbProof(address));
        if (!check) return alert("Not part of Group B");
        const mint = await wnftContract.mint(
          getGpbProof(address),
          inputAmount,
          {
            value: ethers.utils.parseEther((0.01 * inputAmount).toString()),
          }
        );

        await mint.wait();
        alert("Discounted Mint Executed!");
        fetchData();
      } else {
        console.log("Community mint");
        const mint = await wnftContract.mint([], inputAmount, {
          value: ethers.utils.parseEther((0.02 * inputAmount).toString()),
        });

        await mint.wait();
        alert("Community Mint Executed!");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl w-full mb-20 flex flex-col items-center justify-between mt-2 px-5">
        {/* Banner */}
        <div className="relative w-full bg-white rounded-xl h-[220px]">
          <div className="bg-pink-400 absolute -bottom-[15%] outline-offset-[6px] outline outline-3 left-1/2 transform -translate-x-1/2 w-[128px] h-[128px]  rounded-full"></div>
        </div>

        {/* Title */}
        <h2 className="text-4xl mb-4 md:text-[48px] text-center text-white font-medium mt-14">
          Sneed Maker Classic
        </h2>

        {/* Links */}
        <div className="flex mb-10">
          <CopyToClipboard text="0x2147a3c7B8a3D9ff4004B2938F592a6fAF0eba22">
            <button
              onClick={changeCopy}
              className="bg-[#253341] ease-out duration-200 hover:bg-[#1d2c3a] flex items-center gap-2 font-bold text-[#d4d4d4] text-[14px] py-[6px] px-[40px] rounded-[100px]"
            >
              <img
                src="https://www.scatter.art/_next/image?url=%2Fimages%2Feth-purple.png&w=32&q=75"
                alt=""
                className="w-6"
              />{" "}
              {copied ? "Address Copied!" : "0xf99E...87DB"}
            </button>
          </CopyToClipboard>
          <button className="rounded-full"></button>
        </div>

        {/* Info Cards */}
        <ul className="flex flex-wrap gap-2 justify-center">
          <li className="border-2 border-[#253341] rounded-xl w-[160px] flex flex-col items-center justify-center p-4">
            <h3 className="text-white text-lg">Total Minted</h3>
            <h4 className="text-[#707A83] text-sm">{totalSupply}</h4>
          </li>
          <li className="border-2 border-[#253341] rounded-xl w-[160px] flex flex-col items-center justify-center p-4">
            <h3 className="text-white text-lg">Remaining</h3>
            <h4 className="text-[#707A83] text-sm">
              {limitTotal - totalSupply}
            </h4>
          </li>
          <li className="border-2 border-[#253341] rounded-xl w-[160px] flex flex-col items-center justify-center p-4">
            <h3 className="text-white text-lg">Price</h3>
            <h4 className="text-[#707A83] text-sm">{"0.2 Eth"}</h4>
          </li>
        </ul>

        {/* Mint */}
        <div className="flex gap-4 sm:gap-0 justify-around max-w-4xl w-full flex-wrap mb-10 mt-20">
          {/* inptus */}
          <div className="max-w-md text-white w-full">
            <span>MINT A</span>
            <h2 className="text-4xl pb-10 border-b border-[#c0c0c0]">
              Sneed Maker Classic
            </h2>
            <div className="w-full mt-2 flex px-3 justify-end">
              <span className="text-end">
                Status:{" "}
                {!isPresale ? (
                  <span
                    onClick={() => setisPresale((e) => !e)}
                    className="p-1 cursor-pointer rounded-md px-2 bg-[#41b502]"
                  >
                    Live
                  </span>
                ) : (
                  <span
                    onClick={() => setisPresale((e) => !e)}
                    className="p-1 cursor-pointer rounded-md px-2 bg-[#b502ac]"
                  >
                    Presale Only
                  </span>
                )}
              </span>
            </div>
            {/* Mint section */}
            <div className="mt-10 flex gap-2">
              <input
                onKeyDown={blockInvalidChar}
                onChange={handleInputChange}
                value={inputAmount}
                className="appearance-none max-w-xs block w-full bg-[#1f3141] border-2 border-[#0d1220] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-[#1e2e3d] focus:border-gray-500"
                id="grid-zip"
                type="number"
                placeholder="1"
                min={0}
              />
              {isPresale ? (
                <button
                  onClick={presaleMint}
                  className="w-[120px] rounded-lg bg-[#27417b]"
                >
                  Presale Mint
                </button>
              ) : (
                <button
                  onClick={mint}
                  className="w-[120px] rounded-lg bg-[#27417b]"
                >
                  Mint
                </button>
              )}

              {!isPresale && (
                <>
                  {group === "Group A" && (
                    <button
                      onClick={gpaMint}
                      className="w-[240px] rounded-lg bg-[#27417b]"
                    >
                      Group A Mint
                    </button>
                  )}
                  {group === "Group B" && (
                    <button
                      onClick={gpbMint}
                      className="w-[240px] rounded-lg bg-[#27417b]"
                    >
                      Group B Mint
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between px-1 mt-1">
              {isPresale ? (
                <span className="font-bold">
                  Presale Status:{" "}
                  {isConnected ? (
                    <>
                      {listedPs ? (
                        <span className="font-medium text-[#80d858]">
                          Listed for Presale
                        </span>
                      ) : (
                        <span className="font-medium text-[#d8587c]">
                          Not listed for Presale
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-medium text-[#9a9193]">
                      Not connected...
                    </span>
                  )}
                </span>
              ) : (
                <span className="font-bold">
                  Account Group:{" "}
                  {isConnected ? (
                    <>
                      <span className="font-medium text-[#679add]">
                        {group}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-[#9a9193]">
                      Not connected...
                    </span>
                  )}
                </span>
              )}

              {!isPresale && isConnected && (
                <h2>
                  <span className="font-bold">Discount:</span>{" "}
                  {discount ? "50%" : "0%"}
                </h2>
              )}
            </div>

            {/* Mints registry ( user related )*/}
            {isConnected && (
              <div className="flex justify-between px-3 mt-10 sm:mt-14 w-full">
                {isPresale && listedPs && (
                  <span className="font-medium">
                    Presale Mints: {presaleFreeMint} / {limitPresale}
                  </span>
                )}

                {!isPresale && (
                  <div>
                    {group === "Community" || group === "Presale" ? (
                      <></>
                    ) : group === "Group A" ? (
                      <span>
                        Group A: {freeMinted} / {limitGrpa}
                      </span>
                    ) : (
                      <span>
                        Group B: {freeMinted} / {limitGrpb}
                      </span>
                    )}
                  </div>
                )}

                <span className="font-medium"> Minted: {userMinted}</span>
              </div>
            )}

            {/* Progress Bar ( static )*/}
            <div className="flex flex-col  p-5 rounded-lg shadow-lg bg-[#192734]">
              <div className="flex justify-between">
                <h3 className="mb-4">Mint Progress</h3>
                <h3 className="mb-4">
                  {totalSupply}/{limitTotal}
                </h3>
              </div>
              <div className="w-full h-1 bg-white">
                <div
                  style={{ width: `${(totalSupply * 100) / limitTotal}%` }}
                  className="h-1 bg-[#00BA7C]"
                ></div>
              </div>
            </div>

            {/* Groups mint progress ( static )*/}
            <div className="flex mt-2 p-5 rounded-lg shadow-lg bg-[#192734]">
              <div className="w-full flex justify-center">
                {/* Group A */}
                <div className="flex w-full flex-col border-r px-3">
                  <h3 className="mb-1">Group A</h3>
                  <span className="mb-1">
                    {statGpaMints}/{totalGpa}
                  </span>
                </div>

                {/* Group B */}
                <div className="flex w-full flex-col px-3">
                  <h3 className="mb-1">Group B</h3>
                  <span className="mb-1">
                    {statGpbMints}/{totalGpb}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* NFT image */}
          <div className="w-[400px] rounded-xl bg-[white] h-[520px]"></div>
        </div>
      </div>
    </section>
  );
};

export default Main;
