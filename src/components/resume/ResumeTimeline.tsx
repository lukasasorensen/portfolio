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
                <h3 className="text-xl font-semibold tracking-wide">Sportsdigita - Senior Full Stack Engineer (AI + Platform)</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>OCTOBER 2022 - PRESENT</time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Led architecture and implementation of the DIGIDECK AI Assistant with MCP-enabled workflows that
                    reduced large multi-slide edits from hours/days to minutes.
                  </li>
                  <li className="mt-3">
                    Designed domain-aware AI flows that use approved DIGIDECK data and directly interact with the
                    presentation editor for outlines, slide updates, and targeted tool calls.
                  </li>
                  <li className="mt-3">
                    Integrated Claude, OpenAI, and local Ollama models through LangChain and MCP with stronger
                    observability, governance, and operational controls.
                  </li>
                  <li className="mt-3">Owned end-to-end system design and delivery across AI services, editor integrations, and platform APIs.</li>
                  <li className="mt-3">
                    Mentored engineers through architecture feedback and high-signal code reviews while partnering
                    cross-functionally with product and UX.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">SportsDigita - Full Stack Engineer</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  NOVEMBER 2018 - OCTOBER 2022
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Built and scaled enterprise DIGIDECK features across frontend/backend using Angular, Vue, NodeJS,
                    MongoDB, and SQL.
                  </li>
                  <li className="mt-3">
                    Delivered and maintained REST APIs and key third-party integrations including Salesforce, Canva,
                    Twilio, Bynder, HubSpot, and Zapier.
                  </li>
                  <li className="mt-3">
                    Led modernization efforts on legacy systems and engineering workflows to improve maintainability
                    and team velocity.
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
