import React from 'react';

const Obj = {
  a: 1,
}

type OperationList = {
  typeof: typeof Obj;
  keyof: keyof typeof Obj;
  b: string
}

const Example = () => {
  return <div>operation</div>
}