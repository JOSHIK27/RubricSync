import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { supabase } from "@/lib";
import { Badge } from "./ui/badge";

export default async function Nav({ userid }: { userid: string | null }) {
  const { userId } = auth();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId);

  return (
    <nav className="bg-gradient-to-r from-stone-200 to-stone-300 shadow-md">
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
                <Button className="sign-in-btn bg-stone-700 hover:bg-stone-800 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <Badge
                  className={`mr-4 ${
                    data && data[0].type === "pro"
                      ? "bg-amber-500 hover:bg-amber-600 text-stone-900"
                      : "bg-stone-400 hover:bg-stone-500 text-stone-900"
                  }`}
                >
                  {data && data[0].type === "pro" ? "PRO" : "FREE"}
                </Badge>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
