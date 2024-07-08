"use client";
import { ProjectListing } from "@/components/projects/ProjectListing";
import { useThemeContext } from "@/providers/ThemeProvider";
import Projects from "@/example-data/Projects";
import { useRouter } from "next/navigation";

export default function Portfolio() {
  const { twColorClasses } = useThemeContext();
  const router = useRouter();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} px-24 py-14`}>
      <h1 className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>Projects</h1>
      <div className="max-w-screen-lg space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          {Projects.map((project) => (
            <ProjectListing
              key={"project-listing-" + project.id}
              onClick={() => router.push(`/projects/${project.id}`)}
              project={project}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
