"use client";

import Link from "next/link";
import { useState } from "react";

export default function Checkout() {
  const [method,setMethod] = useState("COD");
  const [done,setDone] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f7ed]">
      <header className="bg-white p-5 border-b"><Link href="/" className="text-2xl font-black text-[#174b35]">PAUDIVA.</Link></header>
      <div className="max-w-2xl mx-auto p-5 py-12">
        <h1 className="text-4xl font-black text-[#174b35]">Checkout</h1>
        <form onSubmit={e=>{e.preventDefault();setDone(true);}} className="bg-white rounded-2xl p-6 mt-8 space-y-4">
          <h2 className="font-bold text-xl">Delivery Details</h2>
          <input required placeholder="Full name" className="w-full border rounded-xl p-4"/>
          <input required type="tel" placeholder="Delivery mobile number" className="w-full border rounded-xl p-4"/>
          <textarea required placeholder="Full delivery address" className="w-full border rounded-xl p-4"/>
          <input required maxLength={6} minLength={6} pattern="[0-9]{6}" placeholder="6-digit PIN code" className="w-full border rounded-xl p-4"/>
          <h2 className="font-bold text-xl pt-4">Payment Method</h2>
          {["COD","UPI","Card"].map(m=><label key={m} className="flex gap-3 border rounded-xl p-4"><input type="radio" checked={method===m} onChange={()=>setMethod(m)} />{m === "COD" ? "Cash on Delivery" : m}</label>)}
          <button className="w-full bg-[#174b35] text-white rounded-xl p-4 font-bold">Place Demo Order</button>
          {done && <p className="text-sm text-[#a15b25]">Demo only: no real order or payment was created.</p>}
        </form>
      </div>
    </main>
  );
}