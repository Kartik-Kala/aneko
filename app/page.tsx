export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0d] text-neutral-100 overflow-hidden relative">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,.02))]" />

      {/* Floating Orb */}
      <div className="absolute top-32 right-20 w-72 h-72 rounded-full blur-3xl bg-violet-500/20" />

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Top Label */}
        <div className="mb-12">
          <span className="border border-neutral-700 rounded-full px-5 py-2 text-xs tracking-[0.3em] uppercase text-neutral-400">
            Private Beta Chamber
          </span>
        </div>

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">

          <div>
            <p className="text-sm tracking-[0.35em] uppercase text-violet-400 mb-5">
              The Chamber of Group Ordering
            </p>

            <h1 className="text-7xl md:text-8xl font-semibold leading-[0.95] mb-8">
              Aneko
              <span className="block text-neutral-500">
                Chamber
              </span>
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed max-w-xl mb-10">
              A private orchestration layer where teams negotiate meals,
              assemble shared carts, approve budgets, and execute food orders —
              through one intelligent chamber.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-violet-500 hover:bg-violet-400 transition px-7 py-4 rounded-2xl font-medium shadow-2xl">
                Enter Chamber
              </button>

              <button className="border border-neutral-700 hover:border-neutral-500 px-7 py-4 rounded-2xl">
                View Protocol
              </button>
            </div>
          </div>


          {/* Chamber Panel */}
          <div className="rounded-[32px] border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-8 shadow-2xl">

            <div className="flex justify-between mb-8 text-sm text-neutral-500">
              <span>Chamber Session</span>
              <span>ACTIVE</span>
            </div>

            <div className="space-y-4 text-lg">
              <div className="border border-neutral-800 rounded-2xl p-5">
                “Order lunch for 12 people under ₹300”
              </div>

              <div className="border border-violet-500/30 bg-violet-500/10 rounded-2xl p-5">
                → Restaurants summoned
              </div>

              <div className="border border-violet-500/30 bg-violet-500/10 rounded-2xl p-5">
                → Preferences negotiated
              </div>

              <div className="border border-violet-500/30 bg-violet-500/10 rounded-2xl p-5">
                → Shared cart assembled
              </div>

              <div className="border border-violet-500/30 bg-violet-500/10 rounded-2xl p-5">
                → Approval secured
              </div>

            </div>
          </div>

        </div>


        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-28">

          <div className="rounded-3xl border border-neutral-800 p-8 bg-neutral-900/50">
            <p className="text-violet-400 mb-4 text-sm uppercase tracking-wider">
              Coordination
            </p>

            <h3 className="text-2xl mb-4">
              Preference Consensus
            </h3>

            <p className="text-neutral-400">
              Collects dietary choices, budgets, and group signals before orders.
            </p>
          </div>


          <div className="rounded-3xl border border-neutral-800 p-8 bg-neutral-900/50">
            <p className="text-violet-400 mb-4 text-sm uppercase tracking-wider">
              Workflow
            </p>

            <h3 className="text-2xl mb-4">
              Approval Rituals
            </h3>

            <p className="text-neutral-400">
              Manager approvals, budget gates, and shared ordering logic.
            </p>
          </div>


          <div className="rounded-3xl border border-neutral-800 p-8 bg-neutral-900/50">
            <p className="text-violet-400 mb-4 text-sm uppercase tracking-wider">
              Execution
            </p>

            <h3 className="text-2xl mb-4">
              Order Dispatch
            </h3>

            <p className="text-neutral-400">
              Final cart routed through Swiggy infrastructure.
            </p>
          </div>

        </div>


        {/* Architecture Strip */}
        <div className="border-y border-neutral-800 py-10 mb-20">
          <div className="grid md:grid-cols-4 gap-6 text-center text-neutral-400">
            <div>Next.js</div>
            <div>TypeScript</div>
            <div>Prisma + Supabase</div>
            <div>Swiggy MCP</div>
          </div>
        </div>


        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between gap-6 text-sm text-neutral-500">
          <p>github.com/Kartik-Kala/anekochamber</p>
          <p>hello@anekochamber.com</p>
        </footer>

      </section>
    </main>
  );
}