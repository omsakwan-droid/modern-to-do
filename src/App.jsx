import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return []
      }
    }
    return []
  })
  
  const [inputVal, setInputVal] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    const newTodo = {
      id: Date.now().toString(),
      text: inputVal.trim(),
      completed: false
    }
    setTodos([...todos, newTodo])
    setInputVal('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Master</h1>
        <p>Manage your daily goals efficiently</p>
      </header>

      <form onSubmit={addTodo} className="input-container">
        <input 
          type="text" 
          className="task-input" 
          placeholder="What needs to be done?" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit" className="add-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add one above to get started!</p>
        </div>
      ) : (
        <ul className="todos-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input 
                  type="checkbox" 
                  className="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete task"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
