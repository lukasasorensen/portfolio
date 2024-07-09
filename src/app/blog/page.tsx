"use client";
import { ProjectListing } from "@/components/projects/ProjectListing";
import { useThemeContext } from "@/providers/ThemeProvider";
import { IProject } from "@/example-data/Projects";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Articles, { IArticle } from "@/example-data/Articles";

export default function Blog() {
  const { twColorClasses } = useThemeContext();
  const router = useRouter();

  const getArticle = (article: IArticle): IProject => {
    return {
      id: article.id,
      title: article.title,
      createdDate: article.createdDate,
      description: article.articleText,
      imageSrc: article.imageSrc,
      shortDescription: article.articleDescription ?? "",
    };
  };

  return (
    <main className={`flex min-h-screen flex-col items-center ${twColorClasses.BG_PRIMARY} px-8 py-14 md:px-24`}>
      <h1 className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>Blog</h1>
      <div className="max-w-screen-lg space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          {Articles.map((article) => (
            <ProjectListing
              key={"article-listing-" + article.id}
              onClick={() => router.push(`/blog/${article.id}`)}
              project={getArticle(article)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
