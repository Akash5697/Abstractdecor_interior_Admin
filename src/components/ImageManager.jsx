import { useEffect, useState } from 'react'
import './LeadsPanel.css'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'

const CATEGORY_MAP = {
  hero: 'Home Hero Slider',
  banner: 'Promotional Banner',
  other: 'Other / General',
  'modular-kitchen': 'Modular Kitchen',
  bedroom: 'Bedroom',
  'kids-room': 'Kids Room',
  'living-dining': 'Living / Dining',
  toilet: 'Toilet',
  balcony: 'Balcony',
  'home-interiors': 'Rooftop / Home Interiors',
  office: 'Office',
  salon: 'Salon',
  'cafe-restaurants': 'Cafe / Restaurants',
  '2d-plans': '2D Plans',
  moodboard: 'Moodboard',
  '3d-designs': '3D Designs',
  walkthrough: 'Walkthrough',
  'theme-based-design': 'Theme Based Design',
}

export default function ImageManager() {
  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)
  const [section, setSection] = useState('hero')
  const [meta, setMeta] = useState({ title: '', description: '', ctaText: '', link: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchImages() }, [section])

  async function fetchImages() {
    try {
      const res = await fetch(`${API_BASE_URL}/images?section=${encodeURIComponent(section)}`)
      const data = await res.json()
      if (data.success) setImages(data.data)
    } catch (err) {
      console.error('Fetch images error', err)
    }
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return alert('Select an image file')
    function readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    try {
      setLoading(true)
      const dataUrl = await readFileAsBase64(file)
      const base64 = dataUrl.split(',')[1]
      const payload = {
        filename: file.name,
        contentBase64: base64,
        section,
        title: meta.title,
        description: meta.description,
        ctaText: meta.ctaText,
        link: meta.link
      }

      const res = await fetch(`${API_BASE_URL}/images`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.success) {
        setFile(null)
        setMeta({ title: '', description: '', ctaText: '', link: '' })
        fetchImages()
        alert('Uploaded')
      } else {
        alert(data.message || 'Upload failed')
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally { setLoading(false) }
  }

  async function toggleVisible(id, current) {
    try {
      const res = await fetch(`${API_BASE_URL}/images/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !current })
      })
      const data = await res.json()
      if (data.success) fetchImages()
    } catch (err) { console.error(err) }
  }

  async function handleDelete(id) {
    if (!confirm('Delete image?')) return
    try {
      const res = await fetch(`${API_BASE_URL}/images/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) fetchImages()
    } catch (err) { console.error(err) }
  }

  const backendOrigin = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/api$/, '')

  return (
    <div className="leads-panel">
      <div className="leads-header">
        <h1>Image Manager</h1>
      </div>

      <form className="image-upload-form" onSubmit={handleUpload} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input key={file ? 'selected' : 'empty'} type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <optgroup label="Main Sections">
              <option value="hero">Home Hero Slider</option>
              <option value="banner">Promotional Banner</option>
              <option value="other">Other / General</option>
            </optgroup>
            <optgroup label="Services">
              <option value="modular-kitchen">Modular Kitchen</option>
              <option value="bedroom">Bedroom</option>
              <option value="kids-room">Kids Room</option>
              <option value="living-dining">Living / Dining</option>
              <option value="toilet">Toilet</option>
              <option value="balcony">Balcony</option>
              <option value="home-interiors">Rooftop / Home Interiors</option>
              <option value="office">Office</option>
              <option value="salon">Salon</option>
              <option value="cafe-restaurants">Cafe / Restaurants</option>
            </optgroup>
            <optgroup label="Design Guides">
              <option value="2d-plans">2D Plans</option>
              <option value="moodboard">Moodboard</option>
              <option value="3d-designs">3D Designs</option>
              <option value="walkthrough">Walkthrough</option>
              <option value="theme-based-design">Theme Based Design</option>
            </optgroup>
          </select>
          <input placeholder="Title" value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
          <button type="submit" disabled={loading}>Upload</button>
        </div>
      </form>

      <div className="leads-table-container">
        <table className="leads-table">
          <thead>
            <tr><th>Preview</th><th>Title</th><th>Section</th><th>Visible</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {images.map(img => (
              <tr key={img._id}>
                <td className="name-cell">
                  <img src={`${backendOrigin}${img.url}`} alt={img.title || ''} style={{ height: 60, width: 100, objectFit: 'cover' }} />
                </td>
                <td>{img.title}</td>
                <td>{CATEGORY_MAP[img.section] || img.section}</td>
                <td>
                  <input type="checkbox" checked={img.visible} onChange={() => toggleVisible(img._id, img.visible)} />
                </td>
                <td>
                  <button onClick={() => handleDelete(img._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
