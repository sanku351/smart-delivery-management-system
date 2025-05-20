import type { DeliveryPartner, Order, Assignment, AssignmentMetrics } from "@/lib/types"

// Mock data for partners
export const partners: DeliveryPartner[] = [
  {
    _id: "p1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    status: "active",
    currentLoad: 2,
    areas: ["Downtown", "Midtown"],
    shift: {
      start: "09:00",
      end: "17:00",
    },
    metrics: {
      rating: 4.8,
      completedOrders: 156,
      cancelledOrders: 3,
    },
  },
  {
    _id: "p2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    status: "active",
    currentLoad: 1,
    areas: ["Uptown", "Westside"],
    shift: {
      start: "10:00",
      end: "18:00",
    },
    metrics: {
      rating: 4.9,
      completedOrders: 203,
      cancelledOrders: 1,
    },
  },
  {
    _id: "p3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1122334455",
    status: "inactive",
    currentLoad: 0,
    areas: ["Eastside", "Southside"],
    shift: {
      start: "08:00",
      end: "16:00",
    },
    metrics: {
      rating: 4.5,
      completedOrders: 98,
      cancelledOrders: 5,
    },
  },
  {
    _id: "p4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1567890123",
    status: "active",
    currentLoad: 3,
    areas: ["Downtown", "Eastside"],
    shift: {
      start: "12:00",
      end: "20:00",
    },
    metrics: {
      rating: 4.7,
      completedOrders: 132,
      cancelledOrders: 2,
    },
  },
  {
    _id: "p5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1654321987",
    status: "active",
    currentLoad: 0,
    areas: ["Midtown", "Uptown"],
    shift: {
      start: "09:00",
      end: "17:00",
    },
    metrics: {
      rating: 4.6,
      completedOrders: 87,
      cancelledOrders: 4,
    },
  },
]

// Mock data for orders
export const orders: Order[] = [
  {
    _id: "o1",
    orderNumber: "ORD-001",
    customer: {
      name: "Alice Cooper",
      phone: "+1111222333",
      address: "123 Main St, Downtown",
    },
    area: "Downtown",
    items: [
      {
        name: "Burger",
        quantity: 2,
        price: 12.99,
      },
      {
        name: "Fries",
        quantity: 1,
        price: 4.99,
      },
    ],
    status: "pending",
    scheduledFor: "12:30",
    totalAmount: 30.97,
    createdAt: new Date("2023-05-19T10:30:00"),
    updatedAt: new Date("2023-05-19T10:30:00"),
  },
  {
    _id: "o2",
    orderNumber: "ORD-002",
    customer: {
      name: "Bob Marley",
      phone: "+1444555666",
      address: "456 Oak St, Midtown",
    },
    area: "Midtown",
    items: [
      {
        name: "Pizza",
        quantity: 1,
        price: 18.99,
      },
      {
        name: "Soda",
        quantity: 2,
        price: 2.49,
      },
    ],
    status: "assigned",
    assignedTo: "p1",
    scheduledFor: "13:00",
    totalAmount: 23.97,
    createdAt: new Date("2023-05-19T11:15:00"),
    updatedAt: new Date("2023-05-19T11:30:00"),
  },
  {
    _id: "o3",
    orderNumber: "ORD-003",
    customer: {
      name: "Charlie Day",
      phone: "+1777888999",
      address: "789 Pine St, Uptown",
    },
    area: "Uptown",
    items: [
      {
        name: "Salad",
        quantity: 1,
        price: 9.99,
      },
      {
        name: "Sandwich",
        quantity: 1,
        price: 11.49,
      },
    ],
    status: "picked",
    assignedTo: "p2",
    scheduledFor: "12:45",
    totalAmount: 21.48,
    createdAt: new Date("2023-05-19T11:00:00"),
    updatedAt: new Date("2023-05-19T12:15:00"),
  },
  {
    _id: "o4",
    orderNumber: "ORD-004",
    customer: {
      name: "Diana Ross",
      phone: "+1222333444",
      address: "101 Elm St, Westside",
    },
    area: "Westside",
    items: [
      {
        name: "Pasta",
        quantity: 2,
        price: 14.99,
      },
      {
        name: "Garlic Bread",
        quantity: 1,
        price: 5.99,
      },
    ],
    status: "delivered",
    assignedTo: "p2",
    scheduledFor: "11:30",
    totalAmount: 35.97,
    createdAt: new Date("2023-05-19T09:45:00"),
    updatedAt: new Date("2023-05-19T11:50:00"),
  },
  {
    _id: "o5",
    orderNumber: "ORD-005",
    customer: {
      name: "Edward Norton",
      phone: "+1555666777",
      address: "202 Maple St, Eastside",
    },
    area: "Eastside",
    items: [
      {
        name: "Sushi",
        quantity: 3,
        price: 16.99,
      },
      {
        name: "Miso Soup",
        quantity: 2,
        price: 3.99,
      },
    ],
    status: "pending",
    scheduledFor: "14:15",
    totalAmount: 58.95,
    createdAt: new Date("2023-05-19T12:30:00"),
    updatedAt: new Date("2023-05-19T12:30:00"),
  },
  {
    _id: "o6",
    orderNumber: "ORD-006",
    customer: {
      name: "Frank Sinatra",
      phone: "+1888999000",
      address: "303 Cedar St, Southside",
    },
    area: "Southside",
    items: [
      {
        name: "Tacos",
        quantity: 4,
        price: 3.99,
      },
      {
        name: "Nachos",
        quantity: 1,
        price: 8.99,
      },
    ],
    status: "pending",
    scheduledFor: "13:45",
    totalAmount: 24.95,
    createdAt: new Date("2023-05-19T12:00:00"),
    updatedAt: new Date("2023-05-19T12:00:00"),
  },
]

// Mock data for assignments
export const assignments: Assignment[] = [
  {
    orderId: "o2",
    partnerId: "p1",
    timestamp: new Date("2023-05-19T11:30:00"),
    status: "success",
  },
  {
    orderId: "o3",
    partnerId: "p2",
    timestamp: new Date("2023-05-19T12:15:00"),
    status: "success",
  },
  {
    orderId: "o4",
    partnerId: "p2",
    timestamp: new Date("2023-05-19T10:30:00"),
    status: "success",
  },
  {
    orderId: "o5",
    partnerId: "p3",
    timestamp: new Date("2023-05-19T12:35:00"),
    status: "failed",
    reason: "Partner unavailable",
  },
  {
    orderId: "o6",
    partnerId: "p4",
    timestamp: new Date("2023-05-19T12:05:00"),
    status: "failed",
    reason: "Area not covered",
  },
]

// Mock data for assignment metrics
export const assignmentMetrics: AssignmentMetrics = {
  totalAssigned: 5,
  successRate: 60,
  averageTime: 12, // minutes
  failureReasons: [
    {
      reason: "Partner unavailable",
      count: 1,
    },
    {
      reason: "Area not covered",
      count: 1,
    },
  ],
}

// Helper functions to get data
export function getPartnerMetrics() {
  const activePartners = partners.filter((p) => p.status === "active")

  return {
    totalActive: activePartners.length,
    avgRating: Number.parseFloat(
      (activePartners.reduce((sum, p) => sum + p.metrics.rating, 0) / activePartners.length).toFixed(1),
    ),
    topAreas: ["Downtown", "Midtown", "Uptown"], // Simplified for mock data
  }
}

export function getPartnerAvailability() {
  return {
    available: partners.filter((p) => p.status === "active" && p.currentLoad < 3).length,
    busy: partners.filter((p) => p.status === "active" && p.currentLoad === 3).length,
    offline: partners.filter((p) => p.status === "inactive").length,
  }
}

export function getOrdersByStatus() {
  return {
    pending: orders.filter((o) => o.status === "pending").length,
    assigned: orders.filter((o) => o.status === "assigned").length,
    picked: orders.filter((o) => o.status === "picked").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  }
}

export function getRecentAssignments() {
  return assignments.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5)
}

export function getActiveAssignments() {
  return assignments.filter(
    (a) => a.status === "success" && orders.find((o) => o._id === a.orderId)?.status !== "delivered",
  )
}

export function getOrderFilters() {
  return {
    status: ["pending", "assigned", "picked", "delivered"],
    areas: [...new Set(orders.map((o) => o.area))],
    date: new Date().toISOString().split("T")[0],
  }
}
