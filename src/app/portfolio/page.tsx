"use client";
import { ProjectListing } from "@/components/projects/ProjectListing";
import { useThemeContext } from "@/providers/ThemeProvider";
import Projects from "@/constants/Projects";

export default function Portfolio() {
  const { twColorClasses } = useThemeContext();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}>
      <h1 className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}>Lukas A Sorensen</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold">Projects</h2>
          <p>Showcase your projects with a hero image (16 x 9)</p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <ProjectListing
            title={Projects.DIGIDECK_COMPONENTS.title}
            imageSrc={Projects.DIGIDECK_COMPONENTS.imageSrc}
            description={Projects.DIGIDECK_COMPONENTS.description}
            date={Projects.DIGIDECK_COMPONENTS.date}
          />
          <ProjectListing
            title={Projects.DIGIDECK_COMPONENTS.title}
            imageSrc={Projects.DIGIDECK_COMPONENTS.imageSrc}
            description={Projects.DIGIDECK_COMPONENTS.description}
            date={Projects.DIGIDECK_COMPONENTS.date}
          />
          <ProjectListing
            title={Projects.DIGIDECK_COMPONENTS.title}
            imageSrc={Projects.DIGIDECK_COMPONENTS.imageSrc}
            description={Projects.DIGIDECK_COMPONENTS.description}
            date={Projects.DIGIDECK_COMPONENTS.date}
          />
        </div>
      </div>
    </main>
  );
}
