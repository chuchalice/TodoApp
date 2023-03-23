import React from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoValue: '',
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
    const { todoValue } = this.state;

    onAdd(todoValue);
    this.setState({
      todoValue: '',
    });
  };

  render() {
    const { todoValue } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(e) => this.addNewTodoHandler(e)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            // autoFocus
            value={todoValue}
            onChange={(e) => this.inputValueHandler(e)}
          />
          <input type="submit" hidden />
        </form>
      </header>
    );
  }
}
NewTaskForm.defaultProps = {
  onAdd: (() => {}),
};
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;
