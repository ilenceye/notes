# 如何遍历 JavaScript 中的类数组对象

## 所谓的类数组对象

首先，它们跟数组长得很像：带有 `length` 属性、可以通过数字索引访问元素。

但它们并不是真正的数组，它们没有数组所具备的 `push`、`map` 等方法。

比如：

```js
const nodes = document.querySelectorAll("div"); // NodeList
```

## 遍历

一是使用循环。

比如，使用 `for...of` 循环：

```ts
const newImageUrls: string[] = [];

for (const file of filelist) {
  const url = URL.createObjectURL(file);
  newImageUrls.push(url);
}
```

二是将类数组对象转换成数组。

1、使用展开运算符

```ts
const newImageUrls = [...filelist].map(URL.createObjectURL);
```

2、使用 `Array.from()`

```ts
const newImageUrls = Array.from(filelist, URL.createObjectURL);
```
