import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

// Define the Cart context type
type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
};

// Create the Cart context with initial value null
export const CartContext = createContext<CartContextType | null>(null);

// Define props interface
interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItems: string | null = localStorage.getItem("eShopCartItems");
      const cProducts: CartProductType[] = cartItems
        ? JSON.parse(cartItems)
        : [];

      if (cProducts.length > 0) {
        setCartProducts(cProducts);

        // Update the total quantity based on the products in the cart
        const totalQty = cProducts.reduce(
          (acc, product) => acc + (product.quantity || 0),
          0
        );
        setCartTotalQty(totalQty);
      }
    }
  }, []);

  // Handle adding a product to the cart
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      let updatedCart;

      // If the product already exists in the cart, update its quantity
      if (existingProduct) {
        updatedCart = prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      } else {
        // If the product is new, add it to the cart
        updatedCart = [...prev, product];
      }

      // Update the total quantity in the cart
      const totalQty = updatedCart.reduce(
        (acc, p) => acc + (p.quantity || 0),
        0
      );
      setCartTotalQty(totalQty);

      // Show a success toast notification
      toast.success("Product added to cart");

      // Save the updated cart to localStorage
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);
  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProducts);
        toast.success("Product removed");

        // Save the updated cart to localStorage
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );

        return filteredProducts;
      }
    },
    [cartProducts]
  );

  // Provide cart-related values and functions to the context
  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
