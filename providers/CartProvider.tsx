"use client";

import { CartContextProvider } from "@/hooks/useCart";
import { dividerClasses } from "@mui/material";

interface CarProviderProps {
  children: React.ReactNode;
}
const CartProvider: React.FC<CarProviderProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
