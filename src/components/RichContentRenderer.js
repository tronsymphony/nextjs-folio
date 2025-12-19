import React from "react";
import Image from "next/image";

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
            key={index}
            dangerouslySetInnerHTML={{ __html: child.fields.content }}
          />
        );
      case "html-embed":
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: child.fields.htmlCode }}
          />
        );
      case "image":
        return (
          <figure className="relative w-full aspect-video my-8">
            <Image
              src={child.fields.image.url}
              alt={child.fields.alt || ""}
              fill
              className="object-cover rounded-xl"
            />
            {child.fields.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{child.fields.caption}</figcaption>}
          </figure>
        );
      default:
        return null;
    }
  });
};


export default renderRichText;