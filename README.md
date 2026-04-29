# Aneko

Anekochamber is an AI copilot for workplace group food ordering built on Swiggy Food MCP.

## What it does

Anekochamber helps office teams:

* Coordinate group food orders
* Collect team preferences
* Build shared carts
* Manage budget controls and approvals
* Place orders through Swiggy infrastructure

## Core Use Case

A user can request:

“Order lunch for 10 people under ₹250 each”

Aneko:

1. Finds restaurants via Swiggy Food MCP
2. Suggests options
3. Coordinates preferences
4. Builds a shared cart
5. Supports approvals
6. Places the order

## Tech Stack

* Next.js
* TypeScript
* Prisma
* Supabase Postgres
* NextAuth
* Anthropic Claude API

## Architecture

Anekochamber uses:

* Conversational copilot interface
* Backend orchestration layer
* Swiggy Food MCP for commerce primitives
* AI coordination for group ordering decisions

## Status

Prototype in active development.
Seeking Swiggy Food MCP access for integration and sandbox testing.
