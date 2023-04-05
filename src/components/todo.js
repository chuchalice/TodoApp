/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React from 'react';
// import PropTypes from 'prop-types';
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
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newData = todoData.map((el) => {
          if (!el.pause && el.time > 0) {
            el.time -= 1;
          }
          return el;
        });
        return newData;
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (taskText, min, sec) => {
    const newItem = this.createTodoItem(taskText, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData];
      return {
        todoData: newArr,
      };
    });
  };

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, pause: false };
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

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, pause: true };
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

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done, pause: !oldItem.pause };

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

  getMinSec = (min, sec) => {
    this.setState({ min, sec });
  };

  createTodoItem(label, min, sec) {
    return {
      pause: false,
      time: min * 60 + sec,
      label,
      id: this.maxId++,
      done: false,
      created: `${formatDistanceToNow(new Date())}`,
      editing: false,
    };
  }

  render() {
    const {
      todoData, filterSelected, min, sec,
    } = this.state;
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
        <NewTaskForm onAdd={this.addItem} getMinSec={this.getMinSec} />
        <section className="main">
          <TaskList
            min={min}
            sec={sec}
            getMinsec={this.getMinSec}
            taskData={filteredArr}
            onDelete={this.deleteItem}
            onToggleDone={this.onToggleDone}
            // onEdit={this.onEdit}
            onAdd={this.addItem}
            newEditItem={this.newEditItem}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
// ToDo.defaultProps = {
//   min: 0,
// };
// ToDo.propTypes = {
//   min: PropTypes.number,
// }
