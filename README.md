# Flow Timer

A clean, minimal Pomodoro Timer built with React, Vite, and Tailwind CSS.
Built as the first portfolio project for the Flow Timer brand.

## Features (v1 / MVP)

- 25-minute focus session, 5-minute short break, 15-minute long break
- Start / Pause / Reset controls
- Session counter — tracks completed focus sessions today, persisted across page reloads
- Three modes: Focus, Short Break, and Long Break — automatically cycles to a long break after every 4 focus sessions
- Audio alert when a session ends
- Desktop notifications when a session ends (with user permission)
- Custom timer duration per mode (1–120 minutes)
- Confirmation prompt before switching modes mid-session
- Stats view — last 7 days of completed focus sessions
- Dark mode toggle
- Persist theme preference across reloads

## Tech Stack

- React
- Vite
- Tailwind CSS

## Project Structure

```
src/
  components/    UI pieces (TimerDisplay, Controls, ModeSelector, SessionCounter,
                  DurationInput, StatsView)
  hooks/         usePomodoro.js — all timer state and logic
  utils/         formatTime.js — seconds -> "MM:SS"
                 dailySessions.js — Local Storage persistence, 7-day history
                 notifications.js — desktop notification permission and dispatch
  App.jsx        wires hook state to components, toggles timer/stats view
  main.jsx       React entry point
```

## Running Locally

```bash
npm install
npm run dev
```

## Roadmap

- **v2 (remaining):**  settings modal (sound on/off, notifications on/off, confirm-before-switch on/off, reset today's sessions, restore defaults); optional keyboard shortcuts
- **v3:** to-do list, background music, animated progress ring, themes, weekly stats, accounts, cloud sync