"use client";
import { ProjectListing } from "@/components/projects/ProjectListing";
import { useThemeContext } from "@/providers/ThemeProvider";
import Projects from "@/constants/Projects";
import { useRouter } from "next/navigation";

export default function Portfolio() {
  const { twColorClasses } = useThemeContext();
  const router = useRouter();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}>
      <h1 className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>Projects</h1>
      <div className="max-w-screen-lg space-y-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <ProjectListing onClick={() => router.push(`/projects/${Projects.DIGIDECK_COMPONENTS.id}`)} project={Projects.DIGIDECK_COMPONENTS} />
          <ProjectListing onClick={() => router.push(`/projects/${Projects.COMPONENT_LAYOUT_EDITOR.id}`)} project={Projects.COMPONENT_LAYOUT_EDITOR} />
          <ProjectListing onClick={() => router.push(`/projects/${Projects.SIDESHIFT_APP.id}`)} project={Projects.SIDESHIFT_APP} />
        </div>
      </div>
    </main>
  );
}
