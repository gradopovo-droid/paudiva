"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function Cart() {
  const [qty, setQty] = useState(1);
  const price = 499;

  return (
    <main className="min-h-screen bg-[#fafbf7]">
      <header className="bg-white border-b p-5">
        <Link href="/" className="text-2xl font-black text-[#174b35]">PAUDIVA.</Link>
      </header>
      <div className="max-w-4xl mx-auto px-5 py-12">
        <Link href="/products" className="text-sm text-[#718075] flex gap-2"><ArrowLeft size={16}/> Continue shopping</Link>
        <h1 className="text-4xl font-black mt-7 text-[#174b35]">Your Cart</h1>
        <div className="bg-white rounded-2xl border p-5 mt-8 flex gap-5 items-center">
          <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=300" className="w-24 h-24 rounded-xl object-cover" alt="Monstera plant"/>
          <div className="flex-1"><h2 className="font-bold">Monstera Deliciosa</h2><p className="text-sm text-[#849087]">Indoor Plants</p><b className="block mt-2">₹{price}</b></div>
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(Math.max(1,qty-1))} className="border rounded-lg w-8 h-8">−</button>
            {qty}
            <button onClick={() => setQty(qty+1)} className="border rounded-lg w-8 h-8">+</button>
          </div>
        </div>
        <div className="bg-white border rounded-2xl p-6 mt-6">
          <div className="flex justify-between"><span>Subtotal</span><b>₹{price*qty}</b></div>
          <div className="flex justify-between mt-3"><span>Delivery</span><span>Calculated by seller</span></div>
          <div className="border-t mt-5 pt-5 flex justify-between text-xl font-black"><span>Total</span><span>₹{price*qty}</span></div>
          <Link href="/checkout" className="block text-center bg-[#174b35] text-white rounded-xl p-4 mt-6 font-bold">Proceed to Checkout</Link>
        </div>
        <p className="text-xs text-[#849087] mt-4">Illustrative demo cart. Live inventory and prices require backend integration.</p>
      </div>
    </main>
  );
}