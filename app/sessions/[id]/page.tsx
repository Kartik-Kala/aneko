"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  participant?: { name: string }
  createdAt: string
}

interface CartItem {
  name: string
  quantity: number
  estimatedPrice: number
  category: string
  notes?: string
}

interface Cart {
  items: CartItem[]
  totalEstimate: number
  budgetStatus: "under" | "over" | "within"
  suggestions: string[]
  summary: string
}

export default function SessionPage() {
  const { data: authSession } = useSession()
  const params = useParams()
  const sessionId = params.id as string

  const [sessionData, setSessionData] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [participants, setParticipants] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [cart, setCart] = useState<Cart | null>(null)
  const [aggregating, setAggregating] = useState(false)
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [sessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function fetchMessages() {
    const res = await fetch(`/api/chat?sessionId=${sessionId}`)
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages)
      setParticipants(data.participants)
      setSessionData(data.session)
      if (data.session.cartData) setCart(data.session.cartData as Cart)
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || sending) return

    setSending(true)
    const name = authSession?.user?.name || "Host"

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        participantName: name,
        message: input,
      }),
    })

    if (res.ok) {
      setInput("")
      await fetchMessages()
    }
    setSending(false)
  }

  async function buildCart() {
    setAggregating(true)
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        participantName: authSession?.user?.name || "Host",
        message: "Please build the final order cart based on everyone's preferences",
        action: "aggregate",
      }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.cart) setCart(data.cart)
      await fetchMessages()
    }
    setAggregating(false)
  }

  function copyShareLink() {
    const link = `${window.location.origin}/join/${sessionData?.shareToken || sessionId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const budgetColors = { under: "#22c55e", within: "#f5a623", over: "#ef4444" }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0c0c0d" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-3 flex items-center justify-between flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm transition-all hover:opacity-80" style={{ color: "#8a8680" }}>← Dashboard</Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
          <span className="text-sm font-medium" style={{ color: "#f0ece3" }}>{sessionData?.title || "Loading..."}</span>
        </div>
        <div className="flex items-center gap-3">
          {sessionData && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
              {participants.length} joined
            </span>
          )}
          <button
            onClick={copyShareLink}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
            style={{ borderColor: "rgba(245,166,35,0.3)", color: "#f5a623", background: "rgba(245,166,35,0.08)" }}
          >
            {copied ? "Copied!" : "Share link"}
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {/* Session info bar */}
          {sessionData && (
            <div className="px-6 py-3 border-b flex items-center gap-4 text-xs" style={{ borderColor: "rgba(255,255,255,0.06)", color: "#4a4844" }}>
              <span>Budget: <span style={{ color: "#f5a623" }}>₹{sessionData.budget?.toLocaleString()}</span></span>
              <span>·</span>
              <span>Headcount: <span style={{ color: "#f0ece3" }}>{sessionData.headcount} people</span></span>
              <span>·</span>
              <span>Occasion: <span style={{ color: "#f0ece3" }}>{sessionData.occasion}</span></span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-2xl mb-2">👋</p>
                <p className="text-sm" style={{ color: "#8a8680" }}>
                  Share the link with your team. Everyone can tell Aneko what they want.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%]`}>
                  {msg.role === "user" && (
                    <p className="text-xs mb-1 text-right" style={{ color: "#4a4844" }}>
                      {msg.participant?.name || authSession?.user?.name}
                    </p>
                  )}
                  {msg.role === "assistant" && (
                    <p className="text-xs mb-1" style={{ color: "#f5a623" }}>Aneko</p>
                  )}
                  <div
                    className="px-4 py-2.5 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: msg.role === "user" ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.04)",
                      border: `0.5px solid ${msg.role === "user" ? "rgba(245,166,35,0.25)" : "rgba(255,255,255,0.08)"}`,
                      color: "#f0ece3",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell Aneko what you want to order..."
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  color: "#f0ece3",
                }}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "#f5a623", color: "#0c0c0d" }}
              >
                {sending ? "..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        {/* Right panel - Cart */}
        <div className="w-80 border-l flex flex-col" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#141416" }}>
          <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-medium mb-3" style={{ color: "#8a8680", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Order summary
            </p>
            <button
              onClick={buildCart}
              disabled={aggregating || messages.length === 0}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: "#f5a623", color: "#0c0c0d" }}
            >
              {aggregating ? "Building cart..." : "Build cart from preferences"}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!cart ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">🛒</p>
                <p className="text-xs" style={{ color: "#4a4844" }}>
                  Once your team has shared their preferences, click "Build cart" to see the consolidated order.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs" style={{ color: "#8a8680" }}>{cart.summary}</p>

                {/* Items */}
                <div className="space-y-2">
                  {cart.items.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span style={{ color: "#f0ece3" }}>{item.name}</span>
                        <span style={{ color: "#8a8680" }}>×{item.quantity}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "#4a4844" }}>{item.notes}</span>
                        <span style={{ color: "#f5a623" }}>₹{item.estimatedPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#8a8680" }}>Estimated total</span>
                    <span className="font-medium" style={{ color: "#f0ece3" }}>₹{cart.totalEstimate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span style={{ color: "#4a4844" }}>Budget status</span>
                    <span style={{ color: budgetColors[cart.budgetStatus] }}>
                      {cart.budgetStatus === "under" ? "Under budget" : cart.budgetStatus === "over" ? "Over budget" : "Within budget"}
                    </span>
                  </div>
                </div>

                {/* Suggestions */}
                {cart.suggestions?.length > 0 && (
                  <div className="space-y-1.5">
                    {cart.suggestions.map((s, i) => (
                      <p key={i} className="text-xs px-2 py-1.5 rounded" style={{ background: "rgba(245,166,35,0.08)", color: "#f5a623" }}>
                        💡 {s}
                      </p>
                    ))}
                  </div>
                )}

                {/* Place order button */}
                <button
                  className="w-full py-3 rounded-lg text-sm font-medium transition-all hover:opacity-90 mt-2"
                  style={{ background: "#f5a623", color: "#0c0c0d" }}
                  onClick={() => alert("Swiggy MCP integration coming once API keys approved!")}
                >
                  Place on Swiggy →
                </button>
              </div>
            )}
          </div>

          {/* Participants */}
          {participants.length > 0 && (
            <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs mb-2" style={{ color: "#4a4844", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {participants.length} participants
              </p>
              <div className="flex flex-wrap gap-1.5">
                {participants.map((p) => (
                  <span key={p.id} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#8a8680" }}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}