import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, workspaceName } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await prisma.$transaction(
   async (tx: Prisma.TransactionClient) => {
        const user = await tx.user.create({
          data: { name, email, password: hashedPassword },
        })

        const slug = (workspaceName || `${name}'s Workspace`)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 50) + `-${Date.now()}`

        const workspace = await tx.workspace.create({
          data: {
            name: workspaceName || `${name}'s Workspace`,
            slug,
            members: {
              create: { userId: user.id, role: "admin" },
            },
          },
        })

        return { user, workspace }
      }
    )

    return NextResponse.json({
      message: "Account created",
      userId: result.user.id,
      workspaceId: result.workspace.id,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}