# Tailwind CSS 的 Data attribute variants

## 一

在 Tailwind CSS 中，[Data attribute variants](https://tailwindcss.com/blog/tailwindcss-v3-2#data-attribute-variants) 让我们可以**根据 HTML 元素的 data attribute 属性来应用样式**。

比如，你可以使用一个按钮的 `data-state` 属性来决定按钮的样式：

```html
<button data-state="open" class="data-[state=open]:bg-gray-700">
  dropdown icon
</button>
```

在这个例子中，`data-[state=open]:bg-gray-700` 表示，当 `data-state` 属性的值是 `open` 时，按钮将拥有 `bg-gray-700` 这一背景颜色样式。

## 二

我们可以利用这点，**实现基于 HTML 元素的 data attribute 属性的动态样式**。

举个例子，我们有一个下拉菜单，当它关闭时，按钮的背景颜色为 `bg-gray-500`，当它打开时，按钮的背景颜色为 `bg-gray-700`：

```html {4-5}
<!-- Dropdown Button -->
<button
  id="dropdown-button"
  data-state="closed"
  class="data-[state=open]:bg-gray-700 data-[state=closed]:bg-gray-500"
>
  dropdown icon
</button>

<!-- Dropdown Menu -->
<div id="dropdown-menu" class="hidden">
  <p>Dropdown content goes here.</p>
</div>

<script>
  const button = document.getElementById("dropdown-button");
  const dropdown = document.getElementById("dropdown-menu");

  button.addEventListener("click", () => {
    // 切换按钮的 data-state 属性
    const state =
      button.getAttribute("data-state") === "open" ? "closed" : "open";
    button.setAttribute("data-state", state);

    // 显示或隐藏下拉菜单
    dropdown.classList.toggle("hidden");
  });
</script>
```

这里，默认情况下，按钮的 `data-state` 是 `closed`，背景色为 `bg-gray-500`。当用户单击按钮后，按钮的 `data-state` 变为 `open`，背景色也会随之变成 `bg-gray-700`。
