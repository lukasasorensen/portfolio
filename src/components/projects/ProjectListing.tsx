import { IProject } from "@/example-data/Projects";
import { useThemeContext } from "@/providers/ThemeProvider";

export interface IProjectListingProps {
  project: {
    title?: string;
    createdDate?: Date;
    shortDescription?: string;
    imageSrc?: string;
  };
  onClick?: () => void;
}

export function ProjectListing(props: IProjectListingProps) {
  const { twColorClasses } = useThemeContext();
  return (
    <div className={`cursor-pointer rounded-lg p-8 hover:bg-white/10`} onClick={() => props?.onClick?.()}>
      <div
        rel="noopener noreferrer"
        aria-label="Te nulla oportere reprimique his dolorum"
        className="flex flex-col dark:bg-gray-50"
      >
        <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src={props.project?.imageSrc} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <a
          rel="noopener noreferrer"
          aria-label="Te nulla oportere reprimique his dolorum"
          className="flex flex-col dark:bg-gray-50"
        ></a>
        <a
          rel="noopener noreferrer"
          href="#"
          className={`text-lg uppercase tracking-wider hover:underline ${twColorClasses.TEXT_TERTIARY}`}
        >
          {props.project?.title}
        </a>
        <h3 className="text-md flex-1 py-2 font-semibold leading-snug">{props.project?.shortDescription}</h3>
        <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
          <span>{props.project?.createdDate?.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
