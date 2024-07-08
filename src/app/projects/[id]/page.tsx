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
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}>
      <a href="/projects" className={`absolute left-24 top-28 cursor-pointer text-lg ${twColorClasses.TEXT_TERTIARY}`}>
        &lt; Back
      </a>
      {project?.detailImages && <Carousel images={project?.detailImages} />}
      {!project?.detailImages?.length && project?.imageSrc && (
        <img src={project.imageSrc} alt="" className="h-52 w-full object-cover dark:bg-gray-500" />
      )}
      <div className="mt-10 max-w-screen-md">
        <h2 className={`${twColorClasses.TEXT_TERTIARY} text-2xl font-bold`}>{project?.title}</h2>
        <p className={`mb-4 ${twColorClasses.TEXT_SECONDARY}`}>{project?.company}</p>
        <p className={`${twColorClasses.TEXT_PRIMARY} whitespace-pre-line leading-loose`}>{project?.description}</p>
      </div>
    </main>
  );
}
