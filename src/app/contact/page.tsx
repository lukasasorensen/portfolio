"use client";
import { ThemedButton } from "@/components/Themed";
import { useThemeContext } from "@/providers/ThemeProvider";

export default function Contact() {
  const { twColorClasses } = useThemeContext();

  return (
    <main className={`${twColorClasses.BG_PRIMARY} py-14`}>
      <div className={`mx-auto max-w-screen-md px-4 py-8 lg:py-16`}>
        <h2 className={`mb-4 text-center text-4xl font-extrabold tracking-tight ${twColorClasses.TEXT_PRIMARY} `}>
          Contact Us
        </h2>
        <p className={`mb-8 text-center font-light ${twColorClasses.TEXT_SECONDARY} sm:text-xl lg:mb-16`}>
          Want to hire me? Send me an email!
        </p>
        <form action="#" className={`space-y-8`}>
          <div>
            <label htmlFor="email" className={`mb-2 block text-sm font-medium ${twColorClasses.TEXT_PRIMARY} `}>
              Your email
            </label>
            <input
              type="email"
              id="email"
              className={`focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm ${twColorClasses.TEXT_PRIMARY} shadow-sm dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400`}
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className={`mb-2 block text-sm font-medium ${twColorClasses.TEXT_PRIMARY} `}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className={`focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm ${twColorClasses.TEXT_PRIMARY} shadow-sm dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400`}
              required
            />
          </div>
          <div className={`sm:col-span-2`}>
            <label
              htmlFor="message"
              className={`mb-2 block text-sm font-medium ${twColorClasses.TEXT_PRIMARY} dark:text-gray-400`}
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className={`focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment... block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm ${twColorClasses.TEXT_PRIMARY} shadow-sm dark:border-gray-600 dark:bg-gray-700  dark:placeholder-gray-400`}
            ></textarea>
          </div>
          <div className="float-right">
            <ThemedButton color="secondary" text="Send Message"></ThemedButton>
          </div>
        </form>
      </div>
    </main>
  );
}
