// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OutputData, BlockToolData } from "@editorjs/editorjs";

export function convertToHtml(data: OutputData): string {
  return data.blocks
    .map((block) => {
      switch (block.type) {
        case "header":
          return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        case "paragraph":
          return `<p>${block.data.text}</p>`;
        case "list":
          const listItems = block.data.items
            .map((item: string) => `<li>${item}</li>`)
            .join("");
          return block.data.style === "ordered"
            ? `<ol>${listItems}</ol>`
            : `<ul>${listItems}</ul>`;
        case "checklist":
          return `<ul class="checklist">${block.data.items
            .map(
              (item: { text: string; checked: boolean }) =>
                `<li class="${item.checked ? "checked" : ""}">${item.text}</li>`
            )
            .join("")}</ul>`;
        case "quote":
          return `<blockquote>${block.data.text}${
            block.data.caption ? `<footer>${block.data.caption}</footer>` : ""
          }</blockquote>`;
        case "code":
          return `<pre><code>${block.data.code}</code></pre>`;
        case "image":
          return `<figure><img src="${block.data.file.url}" alt="${block.data.caption}" /><figcaption>${block.data.caption}</figcaption></figure>`;
        default:
          return "";
      }
    })
    .join("");
}
