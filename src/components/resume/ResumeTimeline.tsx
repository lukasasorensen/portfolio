import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function ResumeTimeline() {
   
  return (
    <section className={`${tw.BG_PRIMARY}`}>
      <div className="container mx-auto max-w-5xl md:px-4 py-12">
        <div className="mx-4 grid gap-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="mb-14 text-center before:mx-auto before:mb-5 before:block before:h-3 before:w-24 before:rounded-md sm:text-left sm:before:mx-0 before:dark:bg-violet-600">
              <h3 className="text-3xl font-semibold">Lukas Sorensen</h3>
              <span className={`text-sm font-bold uppercase tracking-wider ${tw.TEXT_SECONDARY}`}>
                Full Stack Engineer
              </span>
            </div>
          </div>
          <div className="relative col-span-12 space-y-6 md:px-4 sm:col-span-9">
            <div className="relative col-span-12 space-y-12 md:px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5 before:dark:bg-gray-300">
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Sportsdigita - Senior Full Stack Engineer </h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  OCTOBER 2022 - present
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Mentored and led Junior Developers via one-on-one coding sessions, code reviews, and collaboration.
                  </li>
                  <li className="mt-3">
                    Architected and developed flagship features from concept to completion that impacted the entire
                    business across millions of users.
                  </li>
                  <li className="mt-3">
                    Recommended new technologies and kept up to date with latest features to ensure best practices are
                    in place.
                  </li>
                  <li className="mt-3">
                    Applied SOLID/OOPS principles to create extendable, maintainable and intuitive code.
                  </li>
                  <li className="mt-3">Managed deployments to production and oversaw upkeep of CI/CD pipelines.</li>
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
                    backend using Angular, VueJS, NodeJS, MongoDB and SQL.
                  </li>
                  <li className="mt-3">
                    Collaborated in an Agile environment of developers using JIRA, Bitbucket and Confluence to manage
                    story progress and code reviews.
                  </li>
                  <li className="mt-3">Built and maintained RESTful APIs with NodeJS, ExpressJS and MongoDB.</li>
                  <li className="mt-3">
                    Practiced Test Driven Development (TDD) using Mocha, Chai, Jest, and Puppeteer.
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
                    Developed a Single Page Application social media for US Unions using Angular 2+ frontend and a
                    NodeJS/MongoDB backend from start to finish.
                  </li>
                  <li className="mt-3">Built and maintained RESTful APIs with NodeJS, ExpressJS and MongoDB</li>
                  <li className="mt-3">Created and managed CI/CD pipelines using Github Workflows. </li>
                  <li className="mt-3">
                    Maintained a scalable architecture on AWS using Elastic Beanstalk and EC2 containers.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">Freelance - Front End Web Developer</h3>
                <time className={`text-xs uppercase tracking-wide ${tw.TEXT_SECONDARY}`}>
                  SEPTEMBER 2013 - JANUARY 2016
                </time>
                <ul className="mt-3 list-disc">
                  <li className="mt-3">
                    Developed websites for a range of clients including music groups, a small berry patch and a waste
                    service company.
                  </li>
                  <li className="mt-3">
                    Worked with clients to create websites to fit their needs from concept to completion.
                  </li>
                  <li className="mt-3">
                    Communicated with clients throughout the process and beyond to add updates and maintain websites.{" "}
                  </li>
                  <li className="mt-3">Developed static content websites using HTML5, Javascript, and CSS.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
