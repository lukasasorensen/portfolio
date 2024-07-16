import { ICarouselImage } from "@/components/common/Carousel";

export interface IProject {
  id: string;
  title: string;
  description?: string;
  shortDescription: string;
  imageSrc: string;
  detailImages?: ICarouselImage[];
  skillsUsed?: string[];
  linkUrl?: string;
  company?: string;
  createdDate?: Date;
}

const Projects: IProject[] = [
  {
    id: "digideck-components",
    title: "DIGIDECK Components",
    description: `The goal of this project was to architect a way for any developer internally or externally to create a DIGIDECK Presentation Plugin, which is a modular part of the presentation content such as: images, videos, icons, arrows, and anything else you wish to create. During this project I led junior developers in creating an in-house Javascript Framework that extended the Custom Web Component API. \n\nA CLI was created to bootstrap a new DIGIDECK Plugin App. Developers then use the digideckCORE API to interact directly with the DIGIDECK presentation. Because the plugins are self-contained apps, presentation plugins are tree-shakeable which reduced the size of presentations. All APIs were documented on a Docusaurus documentation site complete with Algolia fuzzy searching for faster development.`,
    shortDescription: "Modular design elements for the DIGIDECK presentation platform.",
    imageSrc: "/images/COMPONENT_STORE.png",
    detailImages: [
      { src: "/images/COMPONENT_STORE.png" },
      { src: "/images/COMPONENT_CAROUSEL_1.png" },
      { src: "/images/COMPONENT_CAROUSEL_2.png" },
      { src: "/images/COMPONENT_CAROUSEL_3.png" },
      { src: "/images/COMPONENT_CAROUSEL_4.png" },
      { src: "/images/COMPONENT_CAROUSEL_6.png" },
    ],
    skillsUsed: [
      "Javascript",
      "NodeJS",
      "NPM",
      "Webpack",
      "Custom Web Components",
      "Mongodb",
      "ExpressJS",
      "Redis",
      "Bash scripting",
      "CI/CD",
      "Git",
    ],
    linkUrl: "https://www.thedigideck.com/customize/",
    company: "Sportsdigita",
    createdDate: new Date("2021-1-1"),
  },
  {
    id: "component-layout-editor",
    title: "DIGIDECK Design Editor",
    shortDescription:
      "A WYSIWYG Photoshop/Canva like editor that allows for drag to resize, move, and rotate elements.",
    description: `Using Typescript, Webpack, and NodeJS, I architected and developed a Photoshop/Canva like experience that allowed users to click and drag to edit the position and size of plugins on their presentations. The plugins had to be developed to allow clients to create responsive designs that can change for mobile, tablet, and desktop. \n\nUtilizing Typescript, I created a maintainable and extendable app that integrated with the DIGIDECK presentation editor for selecting plugins to resize, move and rotate with addition to grid snapping, relative snapping, anchoring to different sides, percentage units, and multiple media queries. I chose to not use any frameworks or libraries in developing this feature because this feature had very little UI elements and mostly consisted of logic for calculating size/position from mouse events and converting that to CSS data for DIGIDECK plugins.`,
    linkUrl: "https://www.thedigideck.com/design/",
    skillsUsed: ["Typescript", "NodeJS", "Webpack", "SOLID/OOPS", "CI/CD", "Git"],
    company: "Sportsdigita",
    createdDate: new Date("2021-1-1"),
    imageSrc: "/images/DIGIDECK_COMPONENTS_SCREENSHOT.png",
    detailImages: [
      { src: "/images/DIGIDECK_COMPONENTS_SCREENSHOT.png" },
      { src: "/images/LAYOUT_EDITOR_GIF.gif" },
      { src: "/images/LAYOUT_EDITOR_CAROUSEL_1.png" },
      { src: "/images/LAYOUT_EDITOR_CAROUSEL_2.png" },
      { src: "/images/LAYOUT_EDITOR_CAROUSEL_3.png" },
      { src: "/images/LAYOUT_EDITOR_CAROUSEL_4.png" },
    ],
  },
  {
    id: "sideshift-app",
    title: "SideShift Mobile App",
    shortDescription:
      "A job board and social media app for college students to easily apply to local businesses hiring.",
    company: "SideShift",
    linkUrl: "https://www.sideshiftjobs.com/",
    skillsUsed: ["Typescript", "React Native", "Expo", "PostgresSQL", "Supabase", "Git", "Xcode", "Adobe XD"],
    description: `SideShift is a startup app that connects college students to local hiring businesses. My task as a consultant was to lead the architecture of a React Native App that would be available on Web, iOS and Android. \n\nWith the Expo framework, and using Supabase Postgres DB as a backend I collaborated with junior and senior developers to create a social-media like job board that allows students to scroll through job postings and send applications easily. In addition, employers could create  job listings, message students, and manage applications.`,
    createdDate: new Date("2024-4-1"),
    imageSrc: "/images/projectPhone.webp",
    detailImages: [{ src: "/images/projectPhone.webp" }],
  },
];

export default Projects;
