import styles from './OrderDemo.module.css'

interface OrderItem {
  initials: string
  color: string
  name: string
  item: string
  price: string
  pending?: boolean
}

const ORDERS: OrderItem[] = [
  { initials: 'RS', color: '#3b5bfb', name: 'Rahul S', item: 'Paneer Butter Masala + Naan', price: '₹340' },
  { initials: 'DK', color: '#7c3aed', name: 'Deepa K', item: 'Dal Makhani + Rice ×2', price: '₹310' },
  { initials: 'AM', color: '#0891b2', name: 'Arjun M', item: 'Coke 750ml', price: '₹80' },
  { initials: '+2', color: '#555', name: 'Waiting...', item: 'Pending response', price: '—', pending: true },
]

export default function OrderDemo() {
  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <div className={styles.title}>Team Lunch — Thursday</div>
        <div className={styles.status}>COLLECTING ORDERS</div>
      </div>

      <div className={styles.items}>
        {ORDERS.map((order, i) => (
          <div
            key={i}
            className={`${styles.row} ${order.pending ? styles.pending : ''}`}
          >
            <div className={styles.person}>
              <div
                className={styles.dot}
                style={{ background: order.color }}
              >
                {order.initials}
              </div>
              <span>{order.name}</span>
            </div>
            <div className={`${styles.itemName} ${order.pending ? styles.mutedText : ''}`}>
              {order.item}
            </div>
            <div className={styles.price}>{order.price}</div>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <div className={styles.totalLabel}>Total so far</div>
        <div className={styles.totalAmount}>₹820</div>
      </div>

      <button className={styles.confirmBtn}>Confirm &amp; Place Order →</button>
    </div>
  )
}
