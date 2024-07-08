"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useState } from "react";
import Carousel from "@/components/common/Carousel";
import Articles, { IArticle } from "@/example-data/Articles";

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
        <img src={article.imageSrc} alt="" className="h-72 max-w-screen-sm w-full object-cover" />
      )}
      <div className="mt-10 max-w-screen-md">
        <h2 className={`${twColorClasses.TEXT_TERTIARY} text-2xl font-bold mb-5`}>{article?.title}</h2>
        <p className={`${twColorClasses.TEXT_PRIMARY} whitespace-pre-line leading-loose`}>{decodeURIComponent(article?.articleText ?? '')}</p>
      </div>
    </main>
  );
}
