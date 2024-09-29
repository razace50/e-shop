"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const Router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => Router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span
        className="absolute
      top-[-10px]
      bg-slate-700
      text-white
      h-g
      w-6
      rounded-full
      flex
      items-center
      justify-center
      text-sm
      "
      >
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
