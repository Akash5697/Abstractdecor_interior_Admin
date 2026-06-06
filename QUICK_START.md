# Quick Start Guide - Admin Panel

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd Abstractdecor_interior_Admin
npm install
```

### Step 2: Start Backend Server
Open a new terminal:
```bash
cd Abstractdecor_interior_Backend
npm start
```

The backend should run on `http://localhost:5000`

### Step 3: Start Admin Panel
Open another terminal in the admin folder:
```bash
npm run dev
```

The admin panel opens at `http://localhost:5173`

---

## 📊 What You'll See

Once running, you'll have:
- **Dashboard** with lead statistics (Total, Residential, Commercial)
- **Leads Table** with all user information
- **Filter** to view specific property types
- **Action Buttons** to delete leads and refresh data

---

## 🔗 API Connection

The admin panel automatically connects to:
```
GET http://localhost:5000/api/offers
```

This fetches all user leads from the database and displays them in the table.

---

## 📋 Features Available

| Feature | Description |
|---------|-------------|
| 📊 View Stats | See total leads count by type |
| 🔍 Filter | Filter by Residential/Commercial |
| 📞 Click to Call | Click phone number to call |
| 📧 Click to Email | Click email to open email client |
| 🗑️ Delete Leads | Remove leads from the system |
| 🔄 Refresh | Manually reload data |

---

## ❌ Troubleshooting

**Error: Cannot connect to API**
- Check backend is running on port 5000
- Verify CORS is enabled (it should be by default)

**No leads showing**
- Ensure backend database has data
- Click the Refresh button
- Check browser console for errors

**Port 5173 already in use**
```bash
npm run dev -- --port 5174
```

---

## 📚 See Also

For detailed documentation, see `ADMIN_PANEL_GUIDE.md`
