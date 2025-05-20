# Smart Delivery Management System

A modern delivery management dashboard focusing on partner management and smart order assignments.

## Overview

This application provides a comprehensive solution for managing delivery operations, including:

- Partner management (registration, profiles, area coverage, shift scheduling)
- Order processing and tracking
- Smart assignment system for matching orders with delivery partners
- Performance metrics and analytics

## Features

### Partner Management
- Partner registration and profile management
- Service area configuration
- Shift scheduling
- Performance metrics tracking

### Order Processing
- Order dashboard with filtering capabilities
- Status tracking (pending, assigned, picked, delivered)
- Assignment history
- Order details view

### Assignment System
- Smart algorithm for matching orders with partners
- Assignment metrics and analytics
- Manual and automatic assignment options

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Charts**: Recharts

## Project Structure

```
/app                    # Next.js App Router
  /api                  # API routes
    /partners           # Partner management endpoints
    /orders             # Order management endpoints
    /assignments        # Assignment system endpoints
  /partners             # Partners page
  /orders               # Orders page
  /assignments          # Assignments page
/components             # React components
  /ui                   # UI components (shadcn/ui)
/lib                    # Utility functions and types
  types.ts              # TypeScript type definitions
  data.ts               # Mock data (replace with actual data source)
  utils.ts              # Utility functions
```

## API Routes

### Partner Routes
- `GET /api/partners` - Get all partners
- `POST /api/partners` - Create a new partner
- `PUT /api/partners/[id]` - Update a partner
- `DELETE /api/partners/[id]` - Delete a partner

### Order Routes
- `GET /api/orders` - Get all orders
- `POST /api/orders/assign` - Assign an order to a partner
- `PUT /api/orders/[id]/status` - Update order status

### Assignment Routes
- `GET /api/assignments/metrics` - Get assignment metrics
- `POST /api/assignments/run` - Run the smart assignment algorithm

## Getting Started

1. Clone the repository:
```
git clone https://github.com/sanku351/smart-delivery-management-system.git
```
2. Install dependencies:
```
npm install
```
3. Run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
