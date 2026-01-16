# Guestara – Menu & Services Management Backend

## Overview
Guestara is a backend application built using **Node.js, Express, and MongoDB** that simulates how real-world restaurants, cafés, and service-based platforms manage their menus and services.

The system supports **categories, items, pricing logic, tax calculation, bookings, and add-ons**.  
Instead of focusing only on CRUD APIs, this project emphasizes **business logic, clean architecture, and maintainability**, as required by the assignment.


## Architecture & Project Structure

The project follows a **layered architecture**, where each layer has a clear responsibility.  
This makes the code easier to understand, debug, extend, and explain.

src/
├── models/ # Database schemas (Category, Item, Booking, AddOn)
├── controllers/ # Handles incoming HTTP requests and responses
├── services/ # Core business logic (pricing, tax, booking)
├── routes/ # API route definitions
├── utils/ # Reusable helper functions (time, pagination)
├── validations/ # Joi validation schemas
├── middlewares/ # Request validation middleware
├── config/ # Database connection setup
└── app.js # Express app configuration

server.js # Application entry point


### Why this structure?
- Controllers remain **thin and readable**
- Business logic is isolated inside **services**
- Models focus only on **data representation**
- The project is easier to maintain and scale


## Data Modeling Decisions

### Category
- Stores tax configuration (`taxApplicable`, `taxPercentage`)
- Uses `isActive` for soft delete behavior
- Acts as the primary tax source for items

### Subcategory
- Belongs to a category
- Can optionally override tax settings
- Inherits tax from its category if not defined

### Item
- Belongs to **either a category or a subcategory** (not both)
- Supports:
  - Pricing configuration
  - Optional booking availability
  - Optional add-ons
- Uses `isActive` instead of hard deletes

### Booking
- Stored in a separate collection
- Prevents double booking using time-overlap logic
- Scales better than embedding bookings inside items

### Add-On
- Stored in a separate collection
- Linked to items using `itemId`
- Keeps item documents clean and flexible



## Tax Inheritance (Critical Requirement)

Tax is **not stored redundantly** on items.

### Tax resolution order:
1. Item-level tax (if defined)
2. Subcategory-level tax (if defined)
3. Category-level tax (fallback)

Tax is calculated **dynamically at runtime** using a dedicated service.

### Why this approach?
- Prevents data duplication
- Category tax changes automatically affect dependent items
- Reflects real-world backend design patterns



## Pricing Engine

Each item supports **exactly one pricing type**, resolved dynamically at request time.

### Supported pricing types:
- **Static Pricing** – Fixed price
- **Tiered Pricing** – Price depends on usage tiers
- **Complimentary** – Always free
- **Discounted Pricing** – Flat or percentage discount
- **Dynamic Pricing** – Time-based pricing windows

All pricing logic is handled in a **service layer**, not stored as static database fields.


## Required Pricing Endpoint

### `GET /items/:id/price`

This endpoint calculates and returns the final payable price dynamically, including:
- Pricing type applied
- Base price
- Add-on price (if any)
- Tax percentage and tax amount
- Final payable amount

This ensures pricing behavior reflects **business rules**, not hardcoded values.



## Availability & Booking System

Items can optionally be marked as bookable.

### Features:
- Define available days and time slots
- Fetch available slots for a given date
- Book a time slot
- Prevent double booking
- Handle overlapping time conflicts

Booking logic is implemented in the service layer using time comparison utilities.


## Add-Ons System

- Add-ons belong to items
- Add-ons affect the final price dynamically
- Multiple add-ons can be selected per request
- Add-on prices are calculated before tax is applied

Add-ons are passed as query parameters and resolved at runtime.


## Search, Pagination & Filtering

- Partial text search on items
- Pagination using `page` and `limit`
- Basic sorting and filtering support

Advanced filters were partially implemented to keep the project focused and readable.



## Validation & Error Handling

- **Joi** is used for validating request payloads (e.g., booking APIs)
- Validation is handled using reusable middleware
- Clear error messages are returned for invalid input or business rule violations


## Soft Deletes

- No hard deletes are used
- `isActive` flag controls record visibility
- Inactive categories and items are excluded from responses


## Tech Stack

- **Node.js**
- **Express**
- **MongoDB & Mongoose**
- **Joi** for validation
- **Postman** for API testing


## How to Run the Project Locally

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd guestara-backend


cd guestara-backend
