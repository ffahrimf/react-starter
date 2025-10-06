import { Link } from "react-router";
import GridShape from "../common/GridShape";

export default function NotFound() {
  return (
    <>
      <div className="dark:bg-dark-800 relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white p-6">
        <GridShape />
        <div className="tablet:max-w-[472px] mx-auto w-full max-w-[242px] text-center">
          <h1 className="desktop:text-7xl text-dark-800 mb-8 text-4xl font-bold dark:text-white/90">
            ERROR
          </h1>

          <img src="/img/error/404.svg" alt="404" className="dark:hidden" />
          <img
            src="/img/error/404-dark.svg"
            alt="404"
            className="hidden dark:block"
          />

          <p className="tablet:text-lg text-dark-700 dark:text-dark-400 mt-10 mb-6 text-base">
            We can’t seem to find the page you are looking for!
          </p>

          <Link
            to="/"
            className="border-dark-300 text-dark-700 hover:bg-dark-50 hover:text-dark-800 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-400 dark:hover:text-dark-200 inline-flex items-center justify-center rounded-lg border bg-white px-5 py-3.5 text-sm font-medium shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] dark:hover:bg-white/[0.03]"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
