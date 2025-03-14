"use client";

import React, { createContext, ReactNode, useEffect, useReducer } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface State {
  cart: CartItem[];
}

type Action =
  | {
      type: "ADD_TO_CART" | "REMOVE_FROM_CART";
      payload: { product: Product; quantity?: number; reset?: boolean };
    }
  | {
      type: "DECREMENT_CART";
      payload: { productId: number; quantity?: number };
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: number;
    }
  | {
      type: "BULK_UPDATE";
      payload: State;
    };

interface CartContextProps extends State {
  totalCartCount: number;
  cartTotalPrice: number;
  addToCart: (product: Product, quantity?: number, reset?: boolean) => void;
  removeFromCart: (productId: number) => void;
  decrementCart: (productId: number, quantity?: number) => void;
  isProductInCart: (productId: number) => number | false;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const initialState: State = {
  cart: [],
};

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const {
        product,
        quantity = 1,
        reset = false,
      } = action.payload as {
        product: Product;
        quantity?: number;
        reset?: boolean;
      };
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existingItem.id
              ? {
                  ...item,
                  quantity: reset ? quantity : item.quantity + quantity,
                }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...product, quantity }] };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.id !== (action.payload as number)
        ),
      };
    }
    case "DECREMENT_CART": {
      const productId = action.payload?.productId;
      const quantity = action.payload.quantity || 1;
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "BULK_UPDATE": {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = window.localStorage.getItem("productCatalog");
      if (localData) {
        dispatch({ type: "BULK_UPDATE", payload: JSON.parse(localData) });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productCatalog", JSON.stringify(state));
  }, [state]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    reset: boolean = false
  ) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity, reset } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const decrementCart = (productId: number, quantity: number = 1) => {
    dispatch({ type: "DECREMENT_CART", payload: { productId, quantity } });
  };

  const isProductInCart = (productId: number): number | false => {
    const item = state.cart.find((item) => item.id === productId);
    return item ? item.quantity : false;
  };

  const totalCartCount = state.cart?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const cartTotalPrice = state.cart?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        totalCartCount,
        cartTotalPrice,
        addToCart,
        removeFromCart,
        decrementCart,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export default useCart;
