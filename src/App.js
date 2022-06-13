import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import TodoList from "./components/TodoList";
import './App.css'
import Login from "./components/Login";
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';
import tasksData from "./data/tasks.json";

function App() {
  const [tasks, setTasks] = useState(tasksData);
  const defaultTask = {
    title: "",
    id: null,
    description: "",
    deadline: null,
    tags: [],
    priority: false,
    image: "",
    completed: false,
    createdAt: null
  };

  const onCreate = newTask => {
    newTask.title.length > 0 && setTasks([newTask, ...tasks]);
  };

  const onUpdate = (task, id) => {
    let tempList = tasks;
    let index = tasks.findIndex(t => t.id === id);
    tempList[index] = task;
    setTasks([...tempList]);
  };
  const onDelete = (id) => {
    let tempList = tasks.filter(task => task.id !== id);
    setTasks(tempList);
  };

  useEffect(() => {
    let arr = localStorage.getItem("tasks");
    if (arr) {
      setTasks(JSON.parse(arr));
    }
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);


  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <TodoList tasks={tasks} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} defaultTask={defaultTask} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
