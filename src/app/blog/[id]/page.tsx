"use client";
import { useState } from "react";
import Carousel from "@/components/common/Carousel";
import Articles, { IArticle } from "@/example-data/Articles";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function BlogArticle({ params }: { params: { id: string } }) {
   
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
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${tw.BG_PRIMARY} p-8 py-10 md:px-24`}
    >
      <a href="/blog" className={`cursor-pointer self-start text-lg ${tw.TEXT_TERTIARY}`}>
        &lt; Back
      </a>
      <div className="mt-5">
        {article?.detailImages && <Carousel images={article?.detailImages} />}
        {!article?.detailImages?.length && article?.imageSrc && (
          <img src={article.imageSrc} alt="" className="h-72 w-full object-contain" />
        )}
      </div>
      <div className="mt-10 max-w-screen-md">
        <h2 className={`${tw.TEXT_TERTIARY} mb-5 text-2xl font-bold`}>{article?.title}</h2>
        <div className={`${tw.TEXT_PRIMARY} whitespace-pre-line leading-loose`}>
          <Markdown remarkPlugins={[remarkGfm]} className="markdown">
            {decodeURIComponent(article?.articleText ?? "")}
          </Markdown>
        </div>
      </div>
    </main>
  );
}
