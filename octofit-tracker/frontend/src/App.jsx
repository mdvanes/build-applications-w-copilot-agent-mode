import React from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_BASE_URL } from './lib/api'

const navLinkStyle = {
  marginRight: 12,
  padding: '8px 12px',
  borderRadius: 6,
  textDecoration: 'none',
  color: '#1f2937',
  border: '1px solid transparent'
}

const activeNavLinkStyle = {
  ...navLinkStyle,
  borderColor: '#3b82f6',
  backgroundColor: '#eff6ff'
}

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 1024, margin: '0 auto' }}>
      <header style={{ marginBottom: 24 }}>
        <h1>OctoFit Tracker</h1>
        <p style={{ maxWidth: 680, lineHeight: 1.6 }}>
          A React 19 presentation tier with client-side routing and Codespaces-aware API endpoint handling.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#374151' }}>
          API base URL: <code>{API_BASE_URL}</code>
        </p>
        <p style={{ fontSize: '0.95rem', color: '#374151' }}>
          Note: <code>VITE_CODESPACE_NAME</code> should be defined in <code>.env.local</code> when running in Codespaces.
          If it is unset, the app falls back to <code>http://localhost:8000</code>.
        </p>
      </header>

      <nav style={{ marginBottom: 24 }}>
        <NavLink to="/" end style={({ isActive }) => (isActive ? activeNavLinkStyle : navLinkStyle)}>
          Home
        </NavLink>
        <NavLink to="/users" style={({ isActive }) => (isActive ? activeNavLinkStyle : navLinkStyle)}>
          Users
        </NavLink>
        <NavLink to="/teams" style={({ isActive }) => (isActive ? activeNavLinkStyle : navLinkStyle)}>
          Teams
        </NavLink>
        <NavLink to="/workouts" style={({ isActive }) => (isActive ? activeNavLinkStyle : navLinkStyle)}>
          Workouts
        </NavLink>
        <NavLink to="/activities" style={({ isActive }) => (isActive ? activeNavLinkStyle : navLinkStyle)}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" style={({ isActive }) => (isActive ? activeNavLinkStyle : navLinkStyle)}>
          Leaderboard
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<section><h2>Welcome to OctoFit Tracker</h2><p>Select a page above to view users, teams, workouts, activities, or leaderboard entries.</p></section>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
