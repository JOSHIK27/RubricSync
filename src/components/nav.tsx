import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  const { userId } = auth();

  return (
    <nav className="bg-gradient-to-r from-stone-200 to-stone-300 shadow-md mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                className="text-stone-700"
              >
                <path
                  fill="currentColor"
                  d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82 6L12 12.72L5.18 9L12 5.28L18.82 9M17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"
                />
              </svg>
              <span className="ml-2 text-2xl font-bold text-stone-900">RS</span>
            </div>
          </Link>
          <div className="flex items-center">
            {!userId ? (
              <Link href="/sign-in">
                <Button className="bg-stone-700 hover:bg-stone-800 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Sign In
                </Button>
              </Link>
            ) : (
              <SignOutButton>
                <Button className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Sign Out
                </Button>
              </SignOutButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
