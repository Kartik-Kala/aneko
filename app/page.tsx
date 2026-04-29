export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <p className="text-sm uppercase tracking-widest mb-6">
          Prototype in Development
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Aneko
        </h1>

        <p className="text-2xl mb-10 max-w-2xl leading-relaxed">
          AI copilot for workplace group food ordering built on Swiggy Food MCP.
        </p>

        <div className="border rounded-2xl p-8 mb-12">
          <p className="text-lg mb-4 font-medium">
            Example Request
          </p>

          <pre className="whitespace-pre-wrap text-base">
{`Order lunch for 10 people under ₹250 each

→ Suggest restaurants
→ Collect preferences
→ Build shared cart
→ Manager approval
→ Place order`}
          </pre>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div>
            <h2 className="text-xl font-semibold mb-3">
              What Aneko does
            </h2>

            <ul className="space-y-2">
              <li>• Coordinates team food preferences</li>
              <li>• Creates shared group carts</li>
              <li>• Supports approval workflows</li>
              <li>• Places orders through Swiggy infrastructure</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Stack
            </h2>

            <ul className="space-y-2">
              <li>• Next.js</li>
              <li>• TypeScript</li>
              <li>• Prisma + Supabase</li>
              <li>• Claude + Swiggy MCP</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-sm">
          <p className="mb-2">
            GitHub: https://github.com/Kartik-Kala/aneko
          </p>

          <p>
            Contact: hello@aneko.com
          </p>
        </div>

      </div>
    </main>
  );
}