# React useImperativeHandle hook

## HOW

React 的 `useImperativeHandle` hook 让我们可以**从子组件里暴露方法或属性给父组件**。

举个例子：

一、子组件

```js {1}
function Child({ ref }) {
  return <>...</>;
}
```

首先你的 Child 组件需要接收一个 `ref` prop。

```js {1, 4-10}
import { useImperativeHandle } from "react";

function Child({ ref }) {
  useImperativeHandle(
    ref,
    () => {
      return {
        log() {
          console.log("Logged in Child component.");
        },
      };
    },
    []
  );

  return <>...</>;
}
```

然后你需要调用 `useImperativeHandle` hook：

1. 传入 `ref` prop。
2. 传入一个函数，在函数里返回一个对象，对象的属性或方法就是你要暴露给父组件的。
3. 确定依赖项。

二、父组件

```jsx {1, 4, 8}
import { useRef } from "react";

function Parent() {
  const childRef = useRef(null);

  return (
    <>
      <Child ref={childRef} />
    </>
  );
}
```

接着我们转到父组件，通过 `useRef` hook 声明一个 ref，并传给 `Child` 组件的 `ref` prop。

```jsx {9-11}
import { useRef } from "react";

function Parent() {
  const childRef = useRef(null);

  return (
    <>
      <button
        onClick={() => {
          childRef.current?.log();
        }}
      >
        click
      </button>
      <Child ref={childRef} />
    </>
  );
}
```

最后，在按钮的点击事件处理程序里通过 `childRef.current` 拿到 `Child` 组件的 `log` 方法并调用。

## 与 useRef hook 的关系

```tsx
function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        focus the input
      </button>
    </>
  );
}
```

你不觉得这两个的用法很像吗？

区别在于：

useRef 的话是通过 ref 访问 DOM node，然后调用 DOM node 的 native DOM 方法。比如例子中的 focus 方法来自 input 元素。

useImperativeHandle 的话是通过 ref 访问 Component，然后调用 Component 暴露的方法。比如例子中的 log 方法来在 Child 组件。

## TS

```tsx
import { useImperativeHandle, useRef } from "react";

function Parent() {
  const childRef = useRef<{ log: () => void }>(null);

  return (
    <>
      <button
        onClick={() => {
          childRef.current?.log();
        }}
      >
        click
      </button>
      <Child ref={childRef} />
    </>
  );
}

function Child({ ref }: { ref: React.Ref<{ log: () => void }> }) {
  useImperativeHandle(
    ref,
    () => {
      return {
        log() {
          console.log("Log in Child.");
        },
      };
    },
    []
  );

  return <div>Child</div>;
}
```
