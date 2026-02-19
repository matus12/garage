# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Minimalistic React + TypeScript + Vite dashboard for monitoring a garage door status and temperature.

## Commands

### Development
```bash
npm run dev        # Start development server with HMR
npm run build      # Type-check with tsc and build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint on all files
```

## Architecture

### Data Source
- **API**: `http://84.47.36.56/` returns JSON `{ "temp": number, "proximity": number }`
- `proximity`: 1 = garage door closed, 0 = garage door open
- `temp`: temperature in °C
- Data is polled every 5 seconds

### Technology Stack
- **Build Tool**: Vite 7.x with @vitejs/plugin-react
- **Framework**: React 19 with TypeScript 5.9
- **Linting**: ESLint with TypeScript, React Hooks, and React Refresh plugins

## Key Files
- `src/App.tsx`: Main component — fetches garage data and renders status + temperature
- `src/App.css`: Component styles (status card, temperature card)
- `src/index.css`: Global styles (dark/light theme, typography)
- `src/main.tsx`: Application entry point
