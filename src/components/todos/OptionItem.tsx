import React from 'react';
import c from 'classnames';
import { IToDoItem } from './type';

const OptionItem = (props: IToDoItem) => {
  
  const [inputPosition, setInputPosition] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [mousePosition, setMousePosition] = React.useState({
    left: 0,
    top: 0,
  });
  React.useEffect(() => {
    // 第一次，onclick 优先于 setState执行
    document.onclick = (e) => {
      const left = e.offsetX;
      const top = e.offsetY;
      setMousePosition({ left, top });
    };
  }, []);
  const refObj = React.createRef<HTMLDivElement>();
  const { value, status, onChange, onDelete } = props;
  const iconCls = c('icon', status);
  const optionCls = c('option-item', {
    'option-item-complete': status === 'complete',
    'option-item-active': status === 'active',
  });

  const editable =
    status === 'active' &&
    inputPosition.left > 0 &&
    inputPosition.top > 0 &&
    mousePosition.left > inputPosition.left &&
    inputPosition.left + inputPosition.width > mousePosition.left &&
    mousePosition.top > inputPosition.top &&
    inputPosition.top + inputPosition.height > mousePosition.top;

  const optionTextCls = c('option-item-text', {
    editable: editable,
  });
  return (
    <div className={optionCls}>
      <button
        className="prev-checkbox-btn"
        onClick={() => {
          let item = { ...props };
          item.status = status === 'complete' ? 'active' : 'complete';
          if (onChange) {
            onChange(item);
          }
        }}
      >
        <span className={iconCls} />
      </button>
      <div
        className={optionTextCls}
        ref={refObj}
        onDoubleClick={(e) => {
          const inputPositions = {
            x: refObj.current!.getBoundingClientRect().x,
            y: refObj.current!.getBoundingClientRect().y,
            width: refObj.current!.getBoundingClientRect().width,
            height: refObj.current!.getBoundingClientRect().height,
          };
          setInputPosition({
            ...inputPosition,
            ...inputPositions,
          });
        }}
      >
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => {
              let val = e.target.value;
              let item = { ...props, value: val };
              if (onChange) {
                onChange(item);
              }
            }}
          />
        ) : (
          props.value
        )}
      </div>
      <button
        className="next-clear-btn"
        onClick={() => {
          if (typeof onDelete === 'function') {
            onDelete();
          }
        }}
      >
        <span className="next-clear-icon" />
      </button>
    </div>
  );
};

export default OptionItem;
