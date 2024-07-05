import { useThemeContext } from "@/providers/ThemeProvider";

export interface IProjectListingProps {
  imageSrc: string;
  title: string;
  description: string;
  date: Date;
}

export function ProjectListing(props: IProjectListingProps) {
  const { twColorClasses } = useThemeContext();
  return (
    <div className={`cursor-pointer rounded-lg p-8 hover:bg-white/10`}>
      <a
        rel="noopener noreferrer"
        href="#"
        aria-label="Te nulla oportere reprimique his dolorum"
        className="flex flex-col dark:bg-gray-50"
      >
        <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src={props.imageSrc} />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Te nulla oportere reprimique his dolorum"
          className="flex flex-col dark:bg-gray-50"
        ></a>
        <a
          rel="noopener noreferrer"
          href="#"
          className={`text-lg uppercase tracking-wider hover:underline ${twColorClasses.TEXT_TERTIARY}`}
        >
          {props.title}
        </a>
        <h3 className="text-md flex-1 truncate py-2 font-semibold leading-snug">{props.description}</h3>
        <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
          <span>{props.date?.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
