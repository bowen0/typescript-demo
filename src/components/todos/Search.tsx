import React from 'react';
import OptionItem from './OptionItem';
import { IToDo, IToDoItem } from './type';
import './tst.less';

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
    console.log('index: ', index)
    console.log('options: ', options)
    setState({
      ...state,
      options: [...options],
    });
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <i>{state.isOpen ? 'Closed' : 'Open'}</i>
        <input
          type="text"
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
      </div>
      {state.options.map((props, index) => (
        <OptionItem
          {...props}
          onChange={(item) => {
            handleOptionChange(index, item)
          }}
        />
      ))}
    </div>
  );
};
export default Todo;
