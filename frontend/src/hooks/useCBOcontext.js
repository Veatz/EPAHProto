import { useContext } from "react";
import { CBOContext } from "../context/CBOcontext"; 

export const useCBOContext = () => {
  const context = useContext(CBOContext);

  if (!context) {
    throw new Error("useCBOContext must be used inside a CBOContextProvider");
  }
  
  return context;
};
