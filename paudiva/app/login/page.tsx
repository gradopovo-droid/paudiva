"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, ArrowLeft, Mail, Smartphone } from "lucide-react";

export default function Login() {
  const [method, setMethod] = useState("mobile");
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#f5f7ed] flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">
        <Link href="/" className="text-sm text-[#718075] flex items-center gap-2"><ArrowLeft size={16}/> Back to PAUDIVA</Link>
        <div className="mt-9 text-center">
          <div className="mx-auto bg-[#edf3e6] w-14 h-14 rounded-2xl flex items-center justify-center text-[#174b35]"><Leaf size={30}/></div>
          <h1 className="text-3xl font-black text-[#174b35] mt-5">Welcome Back</h1>
          <p className="text-sm text-[#849087] mt-2">Sign in to your PAUDIVA account</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <button onClick={() => {setMethod("mobile");setSent(false);}} className={`p-3 rounded-xl border flex justify-center gap-2 text-sm font-bold ${method === "mobile" ? "bg-[#174b35] text-white" : ""}`}><Smartphone size={17}/> Mobile</button>
          <button onClick={() => {setMethod("email");setSent(false);}} className={`p-3 rounded-xl border flex justify-center gap-2 text-sm font-bold ${method === "email" ? "bg-[#174b35] text-white" : ""}`}><Mail size={17}/> Email</button>
        </div>

        <form onSubmit={submit} className="mt-6">
          <label className="text-sm font-bold">{method === "mobile" ? "Mobile number" : "Email address"}</label>
          <input required value={value} onChange={e => setValue(e.target.value)} type={method === "mobile" ? "tel" : "email"} placeholder={method === "mobile" ? "+91 98765 43210" : "you@example.com"} className="w-full border rounded-xl p-4 mt-2 outline-none focus:border-[#174b35]"/>
          <button className="w-full bg-[#174b35] text-white rounded-xl p-4 mt-5 font-bold">Continue with OTP</button>
        </form>

        {sent && <p className="mt-4 text-sm text-center text-[#a15b25]">Demo only: OTP service is not connected yet.</p>}
        <p className="text-xs text-center text-[#849087] mt-7">By continuing, you agree to our Terms and Privacy Policy.</p>
        <p className="text-center text-xs text-[#849087] mt-5">Powered By V5</p>
      </div>
    </main>
  );
}