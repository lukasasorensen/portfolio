import { ICarouselImage } from "@/components/common/Carousel";

export interface IProject {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageSrc: string;
  detailImages?: ICarouselImage[];
  skillsUsed: string[];
  linkUrl: string;
  company: string;
  date: Date;
}

const Projects: { [key: string]: IProject } = {
  DIGIDECK_COMPONENTS: {
    id: "digideck-components",
    title: "DIGIDECK Components",
    description: `The goal of this project was to architect a way for any developer internally or externally to create a DIGIDECK Presentation Component, which is a modular part of the presentation content such as: images, videos, icons, arrows, and anything else you wish to create. During this project I saw to
  
creating an API called digideckCORE that allowed developers to interact more easily with our presentation to retrieve metadata, send events, etc. I also created a CLI tool to bootstrap a new Component Repo with the architecture setup similar to the create-react-app tool. Components are Custom Web Components that developers can create custom forms to allow DIGIDECK clients to directly interact with the Component’s settings and for the component to dynamically render content.
`,
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
    date: new Date("2021-1-1"),
  },
  COMPONENT_LAYOUT_EDITOR: {
    id: "component-layout-editor",
    title: "DIGIDECK Design Editor",
    shortDescription:
      "A WYSIWYG Photoshop/Canva like editor that allows for drag to resize, move, and rotate elements.",
    description: `Using Typescript, Webpack, and NodeJS, I architected and developed a Photoshop/Canva like experience that allowed users to click and drag to edit the position and size of elements on their presentations. Previously, users had to know CSS to style their presentations. I chose Vanilla Typescript because of the amount of complex math and data being calculated from mouse dragging, Typescript allowed much better self documentation and error handling allowing me to work more eciently. I had the challenge of developing an experience that would allow the clients to create responsive designs that would respond to window resizes. Using SOLID/OOPS principles, I created a maintainable and extendable repository that could resize, move and even rotate elements with addition to grid snapping, relative snapping, anchoring to dierent sides, percentage units, and multiple media queries.`,
    linkUrl: "https://www.thedigideck.com/design/",
    skillsUsed: ["Typescript", "NodeJS", "Webpack", "SOLID/OOPS", "CI/CD", "Git"],
    company: "Sportsdigita",
    date: new Date("2021-1-1"),
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
  SIDESHIFT_APP: {
    id: "sideshift-app",
    title: "SideShift Mobile App",
    shortDescription:
      "A job board and social media app for college students to easily apply to local businesses hiring.",
    company: "SideShift",
    linkUrl: "https://www.sideshiftjobs.com/",
    skillsUsed: ["Typescript", "React Native", "Expo", "PostgresSQL", "Supabase", "Git", "Xcode", "Adobe XD"],
    description: `SideShift is a startup app that connects college students to local hiring businesses. I was brought on as a consultant to oversee the architecture of a React Native App that would work on Web, Iphone and Andriod, using Supabase Postgres DB as a backend. Using the Expo framework, I worked with junior devs to develop a social media like job board that allowed students to scroll through job postings and employers to create job listings as well as create profiles, message students, and send applications.`,
    date: new Date("2024-4-1"),
    imageSrc: "/images/projectPhone.webp",
    detailImages: [{ src: "/images/projectPhone.webp" }],
  },
};

export default Projects;
