# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + TypeScript + Vite starter project with SignalR integration for real-time communication.

## Commands

### Development
```bash
npm run dev        # Start development server with HMR
npm run build      # Type-check with tsc and build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint on all files
```

## Architecture

### Entry Point & SignalR Setup
The application initializes a SignalR connection in `src/main.tsx` before rendering the React app:
- **SignalR Hub**: Connects to `https://temp-zlatkov.azurewebsites.net/signalr-hub`
- **Connection**: Built with automatic reconnect enabled
- **Event Handler**: Listens for "sendProximity" events from the server
- The connection is created but not started in the current implementation

### Technology Stack
- **Build Tool**: Vite 7.x with @vitejs/plugin-react (uses Babel for Fast Refresh)
- **Framework**: React 19.2 with TypeScript 5.9
- **Real-time**: SignalR (@microsoft/signalr) for server communication
- **Linting**: ESLint with TypeScript, React Hooks, and React Refresh plugins

### TypeScript Configuration
Uses project references architecture:
- `tsconfig.json`: Root config with references to app and node configs
- `tsconfig.app.json`: Application code configuration
- `tsconfig.node.json`: Vite configuration files

## Key Files
- `src/main.tsx`: Application entry point, SignalR connection setup
- `src/App.tsx`: Main application component
- `vite.config.ts`: Vite build configuration
- `eslint.config.js`: ESLint flat config with React and TypeScript rules