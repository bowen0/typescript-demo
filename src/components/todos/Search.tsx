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

  const [filterState, setFilter] = React.useState({
    clearAll: false,
    filterStatus: '', // complete or active or ''
  });

  const handleOptionChange = (index: number, item: IToDoItem) => {
    const options = state.options;
    options[index] = item;
    setState({
      ...state,
      options: [...options],
    });
  };
  const handleOnDelete = (index: number) => {
    const options = [...state.options];
    options.splice(index, 1);
    const newOptions = options.reduce((arr: Array<IToDoItem>, current) => {
      arr.push(current);
      return arr;
    }, []);
    setState({
      ...state,
      options: newOptions,
    });
  };
  console.log('state.options: ', state.options);
  const arrowCls = c('prev-arrow-icon', {
    Open: state.isOpen,
    Closed: !state.isOpen,
  });

  const filterOptions = state.options
    .filter(item => {
      if (filterState.clearAll) {
        return false;
      }
      if (filterState.filterStatus) {
        return item.status === filterState.filterStatus
      }
      return true;
    })
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
        {filterOptions.map((props, index) => (
          <OptionItem
            {...props}
            key={index}
            onChange={(item) => {
              handleOptionChange(index, item);
            }}
            onDelete={() => {
              handleOnDelete(index);
            }}
          />
        ))}
      </div>
      <div style={{ padding: 8 }}>
        <button
          onClick={() => {
            setFilter({
              ...filterState,
              filterStatus:
                filterState.filterStatus === 'complete' ? '' : 'complete',
            });
          }}
        >
          show complete
        </button>
        <button
          style={{ margin: 8 }}
          onClick={() => {
            setFilter({
              ...filterState,
              filterStatus:
                filterState.filterStatus === 'active' ? '' : 'active',
            });
          }}
        >
          show active
        </button>
        <button
          onClick={() => {
            setFilter({
              ...filterState,
              clearAll: !filterState.clearAll,
            });
          }}
        >
          clear all
        </button>
      </div>
    </div>
  );
};
export default Todo;
