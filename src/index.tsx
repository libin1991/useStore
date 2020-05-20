import React, { useEffect } from "react";
import { render } from "react-dom";
import useStore, { createStore, useLocalStore } from "./store-src/index";

import "./styles.css";

const counterStore = createStore(
  {
    count: 0,
    num: 'ABCD'
  },
  {
    increment: (state) => ({ ...state, ...{ count: state.count + 1 } }),
    decrement: (state) => ({ ...state, ...{ count: state.count - 1 } }),
    increment2: (state, num) => ({ ...state, ...{ count: state.count + num } }),
    decrement2: (state, num) => ({ ...state, ...{ count: state.count - num } }),
    random: (state) => ({
      ...state, ...{
        count: Math.round(Math.random() * 10)
      }
    }),
    async incrementAsync(state, num) {
      const promise = new Promise((resolve) => setTimeout(resolve, 3000));
      await promise;
      return { ...state, ...{ count: state.count + 10 } };
    },
  }
);

const Counter = () => {
  const {
    state: { count, num },
    actions
  } = useStore(counterStore);

  return (
    <>
      <h1>Counter</h1>
      <h2>Count {count}-{num}</h2>
      <button onClick={() => actions.decrement()}>-</button>
      <button onClick={() => actions.increment()}>+</button>
    </>
  );
};

const LocalCounter = () => {
  const {
    state: { count },
    actions
  } = useLocalStore(counterStore);

  useEffect(() => {
    actions.random();
  }, []);

  return (
    <>
      <h1>Local Counter</h1>
      <h2>Count {count}</h2>
      <button onClick={() => actions.decrement()}>-</button>
      <button onClick={() => actions.increment()}>+</button>
    </>
  );
};


const LocalCounter2 = () => {
  const {
    state: { count },
    actions
  } = useLocalStore(counterStore);

  useEffect(() => {
    actions.random();
  }, []);

  return (
    <>
      <h1>Local Counter add num</h1>
      <h2>Count {count}</h2>
      <button onClick={() => actions.decrement2(3)}>-</button>
      <button onClick={() => actions.increment2(3)}>+</button>
      <button onClick={() => actions.incrementAsync(3)}>异步3s加10</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h1>useStore</h1>
      <h2>一个极简的hooks状态管理</h2>
      <Counter />
      <Counter />
      <LocalCounter />
      <LocalCounter2 />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
