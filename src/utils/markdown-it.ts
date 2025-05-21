import MarkdownIt from "markdown-it";
import markdownItShiki from "@shikijs/markdown-it";
import { transformerMetaHighlight } from "@shikijs/transformers";

// Markdown to HTML

const md = MarkdownIt({
  linkify: true,
});

// Link - open link in a new tab

const defaultLinkOpenRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  // Add a new `target` attribute, or replace the value of the existing one.
  tokens[idx].attrSet("target", "_blank");

  // Pass the token to the default renderer.
  return defaultLinkOpenRender(tokens, idx, options, env, self);
};

// Fence

const defaultFenceRender = md.renderer.rules.fence;

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const info = token.info; // "info": "html {2-3}"
  let language = "";
  let filename = ""; // f:index.html -> index.html

  if (info) {
    const arr = info.split(/(\s+)/g);
    language = arr[0];

    for (const str of arr) {
      if (str.startsWith("f:")) {
        filename = str.slice(2);
        break;
      }
    }
  }

  const defaultHTML = defaultFenceRender?.(tokens, idx, options, env, self);

  const filenameHTML = `<span class="code-block__filename">${filename}</span>`;
  const langHTML = `<span class="lang">${language}</span>`;

  return `
    <div class="code-block__wrapper language-${language}">
      <div class="code-block__header">
        ${filename ? filenameHTML : langHTML}
      </div>
      ${defaultHTML}
    </div>`;
};

//

md.use(
  await markdownItShiki({
    theme: "dark-plus",
    langs: [
      "bash",
      "json",
      "yaml",
      "html",
      "css",
      "javascript",
      "jsx",
      "tsx",
      "astro",
      "scss",
    ],
    // defaultLanguage: "text",
    // @ts-ignore
    fallbackLanguage: "txt",
    // @ts-ignore
    transformers: [transformerMetaHighlight()],
  })
);

export default md;
