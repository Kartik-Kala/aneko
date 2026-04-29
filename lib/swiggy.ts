// Swiggy MCP wrapper
// Currently mocked — swap in real MCP calls once Builders Club approves you
// Real endpoints: mcp.swiggy.com/food | mcp.swiggy.com/im | mcp.swiggy.com/dineout

export interface SwiggyRestaurant {
  id: string
  name: string
  cuisine: string[]
  rating: number
  deliveryTime: string
  distance: string
}

export interface SwiggyCartItem {
  itemId: string
  name: string
  quantity: number
  price: number
}

export interface SwiggyCart {
  restaurantId: string
  restaurantName: string
  items: SwiggyCartItem[]
  subtotal: number
  deliveryFee: number
  total: number
}

// ─── MOCK IMPLEMENTATIONS ────────────────────────────────────────────────────
// Replace each function body with real MCP callTool() once you have credentials

export async function searchRestaurants(
  query: string,
  addressId: string
): Promise<SwiggyRestaurant[]> {
  // Real: client.callTool({ name: "search_restaurants", arguments: { query, addressId } })
  return [
    {
      id: "rest_001",
      name: "Biryani Blues",
      cuisine: ["Biryani", "Mughlai"],
      rating: 4.5,
      deliveryTime: "35-40 min",
      distance: "2.1 km",
    },
    {
      id: "rest_002",
      name: "Punjab Grill",
      cuisine: ["North Indian", "Punjabi"],
      rating: 4.3,
      deliveryTime: "40-50 min",
      distance: "3.4 km",
    },
    {
      id: "rest_003",
      name: "Social",
      cuisine: ["Continental", "American"],
      rating: 4.4,
      deliveryTime: "30-35 min",
      distance: "1.8 km",
    },
  ]
}

export async function buildCart(
  restaurantId: string,
  items: { name: string; quantity: number; estimatedPrice: number }[]
): Promise<SwiggyCart> {
  // Real: client.callTool({ name: "update_food_cart", arguments: { restaurantId, items } })
  const cartItems: SwiggyCartItem[] = items.map((item, i) => ({
    itemId: `item_${i}`,
    name: item.name,
    quantity: item.quantity,
    price: item.estimatedPrice,
  }))

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryFee = subtotal > 500 ? 0 : 49

  return {
    restaurantId,
    restaurantName: "Biryani Blues",
    items: cartItems,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  }
}

export async function placeOrder(
  cart: SwiggyCart,
  addressId: string
): Promise<{ orderId: string; status: string; estimatedDelivery: string }> {
  // Real: 
  // 1. get_food_cart to verify state
  // 2. place_food_order({ paymentMethod: "COD" })
  // 3. track_food_order({ orderId })
  // IMPORTANT: place_food_order is NOT idempotent — check get_food_orders before retrying
  
  return {
    orderId: `swiggy_${Date.now()}`,
    status: "confirmed",
    estimatedDelivery: "35-40 minutes",
  }
}

export async function getAddresses(token: string): Promise<{ id: string; label: string; address: string }[]> {
  // Real: client.callTool({ name: "get_addresses" })
  return [
    { id: "addr_001", label: "Office", address: "12th Floor, Tower B, Cyber City, Gurugram" },
    { id: "addr_002", label: "Home", address: "Sector 15, Noida" },
  ]
}

// ─── REAL MCP CLIENT SETUP (uncomment when you have credentials) ──────────────
/*
import { MCPClient } from "@modelcontextprotocol/sdk/client"

let mcpClient: MCPClient | null = null

async function getMCPClient(token: string) {
  if (mcpClient) return mcpClient
  
  mcpClient = new MCPClient({
    url: "https://mcp.swiggy.com/food",
    headers: { Authorization: `Bearer ${token}` },
  })
  
  await mcpClient.connect()
  return mcpClient
}
*/