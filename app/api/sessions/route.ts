import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET /api/sessions — list sessions for the user's workspace
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: { workspace: true },
  })

  if (!membership) {
    return NextResponse.json({ error: "No workspace found" }, { status: 404 })
  }

  const sessions = await prisma.orderSession.findMany({
    where: { workspaceId: membership.workspaceId },
    include: {
      host: { select: { name: true, email: true, image: true } },
      _count: { select: { messages: true, participants: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ sessions, workspace: membership.workspace })
}

// POST /api/sessions — create a new order session
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, occasion, budget, headcount } = await req.json()

  if (!title || !occasion || !budget || !headcount) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
  })

  if (!membership) {
    return NextResponse.json({ error: "No workspace found" }, { status: 404 })
  }

  const orderSession = await prisma.orderSession.create({
    data: {
      title,
      occasion,
      budget: parseInt(budget),
      headcount: parseInt(headcount),
      workspaceId: membership.workspaceId,
      hostId: session.user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    },
  })

  return NextResponse.json({ session: orderSession })
}