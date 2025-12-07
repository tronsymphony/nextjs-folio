import React from "react";

// Helper function to render rich text
const renderRichText = (node) => {
  if (!node || !node.children) return null;

  return node.children.map((child, index) => {
    switch (child.type) {
      case "text":
        return (
          <span
            key={index}
            style={{
              fontWeight: child.format === 1 ? "bold" : "normal",
              fontStyle: child.format === 2 ? "italic" : "normal",
              textDecoration: child.format === 4 ? "underline" : "none",
            }}
          >
            {child.text}
          </span>
        );
      case "linebreak":
        return <br key={index} />;
      case "link":
        return (
          <a
            key={index}
            href={child.fields.url}
            target={child.fields.newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {renderRichText(child)}
          </a>
        );
      case "paragraph":
        return (
          <p key={index} style={{ margin: "1em 0" }}>
            {renderRichText(child)}
          </p>
        );
      case "wysiwyg":
        return (
          <div
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      case "html-embed":
        return (
          <div
            dangerouslySetInnerHTML={{ __html: block.htmlCode }}
          />
        );
      case "image":
        return (
          <figure>
            <img
              src={block.image.url}
              alt={block.alt || ""}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );
      default:
        return null;
    }
  });
};


export default renderRichText;