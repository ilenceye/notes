# Upgrading Tailwind CSS config from v3 to v4

Tailwind CSS 升级到 v4 后，配置方式发生了显著变化。本文主要记录自己常用的几个配置的迁移方案，包括：颜色 (color)、边框默认颜色 (border)、`.container` 工具类。

## 颜色 (color)

source: https://tailwindcss.com/docs/theme

一、v3

```css
:root {
  --primary: #ccc;
  --secondary: #aaa;
}
```

```js f:tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
};
```

二、v4

```css
:root {
  --primary: #ccc;
  --secondary: #aaa;
}

@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
}
```

## 边框默认颜色 (border)

source: https://tailwindcss.com/docs/upgrade-guide#default-border-color

一、v3

```css
:root {
  --border: 240 5.9% 90%;
}
```

```js f:tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
    },
  },
};
```

二、v4

```css
:root {
  --border: hsl(240 5.9% 90%);
  --border-hover: hsl(240 5.9% 86%);
}

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--border, currentColor);
  }
}
```

## `.container`

source:
https://tailwindcss.com/docs/upgrade-guide#container-configuration
https://github.com/tailwindlabs/tailwindcss/discussions/14801

一、v3

```js f:tailwind.config.mjs
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: defaultTheme.screens.sm,
        md: defaultTheme.screens.md,
      },
    },
  },
};
```

二、v4

方案一：

```css
@source not inline("container");

@layer utilities {
  .container {
    width: 100%;
    max-width: 684px;
    margin-inline: auto;
    padding-inline: 1rem;
  }
}
```

方案二：

```css
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;

  @variant sm {
    max-width: 684px;
  }

  @variant md {
    max-width: 684px;
  }
}
```
