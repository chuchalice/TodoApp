import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prefer-stateless-function
export default class TasksFilter extends React.Component {
  render() {
    const { todoFilter, filterSelected } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filterSelected === 'all' ? 'selected' : null}
            onClick={() => todoFilter('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={!filterSelected ? 'selected' : null}
            onClick={() => todoFilter(false)}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={
              filterSelected && filterSelected !== 'all' ? 'selected' : null
            }
            onClick={() => todoFilter(true)}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
TasksFilter.defaultProps = {
  filterSelected: false,
  todoFilter: {},
};
TasksFilter.propTypes = {
  filterSelected: PropTypes.oneOf(['all', true, false]),
  todoFilter: PropTypes.func,
};
