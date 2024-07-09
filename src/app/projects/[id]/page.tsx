"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import Projects, { IProject } from "@/example-data/Projects";
import { useState } from "react";
import Carousel from "@/components/common/Carousel";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { twColorClasses } = useThemeContext();
  const [project, setProject] = useState<IProject | null>(null);

  const getProjectById = async (id: string): Promise<IProject | undefined> => {
    return Object.values(Projects).find((p) => p.id === id);
  };

  const init = async () => {
    const getProject = await getProjectById(params.id);
    if (!getProject) return;
    setProject(getProject);
  };

  init();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-8 py-10 md:px-24`}
    >
      <a href="/projects" className={`cursor-pointer self-start text-lg ${twColorClasses.TEXT_TERTIARY}`}>
        &lt; Back
      </a>
      <div className="mt-5">
        {project?.detailImages && <Carousel images={project?.detailImages} />}
        {!project?.detailImages?.length && project?.imageSrc && (
          <img src={project.imageSrc} alt="" className="h-52 w-full object-cover dark:bg-gray-500" />
        )}
      </div>
      <div className="max-w-screen-md md:mt-10">
        <h2 className={`${twColorClasses.TEXT_TERTIARY} text-2xl font-bold`}>{project?.title}</h2>
        <p className={`mb-4 ${twColorClasses.TEXT_SECONDARY}`}>{project?.company}</p>
        <p className={`${twColorClasses.TEXT_PRIMARY} whitespace-pre-line leading-loose`}>{project?.description}</p>
      </div>
    </main>
  );
}
