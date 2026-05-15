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
                Lead Engineer / Systems Architect
              </span>
            </div>
          </div>
          <div className="relative col-span-12 space-y-6 sm:col-span-9 md:px-4">
            <div className="relative col-span-12 space-y-12 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5 md:px-4 before:dark:bg-gray-300">
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Sportsdigita - Lead Engineer & Architect</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>OCTOBER 2022 - PRESENT</time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Led architecture and implementation of the DIGIDECK AI Assistant with MCP-enabled{" "}
                    <strong>Agentic Workflows</strong> that enabled users to automate large updates to Master Decks over
                    hundreds of slides reducing effort by 70 - 90%.
                  </li>
                  <li className="mt-3">
                    Integrated and engineered <strong>AI Skills</strong> and Tools with{" "}
                    <strong>Claude, Cursor, OpenAI, and Rovo</strong> to increase producitivity and output of the
                    Engineering team by 20-40% through automated code reviews, code generation, and security monitering.
                  </li>
                  <li className="mt-3">
                    Maintained and hardened core DIGIDECK platform systems by delivering security updates and new
                    product features to the main platform with techonologies
                  </li>
                  <li className="mt-3">
                    Continued to implement new product features for DIGIDECK using:{" "}
                    <strong>Typescript, React, Angular, NodeJS, MongoDB, and Redis</strong>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Sportsdigita - Full Stack Engineer</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  NOVEMBER 2018 - OCTOBER 2022
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Delivered product updates and new features to the DIGIDECK Presentation platform on both the{" "}
                    <strong>AngularJS</strong> frontend and <strong>NodeJS, Express & MongoDB</strong> backend.
                  </li>
                  <li className="mt-3">
                    Followed <strong>Scrum & Agile</strong> methodologies and participated in regular sprint ceremonies
                    while collaborating with cross-functional teams to deliver high-quality software on time.
                  </li>
                  <li className="mt-3">
                    Fixed bugs and implemented security updates to maintain the integrity and reliability of the
                    DIGIDECK platform while ensuring a &gt;99.99% uptime for users.
                  </li>
                  <li className="mt-3">
                    Developed and maintained CI/CD pipelines and <strong>AWS</strong> deployment workflows to support
                    reliable production releases and efficient development processes.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">SideShift - Architect Consultant</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>FEBRUARY 2024 - MAY 2024</time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Defined scalable architecture and technical direction for a React Native app across Web, iOS, and
                    Android using Expo and Postgres.
                  </li>
                  <li className="mt-3">
                    Delivered implementation standards and documentation for a clean handoff to the internal team.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Union App LLC - Full Stack Engineer</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  JANUARY 2016 - NOVEMBER 2018
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Built a social platform for US unions with Angular/TypeScript and NodeJS/MongoDB, delivering
                    end-to-end product functionality.
                  </li>
                  <li className="mt-3">
                    Implemented backend APIs and AWS deployment workflows to support reliable production releases.
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
