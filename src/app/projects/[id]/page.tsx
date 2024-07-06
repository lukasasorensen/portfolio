"use client";
import { ProjectListing } from "@/components/projects/ProjectListing";
import { useThemeContext } from "@/providers/ThemeProvider";
import Projects, { IProject } from "@/constants/Projects";
import { useState } from "react";
import Image from "next/image";
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
      <a href="/projects" className={`absolute left-24 top-32 text-lg cursor-pointer ${twColorClasses.TEXT_TERTIARY}`}>
        &lt; Back
      </a>
      <h1 className={`text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>{project?.title}</h1>
      {project?.detailImages && <Carousel images={project?.detailImages} />}
      {!project?.detailImages?.length && project?.imageSrc && (
        <img src={project.imageSrc} alt="" className="h-52 w-full object-cover dark:bg-gray-500" />
      )}
      <div className="max-w-screen-lg">
        <h3 className={`${twColorClasses.TEXT_TERTIARY} text-xl font-bold mb-4`}>Project Description</h3>
        <p className={`${twColorClasses.TEXT_PRIMARY} leading-loose`}>{project?.description}</p>
      </div>
    </main>
  );
}
