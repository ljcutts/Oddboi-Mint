import { createContext } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const masterCa = "0xc70375F2aa22D481Ad5d4D5787FF4e8dcc064D76";

  return (
    <AppContext.Provider
      value={{
        masterCa,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
