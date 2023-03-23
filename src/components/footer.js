import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './tasks-filter';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      doneCount, clearCompleted, todoFilter, filterSelected,
    } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          {doneCount}
          {' '}
          items left
        </span>
        <TasksFilter todoFilter={todoFilter} filterSelected={filterSelected} />
        <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
Footer.defaultProps = {
  doneCount: 0,
  clearCompleted: {},
  todoFilter: {},
  filterSelected: false,
};
Footer.propTypes = {
  filterSelected: PropTypes.oneOf(['all', true, false]),
  doneCount: PropTypes.number,
  clearCompleted: PropTypes.func,
  todoFilter: PropTypes.func,

};

export default Footer;
