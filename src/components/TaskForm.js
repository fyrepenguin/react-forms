import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';
import { FcAddImage } from 'react-icons/fc';
import "react-datepicker/dist/react-datepicker.css";
import tags from '../data/tags.json';

const TaskForm = ({ modal, toggle, onCreate, task: taskData, defaultTask, type = "Create", onUpdate }) => {
  const [task, setTask] = useState({ ...defaultTask, id: uuidv4() });


  const handleChange = (e) => {
    const { name, value } = e.target;

      setTask(prev => ({ ...prev, [name]: value }))
  }
  const handlePriority = (e) => {
    const { checked } = e.target;
    setTask(prev => ({ ...prev, priority: checked }))
  }

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setTask(prev => ({ ...prev, image: URL.createObjectURL(img) }));;
    }
  };

  const handleSave = (e) => {
    e.preventDefault()
    type === "Create" ? onCreate(task) : onUpdate(task, task.id)
    toggle()

  }
  useEffect(() => {
    if (taskData) {
      setTask(taskData)
    }
  }, [taskData])

  return (
    <div>
      <div className={`modal ${modal ? 'open' : ''}`} id="modal">
        <div className="modal-content">
          <button onClick={toggle} className="modal-close button" title="Close Modal">X</button>
          <h3>{type} Task</h3>
          <div className="modal-area">
            <div className='modal-body'>
              <div className='modal-form'>
                <div className="form-group" >
                  <label htmlFor={`title-${task.id}`}>
                    Task
                  </label>
                  <input id={`title-${task.id}`} type="text" name="title" value={task.title} onChange={handleChange} />
                </div>
                <div className="form-group" >
                  <label htmlFor={`deadline-${task.id}`}>Deadline</label>
                  <DatePicker
                    id={`deadline-${task.id}`}
                    selected={task.deadline ? new Date(task.deadline) : null}
                    onChange={(date) => setTask(prev => ({ ...prev, deadline: date }))}
                    showTimeSelect
                    dateFormat="Pp"
                    todayButton="Today"
                    value={task.deadline ? new Date(task.deadline) : null}
                  />
                </div>
                <div className="form-group" >
                  <label htmlFor={`description-${task.id}`}>
                    Description
                  </label>
                  <textarea
                    id={`description-${task.id}`}
                    name="description" value={task.description} onChange={handleChange} />
                </div>
                <div className="form-group priority-input-container">
                  <label htmlFor={`priority-${task.id}`}>
                    <input type="checkbox" id={`priority-${task.id}`} name="priority" onChange={handlePriority} checked={task.priority} /> Priority
                  </label>
                </div>

                <div className='form-group'>
                  <label htmlFor={`tags-${task.id}`}>
                    Tags
                  </label>
                  <div>
                    <Select
                      id={`tags-${task.id}`}
                      options={tags.map(tag => ({ value: tag.name, label: tag.name, ...tag }))}
                      isMulti
                      onChange={(selectedOption) => setTask(prev => ({ ...prev, tags: selectedOption.map(({ id, name }) => ({ id, name })) }))}
                      value={task.tags.map(tag => ({ value: tag.name, label: tag.name, ...tag }))}
                    />
                  </div>


                </div>
                <div className="form-group" >
                  Image
                  <label htmlFor={`image-${task.id}`} className="image-input-label">
                    {task.image.length > 0 ? <img src={task.image} alt="" width="200" /> : <FcAddImage fontSize={50} />}
                  </label>
                  <input
                    id={`image-${task.id}`}
                    className='input-image'
                    name="image"
                    accept="image/*"
                    type="file"
                    onChange={onImageChange}
                  />
                </div>

              </div>
              <footer>
                <button className="button primary" onClick={handleSave}>{type === "Create" ? "Create" : "Update"}</button>
                <button className="button secondary" onClick={toggle}>Cancel</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;