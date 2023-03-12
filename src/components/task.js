import React from "react";

class Task extends React.Component {
  state = {
    done: false,
  };

  onLabelClick = () => {
    this.setState({
      done: true,
    });
  };

  render() {
    const { done } = this.state;
    let classNames = "";
    if (done) {
      classNames += "completed";
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onLabelClick}>
              task
            </span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}
export default Task;
