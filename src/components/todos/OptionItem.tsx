import React from 'react';
import c from 'classnames';
import { IToDoItem } from './type';

const OptionItem = (props: IToDoItem) => {
  const { value, status, onChange } = props;
  const iconCls = c('icon', status);
  const optionCls = c('option-item', {
    'option-item-complete': status === 'complete',
    'option-item-active': status === 'active',
  });
  const [editable, setEditable] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  React.useEffect(() => {
    // 第一次，onclick 优先于 setState执行
    document.onclick = (e) => {
      const x = e.pageX;
      const y = e.pageY;
      console.log('e: ', e);
      console.log('mousePosition: ', mousePosition);
      // 判断是否点击的是 option-item-text 节点
      let clickThisdom =
        x >= mousePosition.x &&
        x - mousePosition.x <= mousePosition.width &&
        y >= mousePosition.y &&
        y - mousePosition.y < mousePosition.height;
      if (!clickThisdom) {
        setEditable(false);
      }
    };
  }, [editable, mousePosition]);

  const refObj = React.createRef<HTMLDivElement>();

  const showInput = editable && status === 'active';

  const optionTextCls = c('option-item-text', {
    'input': showInput
  })
  return (
    <div
      className={optionCls}
      onDoubleClick={() => {
        const mousePositions = {
          x: refObj.current!.getBoundingClientRect().x,
          y: refObj.current!.getBoundingClientRect().y,
          width: refObj.current!.getBoundingClientRect().width,
          height: refObj.current!.getBoundingClientRect().height,
        };
        setEditable(true);
        setMousePosition({
          ...mousePosition,
          ...mousePositions,
        });
      }}
    >
      <button className="prev-checkbox-btn">
        <span
          className={iconCls}
          onClick={() => {
            let item = { ...props };
            item.status = status === 'complete' ? 'active' : 'complete';
            if (onChange) {
              console.log('item: ', item);
              onChange(item);
            }
          }}
        />
      </button>
      <div className={optionTextCls} ref={refObj}>
        {showInput ? (
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
      <button className="next-clear-btn">
        <span className="next-clear-icon" />
      </button>
    </div>
  );
};

export default OptionItem;
