# Flow Timer

A clean, minimal Pomodoro Timer built with React, Vite, and Tailwind CSS.
Built as the first portfolio project for the Flow Timer brand.

## Features (v1 / MVP)

- 25-minute focus session, 5-minute short break
- Start / Pause / Reset controls
- Session counter — tracks completed focus sessions for the visit
- Two modes: Focus and Short Break
- Audio alert when a session ends

## Tech Stack

- React
- Vite
- Tailwind CSS

## Project Structure

```
src/
  components/    UI pieces (TimerDisplay, Controls, ModeSelector, SessionCounter)
  hooks/         usePomodoro.js — all timer state and logic
  utils/         formatTime.js — seconds -> "MM:SS"
  App.jsx        wires hook state to components
  main.jsx       React entry point
```

## Running Locally

```bash
npm install
npm run dev
```

## Roadmap

- **v2:** dark mode, long break, custom durations, desktop notifications, daily stats, local storage, settings panel
- **v3:** to-do list, background music, animated progress ring, themes, weekly stats, accounts, cloud sync