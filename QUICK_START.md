# 🚀 Quick Start Guide - Todo List Application

## Prerequisites
- **Node.js** 18+ (download from nodejs.org)
- **MongoDB** running locally or connection string in `.env`
- **Git** (optional)

---

## ⚡ 5-Minute Setup

### Step 1: Start the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists) with:
# MONGO_URI=mongodb://localhost:27017/todo_db
# PORT=5000

# Start the server
npm run october
```

**Expected Output:**
```
server running on port 5000
```

✅ Backend is ready at `http://localhost:5000/api`

---

### Step 2: Start the Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

✅ Frontend is ready at `http://localhost:5173`

---

### Step 3: Open in Browser

1. Go to **`http://localhost:5173`**
2. You should see the Task Manager app
3. Start adding todos! ✨

---

## 🎯 Basic Usage

### Add a Todo
1. Enter task title in the first field
2. (Optional) Add description in the second field
3. Click **"Add Todo"** button
4. Task appears in the list

### Edit a Todo
1. Click the **✏️** button on any task
2. Form will scroll to top with inputs pre-filled
3. Make your changes
4. Click **"Update Todo"**
5. Click **Cancel** to exit edit mode

### Mark Complete
1. Click the **checkbox** next to a task
2. Task will show with strikethrough
3. It will move to the "Completed" filter

### Delete a Todo
1. Click the **🗑️** button on a task
2. Confirm the deletion
3. Task is removed

### Filter Tasks
- **All** - Show all tasks
- **Active** - Show only incomplete tasks
- **Completed** - Show only finished tasks
- **Clear Completed** - Delete all finished tasks at once

### View Progress
- **Stats Dashboard** shows:
  - Total tasks count
  - Completed tasks count
  - Pending tasks count
  - Completion percentage with progress bar

---

## 🔧 Troubleshooting

### Issue: Backend Connection Error
**Error Message:** `Failed to load todos`

**Solution:**
1. Verify backend is running on port 5000
2. Check terminal shows `server running on port 5000`
3. Ensure MongoDB is running
4. Check `.env` file has correct MONGO_URI
5. Restart backend: `npm run october`

### Issue: Port Already in Use
**Error Message:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# On Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: Module Not Found
**Error Message:** `Cannot find module...`

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or on Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue: CORS Error
**Error Message:** `CORS policy...`

**Solution:**
1. Ensure backend has CORS enabled in `src/index.js`
2. Check backend is running on port 5000
3. Verify frontend API_BASE URL in `App.jsx` is correct

---

## 📁 Project Structure

```
todo/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── index.js     # Server entry point
│   │   ├── config/      # Database config
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   └── controllers/ # Business logic
│   └── package.json
│
└── frontend/            # React + Vite app
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── App.jsx      # Main component
    │   └── main.jsx     # Entry point
    ├── index.html
    └── package.json
```

---

## 🛠️ Available Commands

### Frontend Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint checker
npm run lint
```

### Backend Commands

```bash
# Start with auto-reload (nodemon)
npm run october

# Run tests (when configured)
npm test
```

---

## 📋 Features Checklist

- ✅ Add todos with title and description
- ✅ Edit existing todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete individual todos
- ✅ Delete all completed todos at once
- ✅ Filter by all/active/completed
- ✅ Real-time progress statistics
- ✅ Toast notifications
- ✅ Form validation
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Created date display
- ✅ Character counters

---

## 🎨 UI Tips

**Color Coding:**
- 🔵 Blue: Active/Pending tasks
- 🟢 Green: Completed tasks
- 🔴 Red: Delete actions

**Visual Feedback:**
- Hover over items to see interactions
- Buttons change color when disabled
- Tasks show strikethrough when complete
- Progress bar fills as you complete tasks

**Responsive:**
- Works on desktop (1024px+)
- Optimized for tablet (640px - 1024px)
- Mobile-friendly (< 640px)

---

## 🚀 Development Tips

### Hot Module Replacement (HMR)
- Frontend: Changes auto-reload instantly
- Backend: Use `npm run october` (includes nodemon)

### Browser DevTools
- Open Chrome DevTools: **F12**
- Check Network tab for API calls
- Use Console tab for debugging

### API Testing
- Use Postman or Thunder Client
- Base URL: `http://localhost:5000/api`
- Endpoints:
  - `POST /add` - Create todo
  - `GET /todo` - Get all todos
  - `PUT /:id` - Update todo
  - `DELETE /:id` - Delete todo

---

## 📚 Documentation Files

- **`PROJECT_SUMMARY.md`** - Complete overview of the project
- **`frontend/FRONTEND_README.md`** - Detailed frontend documentation
- **`backend/`** - Backend setup and structure

---

## 🆘 Need Help?

### Check These Things First:

1. **Backend running?**
   - Terminal should show: `server running on port 5000`

2. **Frontend running?**
   - Terminal should show: `Local: http://localhost:5173/`

3. **MongoDB connected?**
   - Check `.env` file in backend folder
   - Verify MongoDB is running

4. **Ports available?**
   - Port 5000 (backend)
   - Port 5173 (frontend)

5. **Firewall/Network?**
   - Ensure localhost ports are not blocked

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| Can't add todos | Backend not running |
| Page shows blank | Frontend not running or wrong port |
| Connection refused | One of the services isn't started |
| No data loads | Check MongoDB connection in .env |
| Styling looks weird | Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R` |

---

## ✨ You're All Set!

1. ✅ Backend running at `http://localhost:5000/api`
2. ✅ Frontend running at `http://localhost:5173`
3. ✅ Start managing your tasks!

**Happy Task Managing! 🎉**

---

**Questions?** Check `PROJECT_SUMMARY.md` for detailed documentation.

**Found an issue?** Review the Troubleshooting section above.
