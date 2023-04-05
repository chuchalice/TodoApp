/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import React from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoValue: '',
      min: 0,
      sec: 0,
    };
  }

  inputValueHandler = (e) => {
    this.setState({
      todoValue: e.target.value,
    });
  };

  addNewTodoHandler = (e) => {
    e.preventDefault();
    const { onAdd } = this.props;
    const { todoValue, min, sec } = this.state;
    const minValue = document.querySelector('.min');
    const secValue = document.querySelector('.sec');
    minValue.value = '';
    secValue.value = '';
    onAdd(todoValue, min, sec);
    this.setState({
      todoValue: '',
    });
  };

  secValueHandler = (e) => {
    this.setState({ sec: +e.target.value });
  };

  minValueHandler = (e) => {
    this.setState({ min: +e.target.value });
  };

  render() {
    const { todoValue } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(e) => this.addNewTodoHandler(e)}
          className="new-todo-form"
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            //
            value={todoValue}
            onChange={(e) => this.inputValueHandler(e)}
          />
          <input type="submit" hidden />
          <input type="number" onChange={(e) => this.minValueHandler(e)} className="new-todo-form__timer min" placeholder="Min" />
          <input type="number" onChange={(e) => this.secValueHandler(e)} className="new-todo-form__timer sec" placeholder="Sec" />
        </form>
      </header>
    );
  }
}
NewTaskForm.defaultProps = {
  onAdd: () => {},
};
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;
