import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <section className="h-60 mt-20 w-full bg-blue-200">
      <div className="pl-40 pt-20">
        <h1 className="text-blue-900 font-[400]">Contact</h1>
        <div className="flex mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 1000 1000"
            className="mr-4 text-blue-900 cursor-pointer"
            onClick={() => window.open("https://www.linkedin.com/in/joshik27/")}
          >
            <path
              fill="currentColor"
              d="M196.064.25C88.347.25.187 88.408.187 196.127v607.841c0 107.717 88.158 195.845 195.877 195.845h607.841c107.718 0 195.845-88.127 195.845-195.845V196.127C999.75 88.41 911.623.25 803.905.25zm49.266 164.948c51.648 0 83.461 33.906 84.443 78.475c0 43.585-32.797 78.444-85.442 78.444h-.969c-50.665 0-83.412-34.857-83.412-78.444c0-44.568 33.738-78.475 85.379-78.475zm445.08 208.31c99.329 0 173.79 64.922 173.79 204.436v260.449H713.247V595.406c0-61.06-21.847-102.718-76.476-102.718c-41.704 0-66.562 28.078-77.476 55.202c-3.987 9.704-4.967 23.257-4.967 36.832v253.671H403.375s1.981-411.613 0-454.233h150.984v64.324c20.06-30.95 55.942-74.977 136.051-74.977zm-521.556 10.685h150.953v454.202H168.854z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="mr-4 text-blue-900 cursor-pointer"
            onClick={() => window.open("mailto:joshikroshan4021@gmail.com")}
          >
            <path
              fill="currentColor"
              d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64L12 9.548l6.545-4.91l1.528-1.145C21.69 2.28 24 3.434 24 5.457"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="mr-4 text-blue-900 cursor-pointer"
            onClick={() =>
              window.open("https://github.com/joshik27/rubricsync")
            }
          >
            <g fill="none">
              <g clip-path="url(#akarIconsGithubFill0)">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="akarIconsGithubFill0">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </g>
          </svg>
        </div>
      </div>
      <Separator className="bg-blue-900 my-6 w-4/5 mx-auto" />
      <div className="text-center text-blue-900 text-sm mt-4">
        &copy; {new Date().getFullYear()} RubricSync. All rights reserved.
        reserved.
      </div>
    </section>
  );
}
