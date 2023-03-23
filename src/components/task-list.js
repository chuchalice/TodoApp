import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';

function TaskList({
  onDelete, onToggleDone, taskData, onAdd, newEditItem,
}) {
  const elements = taskData.map((el) => (
    <Task
      newEditItem={newEditItem}
      key={el.id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...el}
      onDelete={() => onDelete(el.id)}
      onToggleDone={() => onToggleDone(el.id)}
        // onEdit={() => onEdit(id)}
      onAdd={onAdd}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onDelete: {},
  onToggleDone: {},
  taskData: [],
  onAdd: {},
  newEditItem: {},
};
TaskList.propTypes = {
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
  taskData: PropTypes.arrayOf(PropTypes.shape),
  onAdd: PropTypes.func,
  newEditItem: PropTypes.func,
};

export default TaskList;
