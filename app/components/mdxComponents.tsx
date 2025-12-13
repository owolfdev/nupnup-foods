import Image from "next/image";
import React from "react";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-gray-900! text-4xl md:text-5xl font-black mb-8 md:mb-12 [&_strong]:text-gray-900!"
      style={{ color: "#111827" }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-gray-900! text-2xl md:text-3xl font-semibold mb-4 mt-8 [&_strong]:text-gray-900!"
      style={{ color: "#111827" }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-gray-900! text-xl font-semibold mb-2 mt-6 [&_strong]:text-gray-900!"
      style={{ color: "#111827" }}
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-gray-900! text-lg font-semibold mb-2 mt-4 [&_strong]:text-gray-900!"
      style={{ color: "#111827" }}
      {...props}
    />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="text-gray-900! text-base font-semibold mb-2 mt-4 [&_strong]:text-gray-900!"
      style={{ color: "#111827" }}
      {...props}
    />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="text-gray-900! text-sm font-semibold mb-2 mt-4 [&_strong]:text-gray-900!"
      style={{ color: "#111827" }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 mb-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-6" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt } = props;
    if (!src || typeof src !== "string") return null;
    return (
      <div className="my-8">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
        />
      </div>
    );
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6"
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table
        className="min-w-full border-collapse border border-gray-300"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-gray-200" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const { children, ...rest } = props;
    const hexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;

    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string" || typeof node === "number") {
        return String(node);
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      if (React.isValidElement(node)) {
        const childProps = node.props as {
          children?: React.ReactNode;
        };
        if (childProps?.children) {
          return extractText(childProps.children);
        }
      }
      return "";
    };

    const textContent = extractText(children);
    const hasHexCode = hexColorRegex.test(textContent);

    if (hasHexCode) {
      const hexCodes: string[] = [];
      let match;
      const regex = new RegExp(hexColorRegex);
      while ((match = regex.exec(textContent)) !== null) {
        hexCodes.push(match[0]);
      }

      return (
        <td className="border border-gray-300 px-4 py-3 text-gray-700" {...rest}>
          <div className="flex flex-wrap items-center gap-3">
            {hexCodes.map((hex, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border border-gray-300 shrink-0"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
                <span className="font-mono text-sm">{hex}</span>
              </div>
            ))}
          </div>
        </td>
      );
    }

    return (
      <td className="border border-gray-300 px-4 py-3 text-gray-700" {...rest}>
        {children}
      </td>
    );
  },
};
