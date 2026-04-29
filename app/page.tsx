export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-neutral-100 overflow-hidden">

      {/* Grain */}
      <div className="fixed inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none"/>

      {/* NAV */}
      <nav className="border-b border-neutral-800 sticky top-0 backdrop-blur-xl bg-[#090909]/80 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3 font-semibold text-lg">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/>
            Aneko Chamber
          </div>

          <div className="hidden md:flex gap-10 text-sm text-neutral-500">
            <a href="#">Product</a>
            <a href="#">How it Works</a>
            <a href="#">Docs</a>
          </div>

          <button className="bg-orange-500 hover:bg-orange-400 px-5 py-2 rounded-full text-sm font-medium">
            Request Access
          </button>

        </div>
      </nav>


      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <div>

            <div className="inline-flex mb-8 border border-orange-500/30 rounded-full px-4 py-2 text-xs tracking-[0.2em] uppercase text-orange-400">
              Group Order Intelligence
            </div>

            <h1 className="text-7xl md:text-8xl font-semibold leading-[0.9] tracking-tight mb-8">
              One bot.
              <br />
              Zero food
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.18)]">
                drama.
              </span>
            </h1>

            <p className="text-lg text-neutral-400 leading-relaxed max-w-lg mb-10">
              Lives inside Slack and WhatsApp. Collects everyone’s meal choices,
              assembles the cart, and handles the food run automatically.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-orange-500 hover:bg-orange-400 rounded-full px-7 py-4 font-medium">
                Add to Slack
              </button>

              <button className="text-neutral-400 hover:text-white px-4">
                See demo →
              </button>
            </div>

          </div>


          {/* Product Mockup */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">

            <div className="border-b border-neutral-800 px-6 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500"/>
              <div>
                <p className="text-sm">#team-lunch</p>
                <p className="text-xs text-green-400">Aneko Active</p>
              </div>
            </div>


            <div className="p-6 space-y-5">

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-xs">
                  AK
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-sm text-orange-200 max-w-sm">
                  Priya’s doing a Swiggy run in 20 mins — what does everyone want?
                </div>
              </div>


              <div className="ml-12 flex gap-2 flex-wrap">
                {["I'm in","Skip","Options"].map(item=>(
                  <span
                    key={item}
                    className="px-3 py-1 border border-neutral-700 rounded-full text-xs text-neutral-400"
                  >
                    {item}
                  </span>
                ))}
              </div>


              {[
                ["Rahul","Paneer butter masala + naan"],
                ["Deepa","Dal makhani no butter"],
                ["Arjun","Coke only"]
              ].map(([name,order])=>(
                <div key={name} className="flex gap-3">
                  <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center text-xs">
                    {name.slice(0,2)}
                  </div>

                  <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 text-sm">
                    {order}
                  </div>
                </div>
              ))}


              <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-xs">
                  AK
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-sm text-green-300">
                  3 orders assembled • Total ₹820 • Ready to confirm
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Feature strip */}
      <section className="border-y border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-10">

          {[
            "Preference Collection",
            "Budget Guardrails",
            "Smart Reminders",
            "One-click Ordering"
          ].map(item=>(
            <div key={item}>
              <div className="text-orange-400 text-sm mb-4">0{Math.random()*4|0+1}</div>
              <h3 className="text-xl mb-3">{item}</h3>
              <p className="text-neutral-500 text-sm">
                Built to eliminate group order chaos.
              </p>
            </div>
          ))}

        </div>
      </section>


      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-28">

        <div className="rounded-[32px] border border-neutral-800 bg-neutral-900 p-16 text-center">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6">
            Stop the lunch
            <br/>
            thread chaos.
          </h2>

          <p className="text-neutral-500 mb-10">
            First 100 teams get early access.
          </p>

          <div className="flex gap-3 max-w-md mx-auto">
            <input
              placeholder="your@company.com"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-5"
            />

            <button className="bg-orange-500 rounded-xl px-6 font-medium">
              Join
            </button>

          </div>
        </div>

      </section>

    </main>
  );
}