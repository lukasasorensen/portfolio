export const RESUME = {
  name: "Lukas A Sorensen",
  title: "Full Stack Web Developer / Systems Architect / AI Engineer",
  summary:
    "Lead Engineer and Systems Architect with 10+ years delivering production software across startup, mid-sized, and contract environments. My focus combines AI systems and full-stack engineering, including architecting the DIGIDECK AI Assistant that integrates domain-specific deck data with in-editor tooling to turn large slide updates from hours or days into minutes.",
  contact: {
    email: "lukasasorensen@gmail.com",
    website: "https://lukasasorensen.com",
    github: "https://github.com/lukasasorensen",
    linkedin: "https://www.linkedin.com/in/lukasasorensen",
  },
  experience: [
    {
      company: "Sportsdigita",
      title: "Senior Full Stack Engineer (AI + Platform)",
      period: "October 2022 – Present",
      highlights: [
        "Led architecture and implementation of the DIGIDECK AI Assistant with MCP-enabled workflows that let users make broad, governed presentation edits in minutes instead of hours or days.",
        "Designed domain-aware AI flows that use approved DIGIDECK content and directly interact with the presentation editor for outline generation, slide updates, and targeted layout/content tool calls.",
        "Integrated Claude, OpenAI, and local Ollama-backed models through LangChain/MCP orchestration with auditability, observability, and secure operational controls.",
        "Owned system design and delivery across AI services, editor integrations, and platform APIs while partnering with product and UX on roadmap execution.",
        "Mentored engineers through architecture reviews, design feedback, and high-quality code reviews to improve delivery quality and velocity.",
      ],
    },
    {
      company: "Sportsdigita",
      title: "Full Stack Engineer",
      period: "November 2018 – October 2022",
      highlights: [
        "Built and scaled enterprise DIGIDECK features across frontend and backend using Angular, Vue, NodeJS, MongoDB, and SQL.",
        "Delivered and maintained REST APIs and third-party integrations (Salesforce, Canva, Twilio, Bynder, HubSpot, Zapier) used in production customer workflows.",
        "Led modernization initiatives on legacy codebases and engineering practices to improve maintainability and team velocity.",
      ],
    },
    {
      company: "SideShift",
      title: "Architect Consultant",
      period: "February 2024 – May 2024",
      highlights: [
        "Defined scalable architecture and technical direction for a cross-platform React Native app (Web, iOS, Android) built with Expo and Postgres.",
        "Produced implementation standards and documentation for clean handoff to the internal engineering team.",
      ],
    },
    {
      company: "Union App LLC",
      title: "Full Stack Engineer",
      period: "January 2016 – November 2018",
      highlights: [
        "Built a social platform for US unions with Angular/TypeScript and NodeJS/MongoDB, delivering end-to-end product functionality.",
        "Implemented backend APIs and AWS deployment workflows to support reliable production releases.",
      ],
    },
  ],
  skills: [
    "AI Systems (Claude, OpenAI, Ollama, LangChain, MCP, Agent Orchestration, Tool Calling, Observability/Governance)",
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Vue",
    "Angular",
    "React Native",
    "NodeJS",
    "ExpressJS",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "CI/CD",
    "Git",
    "Webpack",
    "Tailwind CSS",
    "SOLID / OOP principles",
    "Custom Web Components",
    "Agile / JIRA",
  ],
  projects: [
    {
      title: "DIGIDECK AI Assistant",
      description:
        "Architected and implemented DIGIDECK AI Assistant workflows that connect domain-specific deck knowledge to MCP tools and direct editor actions, enabling governed generation, slide-level updates, and large multi-slide edits in minutes rather than hours or days.",
      company: "Sportsdigita",
      skills: [
        "Claude",
        "OpenAI",
        "Ollama",
        "LangChain",
        "Model Context Protocol (MCP)",
        "TypeScript",
        "NodeJS",
        "Agent Orchestration",
        "Tool Calling",
        "Observability/Governance",
      ],
      link: "https://www.thedigideck.com/ai/",
    },
    {
      title: "DIGIDECK Components",
      description:
        "Architected a modular JavaScript Framework extending the Custom Web Components API, allowing internal and external developers to create presentation plugins. Includes a CLI to bootstrap new plugin apps, a digideckCORE API, and a Docusaurus documentation site with Algolia search.",
      company: "Sportsdigita",
      skills: ["JavaScript", "NodeJS", "NPM", "Webpack", "Custom Web Components", "MongoDB", "ExpressJS", "Redis"],
      link: "https://www.thedigideck.com/customize/",
    },
    {
      title: "DIGIDECK Design Editor",
      description:
        "Architected and developed a Photoshop/Canva-like WYSIWYG editor in TypeScript allowing users to drag, resize, move, and rotate plugins on presentations. Features grid snapping, relative snapping, anchoring, percentage units, and multiple media queries.",
      company: "Sportsdigita",
      skills: ["TypeScript", "NodeJS", "Webpack", "SOLID/OOP", "CI/CD", "Git"],
      link: "https://www.thedigideck.com/design/",
    },
    {
      title: "SideShift Mobile App",
      description:
        "Led architecture for a React Native job board and social app for college students, delivered across Web, iOS, and Android with a maintainable handoff plan.",
      company: "SideShift",
      skills: ["TypeScript", "React Native", "Expo", "PostgreSQL", "Supabase", "Git", "Xcode", "Adobe XD"],
      link: "https://www.sideshiftjobs.com/",
    },
  ],
};
