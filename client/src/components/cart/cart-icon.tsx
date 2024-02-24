import { Link } from "react-router-dom";
import useCart from "../../hooks/use-cart";

import React from "react";
import cn from "../../utils/cn";

function _CartIcon({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-8 h-8", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
}

function CartIcon() {
  const { data, isLoading, error } = useCart();

  // if (error) {
  //   return (
  //     <Link to={"/cart"}>
  //       <div className="relative">
  //         <_CartIcon className="w-8 h-8" />
  //       </div>
  //     </Link>
  //   );
  // }

  return (
    <Link to={"/cart"}>
      <div className="relative">
        <_CartIcon className="w-6 h-6" />
        {data && (
          <p className="absolute left-4 top-[-4px] flex justify-center items-center bg-secondary w-4 h-4 p-1 rounded-full right-[-10px]">
            {isLoading || data?.cartItems?.length}
          </p>
        )}
      </div>
    </Link>
  );
}

export default CartIcon;
