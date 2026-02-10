# Frontend Components Documentation

## Component Hierarchy

```
App.jsx (Main Component)
├── TodoForm.jsx
├── StatsBar.jsx
├── TodoList.jsx
│   └── TodoItem.jsx (multiple)
├── Alert.jsx
└── LoadingSpinner.jsx
```

---

## Components Overview

### 1. **App.jsx** - Main Application Component

**Purpose:** Central hub for state management, API integration, and component orchestration.

**Key Responsibilities:**
- Manage application state (todos, loading, filter, editing)
- Handle API calls (fetch, create, update, delete)
- Manage user interactions
- Render all child components
- Handle alerts and notifications

**State Variables:**
```javascript
const [todos, setTodos] = useState([])
const [loading, setLoading] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [alert, setAlert] = useState({ type: "", message: "" })
const [filter, setFilter] = useState("all")
const [editingTodo, setEditingTodo] = useState(null)
```

**Key Functions:**
| Function | Purpose |
|----------|---------|
| `fetchTodos()` | Fetch all todos from backend |
| `handleSubmit()` | Add or update todo |
| `handleToggle()` | Mark todo complete/incomplete |
| `handleDelete()` | Delete a todo |
| `handleEdit()` | Enter edit mode |
| `handleCancelEdit()` | Exit edit mode |
| `handleClearCompleted()` | Delete all completed todos |
| `showAlert()` | Display notification |

**Props Passed to Children:**
- `TodoForm`: `onSubmit`, `isLoading`, `editingTodo`, `onCancel`
- `StatsBar`: `todos`
- `TodoList`: `todos`, `onToggle`, `onDelete`, `onEdit`, `isLoading`, `filter`
- `Alert`: `type`, `message`, `onClose`

---

### 2. **TodoForm.jsx** - Add/Edit Todo Form

**Purpose:** Captures user input for creating and editing todos.

**Features:**
- ✅ Title input with 100 character limit
- ✅ Description textarea with 500 character limit
- ✅ Real-time character counters
- ✅ Form validation
- ✅ Submit and cancel buttons
- ✅ Loading state indicator

**Props:**
```javascript
{
  onSubmit: Function,        // Called when form is submitted
  isLoading: Boolean,        // Show loading state
  editingTodo: Object|null,  // Current todo being edited
  onCancel: Function         // Called on cancel button
}
```

**State:**
```javascript
const [title, setTitle] = useState(editingTodo?.title || "")
const [description, setDescription] = useState(editingTodo?.description || "")
const [error, setError] = useState("")
```

**Returns:**
```javascript
{ title, description }  // Submitted data
```

**Validation:**
- Title is required (cannot be empty)
- Character limits enforced

---

### 3. **TodoItem.jsx** - Individual Todo Card

**Purpose:** Displays a single todo with interactive controls.

**Features:**
- ✅ Checkbox for completion toggle
- ✅ Title and description display
- ✅ Created date formatted nicely
- ✅ Edit button
- ✅ Delete button
- ✅ Visual styling based on completion state
- ✅ Hover effects

**Props:**
```javascript
{
  todo: Object,              // Todo data
  onToggle: Function,        // Toggle completion handler
  onDelete: Function,        // Delete handler
  onEdit: Function,          // Edit handler
  isLoading: Boolean         // Disable during submission
}
```

**Todo Object Structure:**
```javascript
{
  _id: String,
  title: String,
  description: String,
  completed: Boolean,
  createdAt: String (ISO date)
}
```

**Styling:**
- Blue left border for active todos
- Green left border for completed todos
- Strike-through text for completed titles
- Dimmed text for completed descriptions

---

### 4. **TodoList.jsx** - Todos List Container

**Purpose:** Manages the filtered list of todos and renders individual items.

**Features:**
- ✅ Filters todos based on current filter
- ✅ Displays empty state message
- ✅ Renders TodoItem components
- ✅ Responsive grid layout

**Props:**
```javascript
{
  todos: Array,              // All todos
  onToggle: Function,        // Pass to TodoItem
  onDelete: Function,        // Pass to TodoItem
  onEdit: Function,          // Pass to TodoItem
  isLoading: Boolean,        // Pass to TodoItem
  filter: String             // "all" | "active" | "completed"
}
```

**Filter Logic:**
```javascript
const filteredTodos = todos.filter((todo) => {
  if (filter === "active") return !todo.completed
  if (filter === "completed") return todo.completed
  return true
})
```

**Empty State Messages:**
- No todos yet
- No active todos
- No completed todos

---

### 5. **StatsBar.jsx** - Progress Dashboard

**Purpose:** Displays task completion statistics and progress.

**Features:**
- ✅ Total tasks count
- ✅ Completed tasks count
- ✅ Pending tasks count
- ✅ Completion percentage
- ✅ Animated progress bar
- ✅ Gradient background

**Props:**
```javascript
{
  todos: Array  // All todos
}
```

**Calculations:**
```javascript
const total = todos.length
const completed = todos.filter((t) => t.completed).length
const pending = total - completed
const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
```

**Display:**
- 3-column stat grid
- Animated progress bar
- Percentage text

---

### 6. **Alert.jsx** - Toast Notifications

**Purpose:** Display temporary notification messages to the user.

**Features:**
- ✅ Success and error alerts
- ✅ Auto-dismiss after 3 seconds
- ✅ Manual close button
- ✅ Fade-in animation
- ✅ Fixed positioning (top-right)
- ✅ Icon indicators

**Props:**
```javascript
{
  type: String,              // "success" | "error"
  message: String,           // Notification text
  onClose: Function          // Called to close alert
}
```

**Styling:**
- Success: Green background, ✅ icon
- Error: Red background, ❌ icon

**Auto-dismiss:**
```javascript
setTimeout(() => setAlert({ type: "", message: "" }), 3000)
```

---

### 7. **LoadingSpinner.jsx** - Loading Indicator

**Purpose:** Show loading state while fetching data from backend.

**Features:**
- ✅ Animated spinner
- ✅ Loading text
- ✅ Centered layout
- ✅ Non-blocking display

**Props:**
None (standalone component)

**Animation:**
CSS-based rotating spinner using `@keyframes`

---

## Data Flow Diagram

```
User Interaction
       ↓
   App.jsx
   ├── State Update
   ├── API Call (axios)
   └── Handler Functions
       ├── handleSubmit() ↔ TodoForm
       ├── handleToggle() ↔ TodoItem
       ├── handleDelete() ↔ TodoItem
       ├── handleEdit() ↔ TodoItem
       └── showAlert() ↔ Alert

State Changes
       ↓
Re-render Components
       ├── TodoList (filtered)
       │   └── TodoItem[] (mapped)
       ├── StatsBar (recalculated)
       └── Alert (displayed)
```

---

## API Communication

### Request/Response Flow

**Create Todo:**
```
TodoForm.jsx ──onSubmit──> App.jsx
                              ↓
                         axios.post(/api/add)
                              ↓
                         Backend returns newTodo
                              ↓
                         setTodos([...todos, newTodo])
                              ↓
                         TodoList updates ← StatsBar updates
```

**Update Todo:**
```
TodoItem.jsx ──onToggle──> App.jsx
                              ↓
                         axios.put(/api/:id)
                              ↓
                         Backend returns updateTodo
                              ↓
                         setTodos(mapped updated)
                              ↓
                         TodoItem updates ← StatsBar updates
```

**Delete Todo:**
```
TodoItem.jsx ──onDelete──> App.jsx
                              ↓
                         Confirmation dialog
                              ↓
                         axios.delete(/api/:id)
                              ↓
                         setTodos(filtered)
                              ↓
                         TodoList updates ← StatsBar updates
```

---

## Component Communication

### Props Drilling
Components communicate through props in a hierarchical manner:

```
App (Parent)
  ├─ Pass props down
  │  └─ TodoList
  │     └─ TodoItem
  │        └─ Click event up to App
  └─ Handle click
     └─ Update state
        └─ Re-render all affected components
```

### Event Handlers
- **onClick** - Buttons
- **onChange** - Form inputs
- **onSubmit** - Form submission
- Custom handlers: `onToggle`, `onDelete`, `onEdit`

---

## Styling Strategy

### Tailwind CSS Classes

**Common Patterns:**
```javascript
// Buttons
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

// Cards/Containers
className="bg-white rounded-lg shadow-md p-4"

// Responsive
className="w-full max-w-2xl"

// Conditional
className={`text-gray-700 ${todo.completed ? "line-through" : ""}`}

// Gradient
className="bg-gradient-to-r from-blue-500 to-indigo-600"
```

### Custom CSS

Located in `App.css`:
- Animations: `@keyframes fadeIn`, `slideInRight`, `bounce`
- Utility classes: `.animate-fadeIn`, `.text-shadow`
- Scrollbar styling
- Smooth transitions

---

## Error Handling

### Try-Catch Pattern
```javascript
try {
  // API call or logic
  const response = await axios.post(...)
  // Update state
  setTodos([...todos, response.data])
  // Show success
  showAlert("success", "Todo added successfully!")
} catch (err) {
  // Show error to user
  showAlert("error", "Failed to add todo")
  // Log for debugging
  console.error(err)
}
```

### User Confirmations
```javascript
if (window.confirm("Are you sure you want to delete this todo?")) {
  // Proceed with deletion
}
```

---

## Performance Considerations

### Optimizations
1. **Component Memoization** - Pure components don't re-render unnecessarily
2. **State Separation** - Different concerns in different state variables
3. **Event Delegation** - Listeners on parent rather than each item
4. **Conditional Rendering** - Only render when needed

### Re-render Triggers
- User types in input → TodoForm re-renders
- Todo list changes → TodoList and StatsBar re-render
- Filter changes → TodoList re-renders with different filter
- Edit mode → App re-renders to show different form state

---

## Testing Recommendations

### Unit Tests
```javascript
// Test TodoItem renders correctly
// Test TodoForm validation
// Test filter logic in TodoList
```

### Integration Tests
```javascript
// Test adding todo flow
// Test editing todo flow
// Test deleting todo flow
// Test toggling completion
```

### E2E Tests
```javascript
// Full user workflow
// Multiple operations in sequence
// Error scenarios
```

---

## Future Enhancement Ideas

### New Components
- **SearchBar.jsx** - Search todos by title/description
- **TagFilter.jsx** - Filter by tags/categories
- **DueDatePicker.jsx** - Set and display due dates
- **TodoStats.jsx** - Additional statistics
- **Settings.jsx** - User preferences

### Enhanced Features
- Drag and drop reordering
- Recurring todos
- Subtasks/checklist
- Priority levels
- Time tracking
- Dark mode
- Offline support
- Export/Import
- Cloud sync
- Collaboration

### UI Improvements
- Animations on add/delete
- Undo functionality
- Bulk edit
- Quick edit mode
- Keyboard shortcuts
- Touch gestures

---

## Component Checklist

- ✅ **App.jsx** - Main orchestrator
- ✅ **TodoForm.jsx** - User input
- ✅ **TodoItem.jsx** - Individual item
- ✅ **TodoList.jsx** - List container
- ✅ **StatsBar.jsx** - Statistics
- ✅ **Alert.jsx** - Notifications
- ✅ **LoadingSpinner.jsx** - Loading state

**Total Components:** 7
**Total Lines of Code:** 400+
**Reusability:** High (component-based architecture)
**Maintainability:** High (single responsibility)
**Scalability:** High (modular structure)

---

## Version Info

- **React:** 19.1.1
- **Vite:** 7.1.7
- **Tailwind CSS:** 4.1.16
- **Axios:** 1.12.2
- **Node.js:** 18+

---

**Last Updated:** February 10, 2026
