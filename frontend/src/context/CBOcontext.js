import { createContext, useReducer, useContext } from "react";

export const CBOContext = createContext(); // ✅ Export CBOContext

export const cboReducer = (state, action) => {
  switch (action.type) {
    case "SET_CBOS":
      return { cbos: action.payload };
    case "CREATE_CBO":
      return { cbos: [action.payload, ...state.cbos] };
    case "DELETE_CBO":
      return { cbos: state.cbos.filter((cbo) => cbo._id !== action.payload) };
    default:
      return state;
  }
};

export const CBOContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cboReducer, { cbos: [] });

  return (
    <CBOContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CBOContext.Provider>
  );
};

// Custom hook to use CBOContext
export const useCBOContext = () => {
  const context = useContext(CBOContext);
  if (!context) {
    throw new Error("useCBOContext must be used inside a CBOContextProvider");
  }
  return context;
};
