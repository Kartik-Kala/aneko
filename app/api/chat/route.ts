import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { chatWithAneko, aggregatePreferences } from "@/lib/claude"

// POST /api/chat — send a message in a session
export async function POST(req: NextRequest) {
  const { sessionId, shareToken, participantName, message, action } = await req.json()

  // Resolve session
  const orderSession = await prisma.orderSession.findFirst({
    where: shareToken ? { shareToken } : { id: sessionId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  })

  if (!orderSession) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  if (orderSession.status !== "open") {
    return NextResponse.json({ error: "Session is no longer accepting orders" }, { status: 400 })
  }

  // Find or create participant
  let participant = await prisma.sessionParticipant.findFirst({
    where: { sessionId: orderSession.id, name: participantName },
  })

  if (!participant) {
    participant = await prisma.sessionParticipant.create({
      data: { sessionId: orderSession.id, name: participantName },
    })
  }

  // Save user message
  await prisma.message.create({
    data: {
      sessionId: orderSession.id,
      participantId: participant.id,
      role: "user",
      content: message,
    },
  })

  // Build conversation history for this participant
  const participantMessages = orderSession.messages
    .filter((m) => m.participantId === participant!.id || m.role === "assistant")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))

  participantMessages.push({ role: "user", content: message })

  // Get Claude response
  const aiResponse = await chatWithAneko(
    participantMessages,
    orderSession.budget,
    orderSession.headcount,
    orderSession.occasion,
    participantName
  )

  // Save assistant response
  await prisma.message.create({
    data: {
      sessionId: orderSession.id,
      role: "assistant",
      content: aiResponse,
    },
  })

  // If action is "aggregate" — build the final cart
  if (action === "aggregate") {
    const allMessages = await prisma.message.findMany({
      where: { sessionId: orderSession.id, role: "user" },
      include: { participant: true },
    })

    const formatted = allMessages.map((m) => ({
      role: m.role,
      content: m.content,
      participantName: m.participant?.name || "Guest",
    }))

    const cart = await aggregatePreferences(
      formatted,
      orderSession.budget,
      orderSession.headcount,
      orderSession.occasion
    )

    await prisma.orderSession.update({
      where: { id: orderSession.id },
      data: { cartData: cart, status: "aggregating" },
    })

    return NextResponse.json({ reply: aiResponse, cart })
  }

  return NextResponse.json({ reply: aiResponse })
}

// GET /api/chat?sessionId=xxx or ?shareToken=xxx — fetch messages
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("sessionId")
  const shareToken = searchParams.get("shareToken")

  const orderSession = await prisma.orderSession.findFirst({
    where: shareToken ? { shareToken } : { id: sessionId! },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        include: { participant: true },
      },
      participants: true,
    },
  })

  if (!orderSession) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  return NextResponse.json({
    messages: orderSession.messages,
    participants: orderSession.participants,
    session: {
      id: orderSession.id,
      title: orderSession.title,
      occasion: orderSession.occasion,
      budget: orderSession.budget,
      headcount: orderSession.headcount,
      status: orderSession.status,
      cartData: orderSession.cartData,
    },
  })
}