import { ethers } from "ethers";
import { createContext } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const boiCA = "0x1a4b21f56A7609bD43dF8852616b2476aAFa379B";
  const boogCA = "0x894e9503d5aE9A655ed0F664cC3154dA2ca897Ef";

  const snoBurnCa = "0x85F192b5711270144BAFD2828347BC08dAeaC2a7";

  return (
    <AppContext.Provider
      value={{
        snoBurnCa,
        boogCA,
        boiCA,
        provider,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
