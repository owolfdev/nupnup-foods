import { promises as fs } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import AuthGuard from "@/app/components/AuthGuard";
import { mdxComponents } from "@/app/components/mdxComponents";
import { getAuthKeys } from "@/lib/authKeys";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

async function getMDXContent(slug: string[]) {
  const resolvedSlug = slug.length ? slug : ["index"];
  const filePath =
    join(process.cwd(), "content", "admin", ...resolvedSlug) + ".mdx";

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch {
    return null;
  }
}

export default async function AdminPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const content = await getMDXContent(slug);

  if (!content) {
    notFound();
  }

  const { adminKeys } = getAuthKeys();

  return (
    <AuthGuard partnerKeys={[]} adminKeys={adminKeys} allowedRoles={["admin"]}>
      <div className="w-full px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-lg space-y-6 text-gray-700 leading-relaxed prose-headings:!text-gray-900">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={mdxComponents}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
