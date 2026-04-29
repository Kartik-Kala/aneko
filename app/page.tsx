import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ChatMockup from '@/components/ChatMockup'
import OrderDemo from '@/components/OrderDemo'
import WaitlistForm from '@/components/WaitlistForm'
import styles from './page.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Trigger the run',
    desc: 'Anyone pings @aneko in the group. The bot takes it from there.',
  },
  {
    num: '02',
    title: 'Aneko asks around',
    desc: 'The bot DMs everyone or asks in-thread. Collects preferences, dietary notes, budgets.',
  },
  {
    num: '03',
    title: 'Order assembled',
    desc: 'Aneko tallies everything into a single consolidated cart with a full breakdown.',
  },
  {
    num: '04',
    title: 'One click confirm',
    desc: 'The organiser reviews and places the order. Done.',
  },
]

const FEATURES = [
  {
    icon: '💬',
    title: 'Conversational collection',
    desc: 'People just reply naturally. "Dal, no onion, extra raita" — Aneko parses it all.',
  },
  {
    icon: '⏱',
    title: 'Smart reminders',
    desc: "Aneko nudges people who haven't responded yet so the organiser doesn't have to.",
  },
  {
    icon: '💸',
    title: 'Budget guardrails',
    desc: "Set a per-person limit. Aneko flags anyone going over before the order is placed.",
  },
  {
    icon: '🥗',
    title: 'Dietary memory',
    desc: "Remembers that Priya's vegan and Arjun's gluten-free. Never asks twice.",
  },
  {
    icon: '📋',
    title: 'Clean order exports',
    desc: 'One-tap export to share the full breakdown with whoever is placing the order.',
  },
  {
    icon: '🔗',
    title: 'Any platform',
    desc: 'Slack, WhatsApp, Teams, Telegram. Wherever your team lives, Aneko is there.',
  },
]

const TICKER_ITEMS = [
  'Group Ordering',
  'Preference Collection',
  'Budget Tracking',
  'Slack Native',
  'WhatsApp Ready',
  'Zero Friction',
  'Instant Tally',
  'Smart Reminders',
]

const PLATFORMS = ['Slack', 'WhatsApp', 'Teams', 'Telegram']

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroTag}>
                <div className={styles.heroTagDot} />
                Group Order Intelligence
              </div>

              <h1 className={styles.heroTitle}>
                One bot.<br />
                Zero food
                <span className={styles.heroTitleOutline}>drama.</span>
              </h1>

              <p className={styles.heroSub}>
                Aneko Chamber lives inside your Slack or WhatsApp group. Before
                a food run, it asks everyone what they want, tallies the order,
                and handles the rest.
              </p>

              <div className={styles.heroActions}>
                <Link href="#" className={styles.btnPrimary}>
                  Add to Slack
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="#" className={styles.btnGhost}>
                  See it in action →
                </Link>
              </div>

              <div className={styles.platforms}>
                <span className={styles.platformsLabel}>Works on</span>
                <div className={styles.platformBadges}>
                  {PLATFORMS.map((p) => (
                    <div key={p} className={styles.platformBadge}>{p}</div>
                  ))}
                </div>
              </div>
            </div>

            <ChatMockup />
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.section} id="how">
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>How it works</div>
          <h2 className={styles.sectionTitle}>
            Dead simple.<br />Stupid fast.
          </h2>
          <p className={styles.sectionSub}>
            Four steps from &quot;someone&apos;s ordering&quot; to &quot;food&apos;s
            here&quot; — without a single chaotic group message thread.
          </p>

          <div className={styles.steps}>
            {STEPS.map((step) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDesc}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER DEMO ── */}
      <section className={`${styles.section} ${styles.sectionNoTop}`}>
        <div className={styles.wrap}>
          <div className={styles.split}>
            <div>
              <div className={styles.sectionLabel}>The tally</div>
              <h2 className={styles.sectionTitle}>
                Every order.<br />One screen.
              </h2>
              <p className={styles.sectionSub}>
                Aneko collects responses from the whole group and builds a clean
                order summary — who ordered what, at what price, with zero
                manual work.
              </p>
              <br />
              <Link href="#" className={styles.btnPrimary} style={{ display: 'inline-flex' }}>
                See live demo →
              </Link>
            </div>
            <OrderDemo />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.section} id="features">
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Features</div>
          <h2 className={styles.sectionTitle}>Built for real teams.</h2>

          <div className={styles.featuresGrid}>
            {FEATURES.map((feat) => (
              <div key={feat.title} className={styles.feat}>
                <div className={styles.featIcon}>{feat.icon}</div>
                <div className={styles.featTitle}>{feat.title}</div>
                <div className={styles.featDesc}>{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / WAITLIST ── */}
      <section className={styles.ctaSection} id="waitlist">
        <div className={styles.wrap}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>
              Stop the lunch<br />thread chaos.
            </h2>
            <p className={styles.ctaSub}>
              Join the waitlist. First 100 teams get free early access.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/" className={styles.footerLogo}>
            <div className={styles.logoDot} />
            Aneko Chamber
          </Link>
          <div className={styles.footerLinks}>
            <Link href="#">GitHub</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Docs</Link>
            <Link href="mailto:hello@anekochamber.com">hello@anekochamber.com</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
