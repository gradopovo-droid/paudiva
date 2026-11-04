"use client";

import Link from "next/link";
import {
  Search, ShoppingBag, Menu, ArrowRight, Leaf,
  Sprout, Flower2, Trees, Truck, ShieldCheck,
  Headphones, Star, Heart
} from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Monstera Deliciosa", category: "Indoor Plants", price: 499, old: 699, image: "photo-1501004318641-b39e6451bec6", tag: "Bestseller" },
  { id: 2, name: "Peace Lily Plant", category: "Air Purifying", price: 349, old: 499, image: "photo-1497250681960-ef046c08a56e", tag: "Popular" },
  { id: 3, name: "Organic Seed Kit", category: "Seeds & Kits", price: 199, old: 299, image: "photo-1416879595882-3373a0480b5b", tag: "Eco Pick" },
  { id: 4, name: "Ceramic Planter", category: "Pots & Planters", price: 299, old: 399, image: "photo-1485955900006-10f4d324d411", tag: "Trending" }
];

const categories = [
  { name: "Indoor Plants", icon: Sprout },
  { name: "Flowering Plants", icon: Flower2 },
  { name: "Seeds", icon: Leaf },
  { name: "Garden Supplies", icon: Trees }
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <div className="bg-[#123c2b] text-white text-center py-2 text-xs tracking-wide">
        🌱 A greener tomorrow starts with you — Explore PAUDIVA
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8eee7]">
        <div className="max-w-7xl mx-auto px-5 h-[76px] flex items-center justify-between gap-5">
          <Link href="/" className="text-3xl font-black tracking-tight text-[#174b35]">
            PAUDIVA<span className="text-[#a7c96b]">.</span>
            <div className="text-[9px] tracking-[3px] font-medium text-[#718075] -mt-1">
              GROW GREEN. LIVE BETTER.
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#345744]">
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products">Shop</a>
            <Link href="/seller">Become a Seller</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/products" className="hidden sm:block"><Search size={21}/></Link>
            <Link href="/cart" className="relative">
              <ShoppingBag size={22}/>
              <span className="absolute -top-2 -right-2 bg-[#b6d77d] text-[#174b35] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cart}</span>
            </Link>
            <Link href="/login" className="hidden sm:block bg-[#174b35] text-white rounded-full px-5 py-2.5 text-sm font-semibold">Sign In</Link>
            <button className="md:hidden" onClick={() => setMenu(!menu)}><Menu/></button>
          </div>
        </div>
        {menu && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4 text-sm font-semibold">
            <a href="#categories" onClick={() => setMenu(false)}>Categories</a>
            <a href="#products" onClick={() => setMenu(false)}>Shop</a>
            <Link href="/seller">Become a Seller</Link>
            <Link href="/login">Sign In</Link>
          </div>
        )}
      </header>

      <section id="home" className="bg-[#f5f7ed] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e5edda] text-[#426b42] rounded-full px-4 py-2 text-xs font-bold mb-7">
              <Leaf size={14}/> INDIA'S GREEN MARKETPLACE
            </div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] font-black tracking-tight text-[#173f2d]">
              Bring Nature<br/>Closer to <span className="text-[#8baa55]">Home.</span>
            </h1>
            <p className="mt-6 text-[#718075] text-base md:text-lg leading-8 max-w-lg">
              Discover beautiful plants, fresh seeds and thoughtful garden essentials from trusted independent sellers across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="bg-[#174b35] text-white px-7 py-4 rounded-full font-bold text-sm flex items-center gap-3 hover:bg-[#103a29]">
                Explore Products <ArrowRight size={17}/>
              </a>
              <Link href="/seller" className="border border-[#b9c9b5] px-7 py-4 rounded-full font-bold text-sm text-[#174b35]">
                Start Selling
              </Link>
            </div>
            <div className="flex gap-8 mt-12">
              <div><div className="text-2xl font-black">100%</div><div className="text-xs text-[#718075] mt-1">Green mindset</div></div>
              <div><div className="text-2xl font-black">India</div><div className="text-xs text-[#718075] mt-1">Focused marketplace</div></div>
              <div><div className="text-2xl font-black">Free</div><div className="text-xs text-[#718075] mt-1">Seller registration</div></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 bg-[#dce8cb] rounded-[45%] blur-2xl opacity-60"/>
            <img
              src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=1000"
              alt="Beautiful green indoor plants"
              className="relative w-full h-[390px] md:h-[510px] object-cover rounded-[32px] shadow-xl"
            />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-[#6c9147] text-xs font-bold"><Leaf size={15}/> GROW WITH NATURE</div>
              <div className="font-bold text-[#174b35] mt-1">Make your space greener.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          [Truck, "Seller-managed delivery", "Flexible delivery choices"],
          [ShieldCheck, "Secure checkout", "Protected payment flow"],
          [Sprout, "Free seller registration", "No joining subscription"],
          [Headphones, "Customer support", "Help when you need it"]
        ].map(([Icon, title, desc]: any, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="bg-[#edf3e6] p-3 rounded-xl text-[#477347]"><Icon size={22}/></div>
            <div><div className="font-bold text-sm">{title}</div><div className="text-xs text-[#849087] mt-1">{desc}</div></div>
          </div>
        ))}
      </section>

      <section id="categories" className="bg-[#fafbf7] py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-end mb-8">
            <div><p className="text-xs tracking-[3px] text-[#86a45e] font-bold">EXPLORE THE GREEN WORLD</p><h2 className="text-3xl md:text-4xl font-black mt-2">Shop by Category</h2></div>
            <Link href="/products" className="text-sm font-bold text-[#477347] hidden sm:flex items-center gap-2">View all <ArrowRight size={16}/></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(({name, icon: Icon}) => (
              <Link href="/products" key={name} className="bg-white border border-[#edf0e8] rounded-2xl p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-xl bg-[#edf3e6] flex items-center justify-center text-[#547c45]"><Icon size={25}/></div>
                <h3 className="font-bold mt-5">{name}</h3>
                <p className="text-xs text-[#849087] mt-1">Explore collection <ArrowRight className="inline" size={12}/></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div><p className="text-xs tracking-[3px] text-[#86a45e] font-bold">HANDPICKED FOR YOU</p><h2 className="text-3xl md:text-4xl font-black mt-2">Green Goodness</h2></div>
          <div className="flex items-center border rounded-full px-4 py-3 gap-2 max-w-sm w-full">
            <Search size={17} className="text-[#849087]"/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search plants, seeds..." className="outline-none w-full text-sm"/>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-[#f2f4ed]">
                <img src={`https://images.unsplash.com/${p.image}?w=600`} alt={p.name} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition duration-500"/>
                <span className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-[10px] font-bold">{p.tag}</span>
                <button onClick={() => setLiked(old => old.includes(p.id) ? old.filter(x => x !== p.id) : [...old, p.id])} className="absolute top-3 right-3 bg-white rounded-full p-2"><Heart size={16} fill={liked.includes(p.id) ? "#d65b5b" : "none"} color={liked.includes(p.id) ? "#d65b5b" : "#345744"}/></button>
              </div>
              <div className="pt-4">
                <p className="text-[11px] text-[#8b9a88]">{p.category}</p>
                <h3 className="font-bold mt-1 text-sm md:text-base">{p.name}</h3>
                <div className="flex items-center gap-2 mt-2"><span className="font-black">₹{p.price}</span><span className="text-xs line-through text-[#9aa39a]">₹{p.old}</span></div>
                <button onClick={() => setCart(c => c + 1)} className="mt-3 w-full border border-[#174b35] text-[#174b35] rounded-full py-2.5 text-xs font-bold hover:bg-[#174b35] hover:text-white transition">Add to Cart</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="col-span-4 text-center text-[#718075] py-10">No matching products found.</p>}
        </div>
      </section>

      <section className="mx-5 md:mx-auto max-w-7xl rounded-[30px] bg-[#174b35] text-white overflow-hidden">
        <div className="px-8 py-12 md:p-16 grid md:grid-cols-2 gap-8 items-center">
          <div><p className="text-xs tracking-[3px] text-[#c2dc91] font-bold">GROW YOUR BUSINESS</p><h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">Have something<br/>green to share?</h2><p className="text-white/70 mt-5 leading-7">Join PAUDIVA as a seller. List your products for free and connect with customers who love nature.</p><Link href="/seller" className="inline-flex mt-8 bg-[#d8edaa] text-[#174b35] px-7 py-4 rounded-full font-bold text-sm items-center gap-2">Become a Seller <ArrowRight size={17}/></Link></div>
          <div className="rounded-3xl overflow-hidden h-64 md:h-80"><img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900" alt="Gardening and plants" className="w-full h-full object-cover"/></div>
        </div>
      </section>

      <footer className="mt-16 bg-[#102f23] text-white">
        <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2"><div className="text-3xl font-black">PAUDIVA.</div><p className="text-[#b5c5b8] text-sm mt-3 max-w-xs">Grow Green. Live Better. A marketplace bringing India's green community together.</p></div>
          <div><h4 className="font-bold mb-4">Explore</h4><div className="text-sm text-[#b5c5b8] flex flex-col gap-3"><a href="#products">Shop</a><a href="#categories">Categories</a><Link href="/seller">Sell with us</Link></div></div>
          <div><h4 className="font-bold mb-4">Help</h4><div className="text-sm text-[#b5c5b8] flex flex-col gap-3"><Link href="/login">My Account</Link><Link href="/support">Customer Support</Link><Link href="/admin">Admin</Link></div></div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-[#a9b9ad]">© 2026 PAUDIVA. All rights reserved. <span className="ml-2">Powered By V5</span></div>
      </footer>
    </main>
  );
}