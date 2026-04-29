"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const OCCASION_LABELS: Record<string, string> = {
  lunch: "Team Lunch",
  dinner: "Team Dinner",
  party: "Office Party",
  client_dinner: "Client Dinner",
  pantry: "Pantry Restock",
}

const OCCASION_EMOJI: Record<string, string> = {
  lunch: "🍱",
  dinner: "🍽️",
  party: "🎉",
  client_dinner: "🤝",
  pantry: "📦",
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [sessions, setSessions] = useState<any[]>([])
  const [workspace, setWorkspace] = useState<any>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: "",
    occasion: "lunch",
    budget: "",
    headcount: "",
  })

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions() {
    const res = await fetch("/api/sessions")
    if (res.ok) {
      const data = await res.json()
      setSessions(data.sessions)
      setWorkspace(data.workspace)
    }
    setLoading(false)
  }

  async function createSession(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const data = await res.json()
      router.push(`/session/${data.session.id}`)
    }
  }

  const statusColors: Record<string, string> = {
    open: "#22c55e",
    aggregating: "#f5a623",
    confirmed: "#3b82f6",
    placed: "#8b5cf6",
    completed: "#6b7280",
  }

  return (
    <div className="min-h-screen" style={{ background: "#0c0c0d" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0c0c0d" }}>
        <div className="flex items-center gap-3">
          <span className="text-xl font-light" style={{ fontFamily: "Georgia, serif", color: "#f0ece3" }}>
            Aneko<span style={{ color: "#f5a623" }}>.</span>
          </span>
          {workspace && (
            <>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              <span className="text-sm" style={{ color: "#8a8680" }}>{workspace.name}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "#8a8680" }}>{session?.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8a8680" }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-light" style={{ fontFamily: "Georgia, serif", color: "#f0ece3" }}>
              Order sessions
            </h2>
            <p className="text-sm mt-1" style={{ color: "#8a8680" }}>
              Create a session, share the link, let the team order
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "#f5a623", color: "#0c0c0d" }}
          >
            + New session
          </button>
        </div>

        {/* Sessions grid */}
        {loading ? (
          <div className="text-center py-16" style={{ color: "#4a4844" }}>Loading...</div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 border rounded-xl" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#141416" }}>
            <p className="text-4xl mb-3">🍱</p>
            <p className="text-sm" style={{ color: "#8a8680" }}>No sessions yet. Create your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((s) => (
              <Link key={s.id} href={`/session/${s.id}`}>
                <div className="rounded-xl p-5 border cursor-pointer transition-all hover:border-amber-500/30" style={{ background: "#141416", borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{OCCASION_EMOJI[s.occasion] || "🍽️"}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColors[s.status]}20`, color: statusColors[s.status] }}>
                      {s.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm mb-1" style={{ color: "#f0ece3" }}>{s.title}</h3>
                  <p className="text-xs mb-3" style={{ color: "#8a8680" }}>{OCCASION_LABELS[s.occasion]}</p>
                  <div className="flex items-center justify-between text-xs" style={{ color: "#4a4844" }}>
                    <span>₹{s.budget.toLocaleString()} budget</span>
                    <span>{s._count?.participants || 0} joined</span>
                  </div>
                  <div className="mt-2 text-xs" style={{ color: "#4a4844" }}>
                    by {s.host?.name?.split(" ")[0]}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create session modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-xl p-6 border" style={{ background: "#141416", borderColor: "rgba(255,255,255,0.1)" }}>
            <h3 className="text-lg font-light mb-5" style={{ fontFamily: "Georgia, serif", color: "#f0ece3" }}>
              New order session
            </h3>
            <form onSubmit={createSession} className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#8a8680" }}>Session name</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Friday office party"
                  required
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", color: "#f0ece3" }}
                />
              </div>

              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#8a8680" }}>Occasion</label>
                <select
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "#1a1a1c", border: "0.5px solid rgba(255,255,255,0.1)", color: "#f0ece3" }}
                >
                  {Object.entries(OCCASION_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{OCCASION_EMOJI[val]} {label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#8a8680" }}>Budget (₹)</label>
                  <input
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="5000"
                    required
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", color: "#f0ece3" }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#8a8680" }}>Headcount</label>
                  <input
                    type="number"
                    value={form.headcount}
                    onChange={(e) => setForm({ ...form, headcount: e.target.value })}
                    placeholder="12"
                    required
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", color: "#f0ece3" }}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm border transition-all hover:opacity-80"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8a8680" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                  style={{ background: "#f5a623", color: "#0c0c0d" }}
                >
                  Create & open
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}