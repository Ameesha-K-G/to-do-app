# 📝 The Checklist

A beautiful, responsive React task manager featuring local storage persistence, multi-color theme personalization, and a clean glassmorphism aesthetic over a custom hand-drawn background.



---

## ✨ Features

* **➕ Core Task Actions:** Easily add, inline-edit, delete, and toggle task completion.
* **✅ Status Indicators:** Clean, filled icons track completion states smoothly.
* **🎨 Dynamic Theme Retention:** Pick a personalized color accent while typing a task; each item permanently retains its creation-time color.
* ** Local Storage Persistence:** Tasks and selected themes are automatically saved to your browser database so your data survives page refreshes.
* ** Glassmorphism UI:** Features transparent cards utilizing customized typography ('Caveat' for headlines and 'Comfortaa' for inputs/texts).

---

## 🛠️ Tech Stack & Concepts Explored

* **React (Vite Template):** Used for component architecture.
* **State Management (`useState`):** Tracks input values, operational editing modes, dynamic item tracking, and global theme color selection.
* **Side Effects (`useEffect`):** Manages automated data syncing with the browser's Local Storage APIs.
* **Conditional Rendering:** Dynamically toggles between plain text readout and an interactive inline input field during task modification.

---

## 🚀 Local Setup Instructions

Follow these quick instructions to spin up the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR-USERNAME/my-todo-app.git](https://github.com/YOUR-USERNAME/my-todo-app.git)
   cd my-todo-app
