/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor(props) {
    super(props);
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
      label, onDelete, onToggleDone, done, created, stopTimer, startTimer, time,
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
            <input className="toggle" type="checkbox" onClick={onToggleDone} />
            <label htmlFor="first-name">
              <span className="description" onClick={onToggleDone}>
                {label}
              </span>
              <span className="timer_buttons">
                <button
                  onClick={startTimer}
                  aria-label="button play"
                  className="icon icon-play"
                  type="button"
                />
                <button
                  onClick={stopTimer}
                  aria-label="button pause"
                  className="icon icon-pause"
                  type="button"
                />
              </span>
              <span className="timer__text">{`${Math.floor(time / 60).toString().padStart(2, '0')}:${Math.floor(time % 60).toString().padStart(2, '0')}`}</span>
              <span className="created">{created}</span>
            </label>
            <button
              type="button"
              aria-label="Mute volume"
              className="icon icon-edit"
              onClick={this.onEdit}
            />
            <button
              type="button"
              aria-label="Mute volume"
              className="icon icon-destroy"
              onClick={onDelete}
            />
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
  startTimer: {},
  stopTimer: {},
  time: 0,
};
Task.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func,
  label: PropTypes.string,
  done: PropTypes.bool,
  onToggleDone: PropTypes.func,
  created: PropTypes.string,
  newEditItem: PropTypes.func,
  time: PropTypes.number,
  stopTimer: PropTypes.func,
  startTimer: PropTypes.func,
};
export default Task;
