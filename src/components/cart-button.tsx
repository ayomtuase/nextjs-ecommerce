"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCart from "@/lib/store";
import { GrCart } from "react-icons/gr";
import { ScrollArea } from "./ui/scroll-area";

const CartButton = () => {
  const {
    totalCartCount,
    cart,
    cartTotalPrice,
    decrementCart,
    addToCart,
    removeFromCart,
  } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="bg-gray-50 text-primary rounded-sm hover:bg-transparent"
        >
          <span className="relative">
            <span className="absolute -left-1/2 -top-1/2 translate-x-1/2 translate-y-1/2 rounded-full px-1 bg-primary text-sm text-white">
              {totalCartCount}
            </span>
            <GrCart size="28" />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-auto">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col px-3">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <p className="text-gray-800">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementCart(item.id, 1)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToCart(item, 1, false)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="font-semibold text-xl">
            Total Price: ${cartTotalPrice}
          </p>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
