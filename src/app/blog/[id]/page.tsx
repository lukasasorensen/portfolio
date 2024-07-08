"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useState } from "react";
import Carousel from "@/components/common/Carousel";
import Articles, { IArticle } from "@/example-data/Articles";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogArticle({ params }: { params: { id: string } }) {
  const { twColorClasses } = useThemeContext();
  const [article, setArticle] = useState<IArticle | null>(null);

  const getArticleById = async (id: string): Promise<IArticle | undefined> => {
    return Object.values(Articles).find((a) => a.id === id);
  };

  const init = async () => {
    const getProject = await getArticleById(params.id);
    if (!getProject) return;
    setArticle(getProject);
  };

  init();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}>
      <a href="/projects" className={`absolute left-24 top-28 cursor-pointer text-lg ${twColorClasses.TEXT_TERTIARY}`}>
        &lt; Back
      </a>
      {article?.detailImages && <Carousel images={article?.detailImages} />}
      {!article?.detailImages?.length && article?.imageSrc && (
        <img src={article.imageSrc} alt="" className="h-72 w-full max-w-screen-sm object-cover" />
      )}
      <div className="mt-10 max-w-screen-md">
        <h2 className={`${twColorClasses.TEXT_TERTIARY} mb-5 text-2xl font-bold`}>{article?.title}</h2>
        <div className={`${twColorClasses.TEXT_PRIMARY} whitespace-pre-line leading-loose`}>
          <Markdown remarkPlugins={[remarkGfm]} className="markdown">{decodeURIComponent(article?.articleText ?? "")}</Markdown>
        </div>
      </div>
    </main>
  );
}
