import React from 'react';
import c from 'classnames';
import OptionItem from './OptionItem';
import { IToDo, IToDoItem } from './type';
import './tst.scss';

let count = 100;
const Todo = () => {
  const [state, setState] = React.useState({
    value: '',
    isOpen: false,
    options: [],
  } as IToDo);

  const handleOptionChange = (index: number, item: IToDoItem) => {
    const options = state.options;
    options[index] = item;
    setState({
      ...state,
      options: [...options],
    });
  };
  const arrowCls = c('prev-arrow-icon', {
    Open: state.isOpen,
    Closed: !state.isOpen,
  });
  return (
    <div className="todo-container">
      <div className="todo-header">
        <button className="prev-arrow-btn">
          <span className={arrowCls} />
        </button>
        <input
          type="text"
          className="todo-header-input"
          placeholder="What needs to be done?"
          value={state.value}
          onChange={(e) => {
            let value = e.target.value;
            setState({
              ...state,
              value: value,
            });
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              // enter
              const newOptions = state.options;
              newOptions.push({
                value: state.value,
                key: count++,
                status: 'active',
              });
              setState({
                ...state,
                value: '',
                options: newOptions,
              });
            }
          }}
        />
        <button className="next-clear-btn">
          <span className="next-clear-icon" />
        </button>
      </div>
      <div className="options-container">
        {state.options.map((props, index) => (
          <OptionItem
            {...props}
            onChange={(item) => {
              handleOptionChange(index, item);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default Todo;
