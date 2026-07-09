# GLOBAL EXCLUSIVE MONITOR

**Live Tracker for All JKT48 Exclusive Events**

Developed by [@estrellawin19](https://x.com/estrellawin19)  
[Support via Tako](https://tako.id/Sportagame19Win)  
**LIVE MONITORING**

GLOBAL EXCLUSIVE MONITOR is a full-stack web application for monitoring JKT48 exclusive event availability in near real time. The project combines a responsive Next.js frontend with a lightweight Cloudflare Worker proxy that normalizes upstream API access and handles common failure cases such as waiting-room responses and invalid payloads.

## Why This Project

Official event pages can change quickly during high-traffic sales windows. This project was built to make those updates easier to track through a focused interface that highlights event sessions, member availability, and ticket movement without forcing users to manually inspect raw upstream data.

## Highlights

- Near real-time event monitoring with client-side polling.
- Focused member cards that surface sold count, availability state, and purchase links.
- Lightweight proxy API on Cloudflare Workers for safer frontend consumption.
- Graceful handling for upstream waiting room pages, invalid JSON, and transient fetch failures.
- Responsive UI optimized for quick scanning on desktop and mobile.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, SWR
- Backend: Cloudflare Workers, TypeScript, Wrangler
- Data source: JKT48 public upstream API via Worker proxy

## Architecture

The project is split into two small parts:

- `frontend/` renders the monitoring dashboard, fetches event data, and updates the UI on a polling interval.
- `backend/` exposes a minimal proxy layer for selected upstream routes such as member data, event lists, and event details.

This keeps the browser app simple while centralizing upstream error handling in one place.

## Core Features

- Event list and detail monitoring for JKT48 exclusive events
- Session-based availability tracking
- Member-centric cards with status indicators
- Theme-aware UI
- Fallback handling when the upstream service returns waiting room HTML instead of JSON

## Project Structure

```text
.
|-- backend/    # Cloudflare Worker proxy
|-- frontend/   # Next.js application
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Cloudflare account and Wrangler CLI access for backend deployment

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs locally at `http://localhost:3000`.

### Backend

```bash
cd backend
npm install
npm run dev
```

The Worker can then be deployed with:

```bash
npm run deploy
```

## What This Project Demonstrates

- Building a small full-stack product with a clear separation between UI and API concerns
- Handling unstable third-party responses defensively
- Designing a dense but readable monitoring interface
- Shipping a practical tool around a specific real-world use case

## Potential Improvements

- Add automated tests for the Worker error-handling paths
- Introduce environment-based frontend API configuration
- Add deployment notes and screenshots for easier onboarding

## License

No license has been added yet. If this repository is intended for public reuse, add a license file.
