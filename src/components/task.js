/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      editing: false,
    };
  }

  inputValueHandler = (e) => {
    this.setState({ value: e.target.value });
  };

  onEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  addEditedItem = (e) => {
    e.preventDefault();
    const { id } = this.props;
    const { value, editing } = this.state;
    const { newEditItem } = this.props;
    newEditItem(id, value);
    this.setState({ value: '', editing: !editing });
  };

  render() {
    const {
      label, onDelete, onToggleDone, done, created,
    } = this.props;
    const { editing } = this.state;
    let classNames = '';

    if (done) {
      classNames += 'completed';
    }
    return (
      <li className={classNames}>
        {editing ? (
          <div className="view">
            <form onSubmit={(e) => this.addEditedItem(e)}>
              <input onChange={(e) => this.inputValueHandler(e)} />
              <input type="submit" />
            </form>
          </div>
        ) : (
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label htmlFor="first-name">
              <span className="description" onClick={onToggleDone}>
                {' '}
                {label}
              </span>
              <span className="created">{created}</span>
            </label>
            <button type="button" aria-label="Mute volume" className="icon icon-edit" onClick={this.onEdit} />
            <button type="button" aria-label="Mute volume" className="icon icon-destroy" onClick={onDelete} />
          </div>
        )}
      </li>
    );
  }
}
Task.defaultProps = {
  onDelete: {},
  created: '',
  onToggleDone: {},
  newEditItem: {},
  label: '',
  done: false,
  id: 0,
};
Task.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func,
  label: PropTypes.string,
  done: PropTypes.bool,
  onToggleDone: PropTypes.func,
  created: PropTypes.string,
  newEditItem: PropTypes.func,
};
export default Task;
