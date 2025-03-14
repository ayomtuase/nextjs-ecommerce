"use client";

import CartButton from "@/components/cart-button";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex items-center justify-end px-8 py-3">
        <CartButton />
      </div>
      {children}
    </>
  );
}
