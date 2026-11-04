"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, ArrowLeft, SlidersHorizontal } from "lucide-react";

const items = [
  { id: 1, name: "Monstera Deliciosa", category: "Indoor Plants", price: 499, image: "photo-1501004318641-b39e6451bec6" },
  { id: 2, name: "Peace Lily", category: "Indoor Plants", price: 349, image: "photo-1497250681960-ef046c08a56e" },
  { id: 3, name: "Organic Seed Kit", category: "Seeds", price: 199, image: "photo-1416879595882-3373a0480b5b" },
  { id: 4, name: "Ceramic Planter", category: "Pots", price: 299, image: "photo-1485955900006-10f4d324d411" },
  { id: 5, name: "Garden Collection", category: "Garden Supplies", price: 599, image: "photo-1466692476868-aef1dfb1e735" },
  { id: 6, name: "Indoor Green Plant", category: "Indoor Plants", price: 249, image: "photo-1483794344563-d27a8d18014e" }
];

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(0);

  const filtered = items.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  return (
    <main className="min-h-screen bg-[#fafbf7]">
      <header className="bg-white border-b p-5 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-[#174b35]">PAUDIVA.</Link>
        <Link href="/cart" className="flex gap-2 items-center font-bold"><ShoppingBag/> Cart ({cart})</Link>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/" className="text-sm text-[#718075] flex gap-2 items-center"><ArrowLeft size={16}/> Back home</Link>
        <h1 className="text-4xl font-black mt-6 text-[#174b35]">Explore Products</h1>
        <p className="text-[#718075] mt-2">Find something green for your space.</p>

        <div className="mt-8 flex gap-3 border bg-white rounded-xl px-4 py-3">
          <Search/>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search plants, seeds and more..." className="outline-none w-full"/>
        </div>

        <div className="flex gap-2 flex-wrap my-6">
          {["All", "Indoor Plants", "Seeds", "Pots", "Garden Supplies"].map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full text-sm font-bold ${category === c ? "bg-[#174b35] text-white" : "bg-white border text-[#174b35]"}`}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-[#edf0e8]">
              <img src={`https://images.unsplash.com/${p.image}?w=600`} className="w-full h-48 object-cover" alt={p.name}/>
              <div className="p-4">
                <p className="text-xs text-[#849087]">{p.category}</p>
                <h3 className="font-bold mt-1">{p.name}</h3>
                <p className="font-black mt-2">₹{p.price}</p>
                <button onClick={() => setCart(v => v + 1)} className="mt-4 w-full bg-[#174b35] text-white rounded-full py-3 text-sm font-bold">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center py-12 text-[#718075]">No products found.</p>}
      </div>
    </main>
  );
}