import { useState } from 'react'
import LeadsPanel from './components/LeadsPanel'
import './App.css'

function App() {
  return (
    <div className="admin-layout">
      <nav className="admin-navbar">
        <div className="navbar-brand">
          <h2>🏢 Abstractdecor Admin Panel</h2>
        </div>
      </nav>
      
      <main className="admin-main">
        <LeadsPanel />
      </main>
    </div>
  )
}

export default App
