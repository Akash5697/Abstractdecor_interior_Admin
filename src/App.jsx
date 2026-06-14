import { useState } from 'react'
import LeadsPanel from './components/LeadsPanel'
import ImageManager from './components/ImageManager'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('leads')

  return (
    <div className="admin-layout">
      <nav className="admin-navbar">
        <div className="navbar-brand">
          <h2>🏢 Abstractdecor Admin Panel</h2>
        </div>
        <div className="admin-navbar-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            📊 Leads Dashboard
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            🖼️ Image Manager
          </button>
        </div>
      </nav>
      
      <main className="admin-main">
        <div className="tab-content">
          {activeTab === 'leads' ? <LeadsPanel /> : <ImageManager />}
        </div>
      </main>
    </div>
  )
}

export default App
