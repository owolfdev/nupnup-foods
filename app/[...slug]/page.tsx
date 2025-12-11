import { promises as fs } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import AuthGuard from "../components/AuthGuard";
import remarkGfm from "remark-gfm";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getMDXContent(slug: string[]) {
  const filePath = join(process.cwd(), "content", ...slug) + ".mdx";

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch {
    return null;
  }
}

export default async function MDXPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getMDXContent(slug);

  if (!content) {
    notFound();
  }

  // Get valid keys from environment variable
  const validKeysEnv = process.env.AUTH_KEYS || "";
  const validKeys = validKeysEnv
    .split(",")
    .map((key) => key.trim())
    .filter((key) => key.length > 0);

  return (
    <AuthGuard validKeys={validKeys}>
      <div className="w-full px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-lg space-y-6 text-gray-700 leading-relaxed prose-headings:!text-gray-900">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{
              h1: (props) => (
                <h1
                  className="text-gray-900! text-4xl md:text-5xl font-black mb-8 md:mb-12 [&_strong]:text-gray-900!"
                  style={{ color: "#111827" }}
                  {...props}
                />
              ),
              h2: (props) => (
                <h2
                  className="text-gray-900! text-2xl md:text-3xl font-semibold mb-4 mt-8 [&_strong]:text-gray-900!"
                  style={{ color: "#111827" }}
                  {...props}
                />
              ),
              h3: (props) => (
                <h3
                  className="text-gray-900! text-xl font-semibold mb-2 mt-6 [&_strong]:text-gray-900!"
                  style={{ color: "#111827" }}
                  {...props}
                />
              ),
              h4: (props) => (
                <h4
                  className="text-gray-900! text-lg font-semibold mb-2 mt-4 [&_strong]:text-gray-900!"
                  style={{ color: "#111827" }}
                  {...props}
                />
              ),
              h5: (props) => (
                <h5
                  className="text-gray-900! text-base font-semibold mb-2 mt-4 [&_strong]:text-gray-900!"
                  style={{ color: "#111827" }}
                  {...props}
                />
              ),
              h6: (props) => (
                <h6
                  className="text-gray-900! text-sm font-semibold mb-2 mt-4 [&_strong]:text-gray-900!"
                  style={{ color: "#111827" }}
                  {...props}
                />
              ),
              p: (props) => <p className="mb-6" {...props} />,
              ul: (props) => (
                <ul
                  className="list-disc list-inside space-y-2 mb-6"
                  {...props}
                />
              ),
              ol: (props) => (
                <ol
                  className="list-decimal list-inside space-y-2 mb-6"
                  {...props}
                />
              ),
              li: (props) => <li {...props} />,
              strong: (props) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              a: (props) => (
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
              code: (props) => (
                <code
                  className="bg-gray-100 px-1.5 py-0.5 rounded text-sm"
                  {...props}
                />
              ),
              pre: (props) => (
                <pre
                  className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6"
                  {...props}
                />
              ),
              table: (props) => (
                <div className="overflow-x-auto my-8">
                  <table
                    className="min-w-full border-collapse border border-gray-300"
                    {...props}
                  />
                </div>
              ),
              thead: (props) => <thead className="bg-gray-50" {...props} />,
              tbody: (props) => <tbody {...props} />,
              tr: (props) => (
                <tr className="border-b border-gray-200" {...props} />
              ),
              th: (props) => (
                <th
                  className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900"
                  {...props}
                />
              ),
              td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => {
                const { children, ...rest } = props;
                const hexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;

                // Recursively extract all text content from children
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
                  // Find all hex codes in the text
                  const hexCodes: string[] = [];
                  let match;
                  const regex = new RegExp(hexColorRegex);
                  while ((match = regex.exec(textContent)) !== null) {
                    hexCodes.push(match[0]);
                  }

                  return (
                    <td
                      className="border border-gray-300 px-4 py-3 text-gray-700"
                      {...rest}
                    >
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
                  <td
                    className="border border-gray-300 px-4 py-3 text-gray-700"
                    {...rest}
                  >
                    {children}
                  </td>
                );
              },
            }}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
