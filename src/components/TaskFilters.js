import React, { useState, useEffect } from 'react'
import tags from '../data/tags.json';
import Select from 'react-select';

const TaskFilters = ({ tasks, setSortedTasks }) => {
  const options = [{
    value: 'all',
    label: 'All'
  }, {
    value: 'completed',
    label: 'Completed'
  },]
  const [filters, setFilters] = useState({
    status: null,
    tags: []
  });
  const [sortOrder, setSortOrder] = useState({ value: 'desc', label: 'Desc' });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const sortTasksByStatus = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1
      } else if (!a.completed && b.completed) {
        return -1
      } else {
        return 0
      }
    })
  }

  const sortTasksByPriority = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.priority && !b.priority) {
        return -1
      } else if (!a.priority && b.priority) {
        return 1
      } else {
        return 0
      }
    })
  }
  const sortTasksByCreatedAt = (tasks) => {
    // sort based on sort order
    return tasks.sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      if (sortOrder.value === "asc") {

        return aDate - bDate;
      } else if (sortOrder.value === "desc") {
        return bDate - aDate;
      }
      return 0
    })
  }

  const sortTasks = (tasks) => {
    return sortTasksByStatus(sortTasksByPriority(sortTasksByCreatedAt(tasks)))
  }



  useEffect(() => {
    const filteredTasksWithStatus = tasks.filter(task => {
      if (filters.status?.value === 'completed') {
        return task.completed
      }
      return true
    })
    if (filters.tags.length > 0) {
      const selectTags = filters.tags.map(({ value }) => value);
      const filteredWithTags = filteredTasksWithStatus.filter(({ tags }) =>
        tags.length > 0);

      const filtered = filteredWithTags.filter(({ tags }) => {
        return tags.some(tag => selectTags.includes(tag.name));
      });
      setFilteredTasks(filtered);
      return;
    }
    setFilteredTasks(filteredTasksWithStatus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, tasks])

  useEffect(() => {
    const sorted = sortTasks(filteredTasks)
    setSortedTasks([...sorted])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTasks, sortOrder])

  return (
    <div className='status-filter'>
      <h4>Filters: </h4>
      <div>
        <label htmlFor="filter"> By Status:</label>
        <Select
          options={options}
          isClearable={true}
          onChange={(selectedOption) => setFilters(prev => ({ ...prev, status: selectedOption }))}
          value={filters.status}>

        </Select>
      </div>
      <div>
        <label htmlFor="filter"> By Tags:</label>
        <Select
          options={tags.map(tag => ({ value: tag.name, label: tag.name, ...tag }))}
          isMulti
          onChange={(selectedOption) => {
            setFilters(prev => ({ ...prev, tags: [...selectedOption] }))
          }}
          value={filters.tags}
        />
      </div>
      <div>
        <label htmlFor="filter">Sort By:</label>
        <Select
          options={[{ value: 'asc', label: 'Asc' }, { value: 'desc', label: 'Desc' }]}
          onChange={(selectedOption) => {
            setSortOrder(selectedOption)
          }}
          value={sortOrder}
        />
      </div>
    </div>
  )
}

export default TaskFilters