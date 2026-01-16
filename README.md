# Guestara Backend

## Overview
Guestara is a menu & services management backend built using Node.js and Express.  
It supports categories, items, dynamic pricing, tax inheritance, booking, and add-ons.

## Architecture
- Controllers handle HTTP requests
- Services contain business logic
- Models define data schema
- Utils handle reusable helpers

## Database Choice
MongoDB was chosen for flexible schemas and faster iteration during development.

## Tax Inheritance
Tax is not stored redundantly on items.  
Tax is resolved dynamically:
Item → Subcategory → Category  
This ensures category tax updates reflect instantly.

## Pricing Engine
Supports:
- Static pricing
- Tiered pricing
- Complimentary
- Discounted
- Dynamic time-based pricing

Pricing is calculated at runtime using a service layer.

## Booking System
- Availability defined on items
- Bookings stored separately
- Time overlap logic prevents double booking

## Add-ons
- Add-ons belong to items
- Affect final price
- Optional & mandatory supported

## Tradeoffs
- Authentication not implemented
- No frontend
- Focused on backend logic and clarity

## How to Run
```bash
npm install
npm start
