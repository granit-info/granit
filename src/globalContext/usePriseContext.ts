import { useContext } from "react";
import PriseContext from "./PriceContext";

export const usePriseContext = () => {
  const context = useContext(PriseContext);
  if (!context) {
    throw new Error("usePriseContext must be used within GlobalProvider");
  }
  return context;
};
