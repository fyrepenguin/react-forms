import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm'
import { FaEdit, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import { BsExclamationDiamond } from 'react-icons/bs';
import { FiCircle, FiCheckCircle } from 'react-icons/fi'


const TaskItem = ({ task, onDelete, onUpdate, overDue = false }) => {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(null);

  const toggle = () => {
    setModal(!modal);
  }

  const handleStatus = (e) => {
    setStatus(prev => !prev);
  }

  const handleDelete = () => {
    onDelete(task.id)
  }
  useEffect(() => {
    setStatus(task.completed)
  }, [task])

  useEffect(() => {
    status !== null && onUpdate({ ...task, completed: status }, task.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>
      <div>
        <div className="task-item">
          <div className="task-header">
            <div className="status-icon-container" onClick={handleStatus} >
              {status ? <FiCheckCircle className='completed-icon' /> : <FiCircle />}
            </div><div onClick={() => setModal(!task.completed)}>
              <h4 className='task-item-title' style={{ textDecoration: status ? 'line-through' : 'none' }}>{task.title.length > 100 ? `${task.title.slice(0, 100)}...` : task.title}</h4>
              {task.description && <div className='task-item-description'>
                {task.description.length > 100 ? `${task.description.slice(0, 100)}...` : task.description}
              </div>}

              {task.deadline && <div className='task-item-deadline' style={{ color: overDue ? 'red' : 'initial' }}>
                <FaRegClock />{' '}{new Date(task.deadline).toLocaleDateString()}
              </div>}
              {task.tags.length > 0 && <div>
                {task.tags.slice(0, 3).map(tag => <span className='tag-item' key={tag.id}>{tag.name}</span>)}
              </div>
              }
              {
                task.priority && <div className='task-item-priority'><BsExclamationDiamond /></div>
              }

            </div>
          </div>



          <div className='task-item-buttons-container'>
            {!task.completed && <button className='edit-button' onClick={() => setModal(true)}>
              <FaEdit />
            </button>}
            <button onClick={handleDelete} className="delete-button" >
              <FaTrashAlt />
            </button>
          </div>
        </div>

      </div>
      {modal && <TaskForm key={task.id} modal={modal}
        defaultTask={task} toggle={toggle} onUpdate={onUpdate} task={task} type="Edit" />}
    </>
  );
};

export default TaskItem;