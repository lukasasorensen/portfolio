const Projects = {
  DIGIDECK_COMPONENTS: {
    title: "DIGIDECK Components",
    description: `The goal of this project was to architect a way for any developer internally or externally to create a DIGIDECK Presentation Component, which is a modular part of the presentation content such as: images, videos, icons, arrows, and anything else you wish to create. During this project I saw to
  
creating an API called digideckCORE that allowed developers to interact more easily with our presentation to retrieve metadata, send events, etc. I also created a CLI tool to bootstrap a new Component Repo with the architecture setup similar to the create-react-app tool. Components are Custom Web Components that developers can create custom forms to allow DIGIDECK clients to directly interact with the Component’s settings and for the component to dynamically render content.
`,
    imageSrc: "/images/DIGIDECK_COMPONENTS_SCREENSHOT.png",
    date: new Date("2021-1-1"),
  },
};

export default Projects;
