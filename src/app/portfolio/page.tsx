"use client";
import { ProjectListing } from "@/components/projects/ProjectListing";
import { useThemeContext } from "@/providers/ThemeProvider";
import Projects from "@/constants/Projects";

export default function Portfolio() {
  const { twColorClasses } = useThemeContext();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}>
      <h1 className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>Projects</h1>
      <div className="max-w-screen-lg space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <ProjectListing project={Projects.DIGIDECK_COMPONENTS} />
          <ProjectListing project={Projects.COMPONENT_LAYOUT_EDITOR} />
          <ProjectListing project={Projects.SIDESHIFT_APP} />
        </div>
      </div>
    </main>
  );
}
