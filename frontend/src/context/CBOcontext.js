import { createContext, useReducer, useContext, useMemo } from "react";

export const CBOContext = createContext();

export const cboReducer = (state, action) => {
  switch (action.type) {
    case "SET_CBOS":
      return { ...state, cbos: action.payload, isLoading: false };
    case "CREATE_CBO":
      return { ...state, cbos: [action.payload, ...state.cbos] };
    case "DELETE_CBO":
      return { ...state, cbos: state.cbos.filter((cbo) => cbo._id !== action.payload) };
    case "UPDATE_CBO":
      return {
        ...state,
        cbos: state.cbos.map((cbo) =>
          cbo._id === action.payload._id ? action.payload : cbo
        ),
      };
    case "FETCH_CBOS_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_CBOS_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const CBOContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cboReducer, {
    cbos: [],
    isLoading: false,
    error: null,
  });

  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return <CBOContext.Provider value={value}>{children}</CBOContext.Provider>;
};

export const useCBOContext = () => {
  const context = useContext(CBOContext);
  if (!context) {
    throw new Error("useCBOContext must be used inside a CBOContextProvider");
  }
  return context;
};