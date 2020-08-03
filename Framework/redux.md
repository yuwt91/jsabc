

### 导入 Redux
从 redux 中只需要导入一个 createStore 函数
```js
const { createStore } = Redux; // 前提，已在 html 中导入 UMG build Redux
// 相当于 var createStore = Redux.createStore;
// 相当于 import { createStore } from 'redux'
```

### store 的 3 个常用方法
导入 createStore 后，需要创建一个 store，createStore 的参数是一个叫 reducer 的函数。
下面定义一个简单的计数用 reducer 函数，并用它创建一个 store
```js
// 定义一个简单的计数用 reducer 函数
// reducer 函数的要求：参数是 state 和 action，返回 state
// state 和 action 的要求：js 对象，用户定义，action 中必须包含 type 属性
const counter = (state = 0, action) => {
	if (action.type === 'increment') {
		return state + 1;
	} else if (action.type === 'decrement') {
		return state - 1;
	} else return state;
};

// 创建 store 
const store = createStore(reducer);
```
store 自带 3 个 常用方法：
getStore：获取当前 state 
dispatch：用于更改 state，参数是一个叫做 action 的对象，必须包含 type 属性，属性的值是用户定义的。
subscribe：用于渲染，参数是一个回调函数。每当一个 action 被 dispatch，自动调用回调函数。参数放用于渲染的回调函数。

这三个方法的实现如下：
```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

