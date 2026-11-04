"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Store, PackageCheck, IndianRupee } from "lucide-react";

export default function Seller() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f7ed]">
      <header className="bg-white p-5 border-b">
        <Link href="/" className="text-2xl font-black text-[#174b35]">PAUDIVA.</Link>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-bold tracking-[3px] text-[#86a45e]">SELL WITH PAUDIVA</p>
          <h1 className="text-5xl font-black text-[#174b35] mt-4 leading-tight">Your green business starts here.</h1>
          <p className="text-[#718075] mt-5 leading-7">Reach customers who love plants, gardening and sustainable living. Register for free and list your products.</p>

          <div className="mt-9 space-y-5">
            <div className="flex gap-4"><Store className="text-[#668c4e]"/><div><b>Free seller registration</b><p className="text-sm text-[#849087]">No seller joining subscription.</p></div></div>
            <div className="flex gap-4"><PackageCheck className="text-[#668c4e]"/><div><b>Manage your products</b><p className="text-sm text-[#849087]">Control listings and stock.</p></div></div>
            <div className="flex gap-4"><IndianRupee className="text-[#668c4e]"/><div><b>Transparent commission model</b><p className="text-sm text-[#849087]">Marketplace commission on successful sales.</p></div></div>
          </div>
        </div>

        <form onSubmit={e => {e.preventDefault();setSubmitted(true);}} className="bg-white rounded-3xl shadow-lg p-7 space-y-4">
          <h2 className="text-2xl font-black text-[#174b35]">Seller Registration</h2>
          <p className="text-sm text-[#849087]">Tell us about your store.</p>
          <input required placeholder="Your full name" className="w-full border rounded-xl p-4"/>
          <input required placeholder="Store name" className="w-full border rounded-xl p-4"/>
          <input required type="tel" placeholder="Mobile number" className="w-full border rounded-xl p-4"/>
          <input required type="email" placeholder="Email address" className="w-full border rounded-xl p-4"/>
          <input required placeholder="City / PIN code" className="w-full border rounded-xl p-4"/>
          <select required className="w-full border rounded-xl p-4 bg-white">
            <option value="">Select business category</option>
            <option>Plants</option><option>Seeds</option><option>Garden Supplies</option><option>Eco Products</option>
          </select>
          <button className="w-full bg-[#174b35] text-white rounded-xl p-4 font-bold">Apply to Become a Seller</button>
          {submitted && <p className="text-sm text-center text-[#a15b25]">Demo submission only. Seller registration backend is not connected.</p>}
          <p className="text-xs text-center text-[#849087]">Registration is free. Applicable marketplace commission is charged only as per successful-sale terms.</p>
        </form>
      </div>
    </main>
  );
}