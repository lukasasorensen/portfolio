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
          <ProjectListing
            title={Projects.DIGIDECK_COMPONENTS.title}
            imageSrc={Projects.DIGIDECK_COMPONENTS.imageSrc}
            description={Projects.DIGIDECK_COMPONENTS.description}
            date={Projects.DIGIDECK_COMPONENTS.date}
          />
          <ProjectListing
            title={Projects.COMPONENT_LAYOUT_EDITOR.title}
            imageSrc={Projects.COMPONENT_LAYOUT_EDITOR.imageSrc}
            description={Projects.COMPONENT_LAYOUT_EDITOR.description}
            date={Projects.COMPONENT_LAYOUT_EDITOR.date}
          />
          <ProjectListing
            title={Projects.SIDESHIFT_APP.title}
            imageSrc={Projects.SIDESHIFT_APP.imageSrc}
            description={Projects.SIDESHIFT_APP.description}
            date={Projects.SIDESHIFT_APP.date}
          />
        </div>
      </div>
    </main>
  );
}
