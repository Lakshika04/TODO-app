# Task Manager Frontend

A modern, feature-rich todo list application built with React, Vite, and Tailwind CSS.

## Features

### ✨ Core Functionality
- **Create Todos**: Add tasks with title and description
- **Edit Todos**: Update existing todos inline
- **Mark Complete**: Check off completed tasks with a visual indicator
- **Delete Todos**: Remove tasks with confirmation dialog
- **Clear Completed**: Bulk delete all completed tasks

### 📊 Progress Tracking
- **Stats Dashboard**: View total, completed, and pending task counts
- **Progress Bar**: Visual representation of completion percentage
- **Real-time Updates**: All stats update instantly

### 🔍 Smart Filtering
- **All Tasks**: View all todos
- **Active Tasks**: Show only incomplete todos
- **Completed Tasks**: Show only finished todos
- **Filter Counts**: See counts for each filter type

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Toast notifications for all actions (add, update, delete)
- **Loading States**: Spinner feedback while fetching data
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Fade-in effects and button interactions
- **Character Limits**: Visual feedback with character counters

### 📱 UI Components

#### TodoForm
- Input fields for title and description
- Character counters (100 for title, 500 for description)
- Submit button with loading state
- Cancel button when editing
- Form validation

#### TodoItem
- Task title and description display
- Checkbox to mark complete
- Edit button to modify task
- Delete button with confirmation
- Created date display
- Visual styling for completed tasks

#### TodoList
- Responsive list layout
- Empty state messages
- Filtered todos based on current filter
- Smooth transitions and hover effects

#### StatsBar
- Total tasks count
- Completed tasks count
- Pending tasks count
- Progress percentage with visual bar
- Gradient background styling

#### Alert
- Success and error toast notifications
- Auto-dismiss after 3 seconds
- Close button for manual dismissal
- Fixed position in top-right corner

#### LoadingSpinner
- Centered spinning loader
- Loading message
- Non-blocking spinner during data fetch

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Alert.jsx          # Toast notifications
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   ├── StatsBar.jsx        # Progress statistics
│   │   ├── TodoForm.jsx        # Add/edit form
│   │   ├── TodoItem.jsx        # Individual todo card
│   │   └── TodoList.jsx        # List container
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles & animations
│   ├── index.css               # Tailwind imports
│   └── main.jsx                # React entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api` with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todo` | Fetch all todos |
| POST | `/add` | Create a new todo |
| PUT | `/:id` | Update a todo |
| DELETE | `/:id` | Delete a todo |

### Request/Response Format

**Create Todo (POST /add)**
```javascript
// Request
{
  "title": "Task title",
  "description": "Optional description",
  "completed": false
}

// Response
{
  "message": "todo saved successfully",
  "newTodo": {
    "_id": "...",
    "title": "Task title",
    "description": "Optional description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Update Todo (PUT /:id)**
```javascript
// Request
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}

// Response
{
  "message": "todo updated successfully",
  "updateTodo": { ... }
}
```

## Technologies Used

- **React 19**: Modern UI library with hooks
- **Vite 7**: Ultra-fast build tool
- **Tailwind CSS 4**: Utility-first CSS framework
- **Axios 1.12**: HTTP client for API requests
- **ESLint 9**: Code quality tool

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Performance Optimizations

- Component-based architecture for reusability
- Memoized state updates
- Lazy loading with loading states
- Optimized re-renders with React hooks
- Minimal CSS reprocessing with Tailwind

## Development Notes

### Key Features Implementation:
1. **State Management**: Uses React `useState` for local state
2. **Side Effects**: `useEffect` hook for initial data fetch
3. **API Calls**: Axios for async HTTP requests
4. **Error Handling**: Try-catch blocks with user-friendly messages
5. **Form Validation**: Client-side validation before submission

### Styling Approach:
- Tailwind CSS for rapid UI development
- Custom CSS animations in `App.css`
- Responsive design with mobile-first approach
- Color scheme: Blue/Indigo gradient theme

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Local storage persistence
- [ ] Drag and drop reordering
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Search functionality
- [ ] Bulk operations
- [ ] Export to PDF/CSV
- [ ] User authentication
- [ ] Cloud synchronization
- [ ] Keyboard shortcuts
- [ ] Offline support with service workers

## Troubleshooting

### Backend Connection Issues
- Ensure backend server is running on port 5000
- Check browser console for CORS errors
- Verify API_BASE URL in App.jsx

### Development Server Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires Node 18+)
- Restart dev server after changes

## License

MIT