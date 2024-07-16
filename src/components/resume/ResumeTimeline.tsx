import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function ResumeTimeline() {
  return (
    <section className={`${tw.BG_PRIMARY}`}>
      <div className="container mx-auto max-w-5xl py-12 md:px-4">
        <div className="mx-4 grid gap-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="mb-14 text-center before:mx-auto before:mb-5 before:block before:h-3 before:w-24 before:rounded-md sm:text-left sm:before:mx-0 before:dark:bg-violet-600">
              <h3 className="text-3xl font-semibold">Lukas Sorensen</h3>
              <span className={`text-sm font-bold uppercase tracking-wider ${tw.TEXT_SECONDARY}`}>
                Full Stack Engineer
              </span>
            </div>
          </div>
          <div className="relative col-span-12 space-y-6 sm:col-span-9 md:px-4">
            <div className="relative col-span-12 space-y-12 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5 md:px-4 before:dark:bg-gray-300">
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Sportsdigita - Senior Full Stack Engineer </h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>OCTOBER 2022 - present</time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Provided mentorship and leadership to junior developers through one-on-one coding sessions,
                    comprehensive code reviews, and collaborating on projects.{" "}
                  </li>
                  <li className="mt-3">
                    Collaborated with UX designers and project managers to deliver new product features.
                  </li>
                  <li className="mt-3">
                    Led development on a DIGIDECK Javascript Framework using the Custom Web Components API enabling
                    developers to create custom plugins for DIGIDECK presentations which led to the size of
                    presentations to be reduced by tree-shaking individual plugins.
                  </li>
                  <li className="mt-3">
                    Recommended new technologies such as Vue, React, and Webpack and refactored legacy code to maintain
                    best practices.
                  </li>
                  <li className="mt-3">
                    Applied SOLID and OOP principles to create extendable, maintainable, and intuitive code.
                  </li>
                  <li className="mt-3">Managed deployments to production and oversaw upkeep of CI/CD pipelines.</li>
                  <li className="mt-3">
                    Ensured code was well documented by maintaining in code JSDOC comments, Docusaurus markdown pages,
                    and type definitions.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">SideShift - Architect Consultant</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>FEBRUARY 2024 - MAY 2024</time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Collaborated with executives at the startup, SideShift to define project scope and requirements.
                  </li>
                  <li className="mt-3">
                    Designed and developed the architecture for a React Native app, focusing on scalability and
                    maintainability, using Expo and Postgres.
                  </li>
                  <li className="mt-3">
                    Ensured comprehensive documentation and clear guidelines for a seamless handoff to SideShift
                    developers.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">SportsDigita - Full Stack Engineer </h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  NOVEMBER 2018 - OCTOBER 2022
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Developed new features and maintained an enterprise scale app with many users on both frontend and
                    backend using Angular, Vue, NodeJS, MongoDB and SQL.
                  </li>
                  <li className="mt-3">
                    Collaborated in an Agile environment of developers using JIRA, Bitbucket and Confluence to manage
                    story progress and code reviews.
                  </li>
                  <li className="mt-3">Built and maintained RESTful APIs with NodeJS, ExpressJS and MongoDB.</li>
                  <li className="mt-3">
                    Created comprehensive integration and unit tests using Mocha/Chai testing framework for Test Driven
                    Development on backend REST APIS.
                  </li>
                  <li className="mt-3">
                    Integrated application with third-party APIs such as SalesForce, Canva, Twilio, Bynder, Hubspot, and
                    Zapier.
                  </li>
                  <li className="mt-3">
                    Refactored legacy code to be up to date with best practices and modern technologies.
                  </li>
                  <li className="mt-3">Documented code and managed technical documentation for internal use</li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Union App LLC - Full Stack Engineer</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  JANUARY 2016 - NOVEMBER 2018
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Built a Single Page Application social media for US Unions using Angular/Typescript frontend and a
                    NodeJS/MongoDB backend from concept to completion.
                  </li>
                  <li className="mt-3">Collaborated with other developers using Agile methods to collaborate.</li>
                  <li className="mt-3">Built and maintained RESTful APIs with NodeJS, ExpressJS and MongoDB.</li>
                  <li className="mt-3">Created and managed CI/CD pipelines using Github Workflows.</li>
                  <li className="mt-3">
                    Maintained a scalable architecture on AWS using Elastic Beanstalk and EC2 containers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
