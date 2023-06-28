import eyes from "../../assets/BoogEyes.gif";

const OddpairModal1 = ({ setVisibility }) => {
  return (
    <>
      <section
        onClick={() => setVisibility(false)}
        className="fixed w-full bottom-0 right-0 left-0 top-0 bg-[#000000e0] z-50 flex items-center justify-center"
      ></section>
      <div className="bg-[#1A1A1A] max-w-[360px] w-full max-h-[500px] fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-5 flex flex-col items-center rounded-lg">
        <span className="text-[#D10011] text-[25px]">Oops!</span>
        <div className="my-4 w-[250px]">
          <img
            src={eyes}
            alt=""
          />
        </div>

        <span className="text-[#fcfcfc] text-center">
          Your wallet hasn't won an oDD Pair <br />
          Mint another bOOG to increase your oDDs
        </span>
        <button className="bg-[#00FF80] font-bold text-[14px] mt-3 rounded-lg p-[10px] text-black">
          Get bOOG on Opensea
        </button>
      </div>
    </>
  );
};

export default OddpairModal1;
