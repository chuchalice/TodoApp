/* eslint-disable no-plusplus */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Footer from './footer';
import NewTaskForm from './new-task-form';
import TaskList from './task-list';

export default class ToDo extends React.Component {
  maxId = 100;

  constructor() {
    super();
    this.state = {
      todoData: [],
      filterSelected: 'all',
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (taskText) => {
    const newItem = this.createTodoItem(taskText);

    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };

  todoFilter = (status) => {
    this.setState({
      filterSelected: status,
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.done);
      return {
        todoData: newArr,
      };
    });
  };

  newEditItem = (id, value) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label: value };
      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newArr,
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      done: false,
      created: `${formatDistanceToNow(new Date())}`,
      editing: false,
    };
  }

  render() {
    const { todoData, filterSelected } = this.state;
    const doneCount = todoData.filter((el) => !el.done).length;
    let filteredArr = [];
    if (
      typeof filterSelected === 'string'
      && filterSelected.toLowerCase() === 'all'
    ) {
      filteredArr = todoData;
    } else if (filterSelected) {
      filteredArr = todoData.filter((el) => el.done);
    } else {
      filteredArr = todoData.filter((el) => !el.done);
    }
    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addItem} />
        <section className="main">
          <TaskList
            taskData={filteredArr}
            onDelete={this.deleteItem}
            onToggleDone={this.onToggleDone}
            // onEdit={this.onEdit}
            onAdd={this.addItem}
            newEditItem={this.newEditItem}
          />
          <Footer
            doneCount={doneCount}
            clearCompleted={this.clearCompleted}
            todoFilter={(status) => this.todoFilter(status)}
            filterSelected={filterSelected}
          />
        </section>
      </section>
    );
  }
}
