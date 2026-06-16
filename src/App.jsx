import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle, FaEdit, FaSave } from 'react-icons/fa';
// 1. IMPORT YOUR BACKGROUND IMAGE HERE 👇
import bgPattern from './bg-pattern.jpg';

function App() {
  const [themeColor, setThemeColor] = useState(() => {
    const savedTheme = localStorage.getItem('my_theme');
    return savedTheme ? savedTheme : '#007bff'; 
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: 'Learn React basics', completed: false, taskColor: '#007bff' },
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('my_theme', themeColor);
  }, [themeColor]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const newTask = { id: Date.now(), text: inputValue, completed: false, taskColor: themeColor };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditingValue(currentText);
  };

  const handleSaveEdit = (id) => {
    if (editingValue.trim() === '') return;
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, text: editingValue } : task
    ));
    setEditingId(null);
  };

  return (
    // 2. FULL SCREEN BACKGROUND WRAPPER 👇
    <div style={{
      backgroundImage: `url(${bgPattern})`,
      backgroundRepeat: 'repeat', 
      backgroundPosition: 'center',
      minHeight: '100vh',         
      width: '100%',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      
      {/* TASK MANAGER CONTAINER */}
      <div style={{ 
        padding: '30px', 
        fontFamily: 'Arial, sans-serif', 
        maxWidth: '450px', 
        margin: '0 auto', 
        backgroundColor: 'rgba(249, 249, 249, 0.75)', // 👈 Decreased container opacity to 75%
        borderRadius: '12px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)' 
      }}>
        
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '5px' }}>📝 My Task Manager</h2>
        
        {/* THEME PICKER BAR */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '25px', marginTop: '15px' }}>
          {[
            { name: 'Blue', hex: '#007bff' },
            { name: 'Green', hex: '#28a745' },
            { name: 'Purple', hex: '#6f42c1' },
            { name: 'Orange', hex: '#abe60b' },
            { name: 'Pink', hex: '#e83e8c' }
          ].map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => setThemeColor(color.hex)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: color.hex,
                border: themeColor === color.hex ? '3px solid #333' : '1px solid #ccc',
                cursor: 'pointer',
                transform: themeColor === color.hex ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
              title={color.name}
            />
          ))}
        </div>

        {/* INPUT FORM */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '10px', 
              borderRadius: '6px', 
              border: `2px solid ${themeColor}`,
              outline: 'none',
              fontSize: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)' // 👈 Subtle transparency for typing input too!
            }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: '10px 15px', 
              backgroundColor: themeColor, 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '16px'
            }}
          >
            <FaPlus />
          </button>
        </form>

        {/* TASK LIST */}
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => {
            const itemBgColor = task.completed ? '#f1f1f1' : `${task.taskColor}12`;
            const itemBorderColor = task.completed ? '#e0e0e0' : task.taskColor;
            return (
              <li
                key={task.id}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.45)', // 👈 Decreased individual tab background opacity to 45%
                  borderLeft: `5px solid ${itemBorderColor}`, 
                  boxShadow: `inset 0 0 0 100px ${itemBgColor}`, 
                  marginBottom: '10px', 
                  borderRadius: '8px', 
                  transition: 'all 0.3s ease'
                }}
              >
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    style={{ 
                      flex: 1, 
                      padding: '6px', 
                      fontSize: '16px', 
                      marginRight: '10px', 
                      borderRadius: '4px', 
                      border: `2px solid ${task.taskColor}`,
                      outline: 'none'
                    }}
                  />
                ) : (
                  <div
                    onClick={() => handleToggleComplete(task.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
                  >
                    {task.completed ? (
                      <FaCheckCircle style={{ color: '#28a745', fontSize: '20px' }} />
                    ) : (
                      <FaRegCircle style={{ color: task.taskColor, fontSize: '20px' }} />
                    )}
                    <span style={{ 
                      textDecoration: task.completed ? 'line-through' : 'none', 
                      color: task.completed ? '#a0a0a0' : '#222', 
                      fontSize: '16px',
                      fontWeight: task.completed ? 'normal' : '600' // Enhanced font weight slightly so text pops over transparency
                    }}>
                    {task.text}
                    </span>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {editingId === task.id ? (
                    <button onClick={() => handleSaveEdit(task.id)} style={{ background: 'none', border: 'none', color: '#28a745', cursor: 'pointer', fontSize: '18px' }}>
                      <FaSave />
                    </button>
                  ) : (
                    <button onClick={() => startEdit(task.id, task.text)} style={{ background: 'none', border: 'none', color: '#ffc107', cursor: 'pointer', fontSize: '18px' }}>
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => handleDeleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '18px' }}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No tasks left! Enjoy your day! 🎉</p>
        )}
      </div>
    </div>
  );
}

export default App;