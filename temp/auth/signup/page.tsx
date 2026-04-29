"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "", workspaceName: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Something went wrong")
      setLoading(false)
      return
    }

    // Auto sign in after signup
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0c0c0d" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light" style={{ fontFamily: "Georgia, serif", color: "#f0ece3" }}>
            Aneko<span style={{ color: "#f5a623" }}>.</span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#8a8680" }}>Create your company workspace</p>
        </div>

        <div className="rounded-xl p-8 border" style={{ background: "#141416", borderColor: "rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border text-sm font-medium mb-6 transition-all hover:opacity-80"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "#f0ece3", background: "rgba(255,255,255,0.04)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs" style={{ color: "#4a4844" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name", label: "Your name", placeholder: "Rahul Kumar", type: "text" },
              { key: "workspaceName", label: "Company / Team name", placeholder: "Acme Corp", type: "text" },
              { key: "email", label: "Work email", placeholder: "rahul@acme.com", type: "email" },
              { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="block text-xs mb-1.5" style={{ color: "#8a8680" }}>{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  required
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    color: "#f0ece3",
                  }}
                />
              </div>
            ))}

            {error && (
              <p className="text-xs py-2 px-3 rounded-lg" style={{ background: "rgba(220,60,60,0.1)", color: "#f87171" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "#f5a623", color: "#0c0c0d" }}
            >
              {loading ? "Creating workspace..." : "Create workspace"}
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-sm" style={{ color: "#8a8680" }}>
          Already have an account?{" "}
          <Link href="/login" className="hover:underline" style={{ color: "#f5a623" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}