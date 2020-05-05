import React, { Component } from 'react'

type sdd = { 
  foo: number;
  bar: number;
  
}
export const Example1 = () => {
  const [state, setState] = React.useState({
    foo: 1,
    bar: 2
  })
  // 可以不用声明 state的类型， 直接使用 typeof 
  const partialStateUpdate = (obj: Partial<typeof state>) => setState({
    ...state, ...obj
  });
  return <div> partial </div>
}
export default class PartialExample extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
