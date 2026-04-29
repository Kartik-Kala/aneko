'use client'

import { useState } from 'react'
import styles from './WaitlistForm.module.css'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!email.includes('@')) return
    // TODO: wire up to your API / mailing list
    console.log('Waitlist signup:', email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        You&apos;re on the list. We&apos;ll reach out when we&apos;re ready. 🎉
      </div>
    )
  }

  return (
    <div className={styles.row}>
      <input
        type="email"
        className={styles.input}
        placeholder="your@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button className={styles.btn} onClick={handleSubmit}>
        Join Waitlist
      </button>
    </div>
  )
}
