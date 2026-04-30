import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aneko Chamber — Group Order Intelligence',
  description:
    'One bot. Zero food drama. Aneko Chamber lives inside your Slack or WhatsApp group and handles group food orders end to end.',
  openGraph: {
    title: 'Aneko Chamber',
    description: 'Group order intelligence for teams.',
    siteName: 'Aneko Chamber',
  },
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}