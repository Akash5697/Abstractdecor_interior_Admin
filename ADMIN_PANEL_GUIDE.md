# Admin Panel Setup Guide

## Overview
This admin panel displays user leads collected from the frontend application. It fetches data from the backend API endpoint `http://localhost:5000/api/offers`.

## Features
- ✅ **View All Leads**: Display all user leads in a responsive table
- ✅ **Filter by Property Type**: Filter leads by residential or commercial properties
- ✅ **Statistics Dashboard**: View total leads, residential, and commercial counts
- ✅ **Contact Integration**: Click to call or email leads directly
- ✅ **Delete Leads**: Remove leads from the system
- ✅ **Refresh Data**: Manually refresh the leads list
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

## Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

## Installation

### 1. Install Dependencies
Navigate to the admin folder and install dependencies:
```bash
cd Abstractdecor_interior_Admin
npm install
```

### 2. Start the Admin Panel
Run the development server:
```bash
npm run dev
```

The admin panel will typically run on `http://localhost:5173` (Vite default)

### 3. Ensure Backend is Running
Make sure the backend server is running on `http://localhost:5000`:
```bash
cd ../Abstractdecor_interior_Backend
npm install
npm start
```

The backend should log something like:
```
Server is running on port 5000
```

## API Integration

The admin panel connects to the backend API:

### Endpoints Used:
- **GET** `/api/offers` - Fetch all leads
- **DELETE** `/api/offers/:id` - Delete a specific lead

### API Response Format:
```json
{
  "success": true,
  "message": "Offers fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "mobileNo": "+1-800-555-0123",
      "propertyType": "residential",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Components Structure

### LeadsPanel.jsx
Main component that:
- Fetches leads from the API on component mount
- Displays leads in a table format
- Handles filtering and sorting
- Manages lead deletion
- Shows statistics

### Files Created:
- `src/components/LeadsPanel.jsx` - Main leads display component
- `src/components/LeadsPanel.css` - Styling for the leads panel
- `src/App.jsx` - Updated to include navbar and leads panel
- `src/App.css` - Admin layout styling
- `src/index.css` - Global styles

## Usage

### Viewing Leads
1. Open the admin panel (http://localhost:5173)
2. The page will automatically fetch and display all leads from the backend
3. Leads are displayed in a responsive table with columns:
   - Name
   - Email (clickable to open email client)
   - Phone (clickable to call)
   - Property Type (residential/commercial)
   - Date (creation date and time)
   - Actions (delete button)

### Filtering Leads
1. Use the "Filter by Property Type" dropdown
2. Select one of:
   - All Properties
   - Residential
   - Commercial
3. The table will update to show filtered results

### Contacting Leads
- **Email**: Click on the email address to open your default email client
- **Phone**: Click on the phone number to call (if on mobile device)

### Deleting a Lead
1. Click the delete button (🗑️) in the Actions column
2. Confirm the deletion when prompted
3. The lead will be removed from the table

### Refreshing Data
Click the "Refresh" button (🔄) in the top-right corner to manually reload the leads from the API

## Troubleshooting

### Backend Connection Error
If you see an error message, ensure:
1. Backend server is running on `http://localhost:5000`
2. CORS is enabled in the backend (it should be by default)
3. MongoDB is connected and running

### No Leads Showing
- Check if there are actually leads in the database
- Try clicking the Refresh button
- Check browser console for error messages

### Mobile View Issues
The admin panel is fully responsive. If elements look broken on mobile:
- Try rotating the device
- Clear browser cache
- Ensure you're using a modern browser

## Building for Production

To create an optimized production build:
```bash
npm run build
```

This will create a `dist` folder with the optimized files.

To preview the production build locally:
```bash
npm run preview
```

## Environment Variables
Currently, the API endpoint is hardcoded to `http://localhost:5000`. For production, you may want to move this to an environment variable:

Create a `.env` file in the admin folder:
```
VITE_API_BASE_URL=http://localhost:5000
```

Then update the LeadsPanel.jsx to use:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const response = await fetch(`${API_BASE_URL}/api/offers`);
```

## Future Enhancements
- Add search functionality
- Implement pagination for large lead lists
- Add lead detail view modal
- Implement lead export to CSV
- Add user authentication
- Add lead status tracking
- Implement email templates
- Add SMS sending capability

## Support
For issues or questions, please check:
1. Browser console for error messages
2. Backend server logs
3. Network tab in developer tools to inspect API calls
