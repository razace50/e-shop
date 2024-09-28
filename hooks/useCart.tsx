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
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
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
      // Fetch cart items from localStorage
      const cartItems: string | null = localStorage.getItem("eShopCartItems");

      let cProducts: CartProductType[] = [];

      // Safely parse cartItems if it exists
      if (cartItems) {
        try {
          cProducts = JSON.parse(cartItems) || [];
        } catch (error) {
          console.error("Error parsing cartItems from localStorage:", error);
          cProducts = []; // Set to empty array in case of error
        }
      }

      // Ensure cProducts is an array and has items
      if (Array.isArray(cProducts) && cProducts.length > 0) {
        setCartProducts(cProducts);

        // Calculate the total quantity of products in the cart
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

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Oppps! Maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Oppps! It's minimum");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  // Fix applied here to clear the cart
  const handleClearCart = useCallback(() => {
    setCartProducts([]); // Set cartProducts to an empty array
    setCartTotalQty(0); // Reset the total quantity to 0
    localStorage.setItem("eShopCartItems", JSON.stringify([])); // Clear localStorage
  }, []);

  // Provide cart-related values and functions to the context
  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
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
