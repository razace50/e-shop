import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    const cartItems: string | null = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] = cartItems ? JSON.parse(cartItems) : [];

    if (cProducts.length > 0) {
      setCartProducts(cProducts);

      // Update the total quantity based on the products in the cart
      const totalQty = cProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      setCartTotalQty(totalQty);
    }
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = [...prev, product];

      // Update the total quantity
      setCartTotalQty((prevQty) => prevQty + product.quantity);
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
