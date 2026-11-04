
const categories = [
  { icon: "🪴", name: "Indoor Plants", desc: "Living greenery" },
  { icon: "🌻", name: "Seeds", desc: "Grow from scratch" },
  { icon: "💐", name: "Flowers", desc: "Natural beauty" },
  { icon: "🌿", name: "Garden Supplies", desc: "Garden essentials" },
  { icon: "🌳", name: "Outdoor Plants", desc: "Green outdoors" },
  { icon: "♻️", name: "Eco Products", desc: "Sustainable living" },
];

const products = [
  { icon: "🪴", name: "Monstera Deliciosa", category: "Indoor Plant", price: 499, old: 699, bg: "bg-green-100", tag: "POPULAR" },
  { icon: "🌵", name: "Mini Cactus Plant", category: "Succulents", price: 199, old: 299, bg: "bg-lime-100", tag: "BESTSELLER" },
  { icon: "🌻", name: "Sunflower Seeds", category: "Seeds", price: 99, old: 149, bg: "bg-yellow-100", tag: "NEW" },
  { icon: "🌿", name: "Peace Lily Plant", category: "Indoor Plant", price: 349, old: 449, bg: "bg-emerald-100", tag: "TRENDING" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfcf8] text-[#183b2b]">

      {/* Announcement */}
      <div className="bg-[#173d2c] px-4 py-2 text-center text-xs text-white">
        🌱 Grow greener, live better — Welcome to PAUDIVA
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-green-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">

          <a href="#" className="text-2xl font-black tracking-tight text-[#1d613b]">
            PAUDIVA<span className="text-[#a4c957]">.</span>
            <span className="block text-[9px] font-medium tracking-[3px] text-gray-500">
              GROW GREEN. LIVE BETTER.
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#" className="hover:text-green-600">Home</a>
            <a href="#categories" className="hover:text-green-600">Categories</a>
            <a href="#products" className="hover:text-green-600">Shop</a>
            <a href="#sell" className="hover:text-green-600">Become a Seller</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#products" className="rounded-full border border-green-200 px-4 py-2 text-sm font-bold">
              🛒 Cart
            </a>
            <a href="#login" className="rounded-full bg-[#1d613b] px-4 py-2 text-sm font-bold text-white">
              Login
            </a>
          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">

        <div>
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-800">
            🌿 INDIA'S GREEN MARKETPLACE
          </span>

          <h1 className="mt-6 text-5xl font-black leading-[1.12] tracking-tight md:text-7xl">
            Bring Nature
            <br />
            Closer to <span className="text-[#75a943]">You.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600">
            Discover beautiful plants, fresh seeds, flowers and eco-friendly essentials from independent sellers across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="rounded-full bg-[#1d613b] px-7 py-4 text-sm font-bold text-white shadow-lg">
              Explore Products →
            </a>
            <a href="#sell" className="rounded-full border border-green-200 bg-white px-7 py-4 text-sm font-bold">
              Start Selling
            </a>
          </div>

          <div className="mt-10 flex gap-8 text-sm">
            <div>
              <b className="block text-2xl">🌱</b>
              <span className="text-gray-500">Grow naturally</span>
            </div>
            <div>
              <b className="block text-2xl">♻️</b>
              <span className="text-gray-500">Live sustainably</span>
            </div>
            <div>
              <b className="block text-2xl">🇮🇳</b>
              <span className="text-gray-500">Made for India</span>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-[35px] bg-gradient-to-br from-[#dcefc9] via-[#b9dba2] to-[#6f9d63] p-8">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/20" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-green-900/10" />

          <div className="relative text-center">
            <div className="text-[130px] drop-shadow-xl">🪴</div>
            <p className="mt-2 text-2xl font-black text-[#214c2d]">
              A little green goes a long way.
            </p>
            <p className="mt-2 text-sm text-[#315d3b]">
              Find your next favourite plant.
            </p>
          </div>
        </div>

      </section>

      {/* Categories */}
      <section id="categories" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-9">
            <p className="text-xs font-bold tracking-[3px] text-green-600">
              EXPLORE
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((item) => (
              <a
                href="#products"
                key={item.name}
                className="rounded-2xl border border-green-100 bg-[#fbfcf8] p-5 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-4 text-sm font-extrabold">{item.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="mx-auto max-w-7xl px-5 py-16">

        <div className="mb-9">
          <p className="text-xs font-bold tracking-[3px] text-green-600">
            HANDPICKED FOR YOU
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Featured Products
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Discover something green for every space.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-2xl border border-green-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`${product.bg} relative flex h-36 items-center justify-center sm:h-48`}>
                <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-[9px] font-black">
                  {product.tag}
                </span>
                <span className="text-7xl">{product.icon}</span>
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500">{product.category}</p>
                <h3 className="mt-1 text-sm font-extrabold">{product.name}</h3>

                <div className="mt-3 flex items-center gap-2">
                  <b>₹{product.price}</b>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.old}
                  </span>
                </div>

                <button className="mt-4 w-full rounded-full bg-[#1d613b] py-2.5 text-xs font-bold text-white">
                  View Product
                </button>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* Seller Section */}
      <section id="sell" className="mx-5 mb-16 rounded-[30px] bg-[#173d2c] px-6 py-12 text-center text-white md:mx-auto md:max-w-7xl">

        <div className="text-4xl">🌿</div>

        <h2 className="mt-4 text-3xl font-black">
          Have something green to sell?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-green-100">
          Join PAUDIVA as a seller. Showcase your plants, seeds and eco-friendly products to customers across India.
        </p>

        <a href="#login" className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-bold text-[#173d2c]">
          Become a Seller →
        </a>

      </section>

      {/* Footer */}
      <footer id="login" className="border-t border-green-100 bg-white px-5 py-9 text-center">

        <h2 className="text-2xl font-black text-[#1d613b]">
          PAUDIVA.
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Grow Green. Live Better.
        </p>

        <p className="mt-5 text-xs font-bold tracking-widest text-gray-500">
          POWERED BY V5
        </p>

        <p className="mt-3 text-xs text-gray-400">
          © 2026 PAUDIVA. All rights reserved.
        </p>

      </footer>

    </main>
  );
}
