import styles from './ChatMockup.module.css'

interface Message {
  type: 'bot' | 'user'
  avatar: string
  avatarClass: string
  name: string
  text: string
  chips?: string[]
  isConfirm?: boolean
}

const MESSAGES: Message[] = [
  {
    type: 'bot',
    avatar: 'AK',
    avatarClass: 'bot',
    name: 'Aneko',
    text: "Hey team 👋 Priya's doing a Swiggy run in 20 mins. What do you want?",
    chips: ["I'm in", 'Skip me', "What's available?"],
  },
  {
    type: 'user',
    avatar: 'RS',
    avatarClass: 'u1',
    name: 'Rahul S',
    text: 'Paneer butter masala + 1 garlic naan pls',
  },
  {
    type: 'user',
    avatar: 'DK',
    avatarClass: 'u2',
    name: 'Deepa K',
    text: 'Dal makhani, no butter, 2x rice',
  },
  {
    type: 'user',
    avatar: 'AM',
    avatarClass: 'u3',
    name: 'Arjun M',
    text: 'Just a coke, vegetarian today',
  },
  {
    type: 'bot',
    avatar: 'AK',
    avatarClass: 'bot',
    name: 'Aneko',
    text: 'Got it. 3 orders assembled. Total: ₹820. Priya, ready to confirm?',
    isConfirm: true,
  },
]

function SlackIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 54 54"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7 0a6.6 6.6 0 0 0 0 13.2h6.6V6.6A6.6 6.6 0 0 0 19.7 0zm0 17.6H3.3a6.6 6.6 0 0 0 0 13.2h16.4a6.6 6.6 0 0 0 0-13.2z"
        opacity=".8"
      />
      <path
        d="M54 20.9a6.6 6.6 0 0 0-13.2 0v6.6h6.6A6.6 6.6 0 0 0 54 20.9zm-17.6 0V4.5a6.6 6.6 0 0 0-13.2 0V20.9a6.6 6.6 0 0 0 13.2 0z"
        opacity=".8"
      />
      <path
        d="M34.3 54a6.6 6.6 0 0 0 0-13.2h-6.6v6.6A6.6 6.6 0 0 0 34.3 54zm0-17.6h16.4a6.6 6.6 0 0 0 0-13.2H34.3a6.6 6.6 0 0 0 0 13.2z"
        opacity=".8"
      />
      <path
        d="M0 33.1a6.6 6.6 0 0 0 13.2 0v-6.6H6.6A6.6 6.6 0 0 0 0 33.1zm17.6 0v16.4a6.6 6.6 0 0 0 13.2 0V33.1a6.6 6.6 0 0 0-13.2 0z"
        opacity=".8"
      />
    </svg>
  )
}

export default function ChatMockup() {
  return (
    <div className={styles.mockup}>
      <div className={styles.header}>
        <div className={styles.platform}>
          <SlackIcon />
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.headerName}>#team-lunch</div>
          <div className={styles.headerStatus}>Aneko active</div>
        </div>
      </div>

      <div className={styles.body}>
        {MESSAGES.map((msg, i) => (
          <div key={i} className={styles.msg} style={{ animationDelay: `${i * 0.2 + 0.1}s` }}>
            <div className={`${styles.avatar} ${styles[msg.avatarClass]}`}>
              {msg.avatar}
            </div>
            <div className={styles.msgInner}>
              <div className={styles.msgName}>{msg.name}</div>
              <div
                className={`${styles.bubble} ${
                  msg.type === 'bot' ? styles.botBubble : ''
                } ${msg.isConfirm ? styles.confirm : ''}`}
              >
                {msg.text}
              </div>
              {msg.chips && (
                <div className={styles.chipRow}>
                  {msg.chips.map((chip) => (
                    <button key={chip} className={styles.chip}>
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
