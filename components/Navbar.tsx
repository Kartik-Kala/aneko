'use client'

import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoDot} />
          Aneko Chamber
        </Link>

        <ul className={styles.navLinks}>
          <li><Link href="#how">How it works</Link></li>
          <li><Link href="#features">Features</Link></li>
          <li><Link href="#integrations">Integrations</Link></li>
          <li><Link href="#docs">Docs</Link></li>
        </ul>

        <Link href="#waitlist" className={styles.navCta}>
          Request Access
        </Link>
      </div>
    </nav>
  )
}
