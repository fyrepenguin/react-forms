import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './TaskForm'
import TaskItem from './TaskItem';
import TaskHeader from './TaskHeader';

const TodoList = ({ tasks, onCreate, onUpdate, onDelete }) => {
  const defaultTask = { title: "", description: "", deadline: null, tags: [], priority: false, image: "", completed: false, id: null, createdAt: null };
  const [modal, setModal] = useState(false);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [categorisedTasks, setCategorisedTasks] = useState({
    all: [],
    today: [],
    thisWeek: [],
    overDue: [],
    completed: [],
    priority: [],
    tags: []
  });

  const [title, setTitle] = useState('');
  const toggle = () => {
    setModal(!modal);
  }

  const addTask = (e) => {
    e.preventDefault();
    onCreate({ ...defaultTask, title, id: uuidv4(), createdAt: new Date().getTime() });
    setTitle('');
  }
  const handleInput = (e) => {
    setTitle(e.target.value)
  }

  // push tasks that are completed to the bottom of the list

  useEffect(() => {
    const overDue = sortedTasks.filter(task => {
      if (task.deadline && new Date(task.deadline).getTime() < new Date().getTime() && !task.completed) {
        return true
      }
      return false
    })

    const completed = sortedTasks.filter(task => task.completed);
    const priority = sortedTasks.filter(task => task.priority);

    const today = sortedTasks.filter(task => {
      if (task.deadline && task.deadline > new Date().getTime() && task.deadline < new Date().setDate(new Date().getDate() + 1)) {
        return true
      }
      return false
    })
    const thisWeek = sortedTasks.filter(task => {
      if (task.deadline && task.deadline > new Date().getTime() && task.deadline < new Date().setDate(new Date().getDate() + 7)) {
        return true
      }
      return false
    });


    //filter tasks based on selected tags
    setCategorisedTasks(prev => ({
      all: tasks,
      today,
      thisWeek,
      overDue,
      completed,
      priority,
      tags: prev.tags
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedTasks])

  return (
    <>
      <div className="todo-list-header">
        <form onSubmit={addTask} className='task-input-container'>  <input placeholder="Add task todo..." type="text" name="title" onChange={handleInput} value={title} />
          <button type="submit">Create Task</button>
        </form>
        <div className='task-input-container'>
          <button className="btn btn-primary mt-2" onClick={() => setModal(true)} >Create Detailed Task</button>
        </div>
        <TaskHeader setSortedTasks={setSortedTasks} tasks={tasks} />

      </div>
      <div className="tasks-container">
        {/* Today Tasks */}
        {categorisedTasks.today.filter(task => !task.completed).length > 0 && <div className="tasks-container-header">
          <h3>Today</h3>
          {categorisedTasks.today.filter(task => !task.completed).map((task, index) => <TaskItem task={task} index={index} onDelete={onDelete} onUpdate={onUpdate} key={index} />)}</div>}
        {/* This Week Tasks */}
        {categorisedTasks.thisWeek.filter(task => !task.completed).filter(task => !categorisedTasks.today.includes(task)).length > 0 && <div className="tasks-container-header">
          <h3>This Week</h3>
          {/* filter today tasks */}
          {categorisedTasks.thisWeek.filter(task => !categorisedTasks.today.includes(task)).map((task, index) => <TaskItem task={task} index={index} onDelete={onDelete} onUpdate={onUpdate} key={index} />)}</div>}

        {/* Overdue Tasks */}
        {categorisedTasks.overDue.length > 0 && <div className="tasks-container-header">
          <h3>Overdue</h3>
          {categorisedTasks.overDue.map((task, index) => <TaskItem task={task} index={index} onDelete={onDelete} onUpdate={onUpdate} key={index} overDue={true} />)}</div>}
        {/* Rest of the incomplete tasks */}
        {sortedTasks.length > 0 &&
          <div className='tasks-container-header'>
            {sortedTasks.filter(task => !task.completed).filter(task => !categorisedTasks.today.includes(task)).filter(task => !categorisedTasks.thisWeek.includes(task)).filter(task => !categorisedTasks.overDue.includes(task)).map((task, index) => <TaskItem task={task} index={index} onDelete={onDelete} onUpdate={onUpdate} key={index} />)} </div>}
        {/* Empty Tasks */}
        {sortedTasks.length === 0 && <div className="tasks-container-header">
          <p className="no-tasks-found-message">No Tasks found!</p>
        </div>}


        {/* Completed Tasks */}
        {categorisedTasks.completed.length > 0 && <div className="tasks-container-header">
          <h3>Completed</h3>
          {categorisedTasks.completed.map((task, index) => <TaskItem task={task} index={index} onDelete={onDelete} onUpdate={onUpdate} key={index} />)}</div>}
      </div>
      <TaskForm key={0} toggle={toggle} modal={modal} onCreate={onCreate}
        defaultTask={defaultTask} type="Create" />
    </>
  );
};

export default TodoList;