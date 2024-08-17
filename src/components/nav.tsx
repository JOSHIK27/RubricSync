import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Nav() {
  const { userId } = auth();

  return (
    <nav className=" bg-[#b5b0ab] mb-28 flex items-center justify-between">
      <Link href={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
          className="ml-2"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke-dasharray="15" stroke-dashoffset="15" d="M4.5 21.5h15">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.2s"
                values="15;0"
              />
            </path>
            <path
              stroke-dasharray="15"
              stroke-dashoffset="15"
              d="M4.5 21.5V8M19.5 21.5V8"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.2s"
                dur="0.2s"
                values="15;0"
              />
            </path>
            <path
              stroke-dasharray="24"
              stroke-dashoffset="24"
              d="M9.5 21.5V12.5H14.5V21.5"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.4s"
                dur="0.4s"
                values="24;0"
              />
            </path>
            <path
              stroke-dasharray="30"
              stroke-dashoffset="30"
              stroke-width="3.95"
              d="M2 10L12 2L22 10"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.5s"
                dur="0.4s"
                values="30;0"
              />
            </path>
          </g>
        </svg>
      </Link>
      <div className="my-2 mr-4">
        {!userId ? (
          <Link href={"/sign-in"}>
            <Button className="border-1 border-neutral-600 px-4 bg-[#F0EBE3] hover:bg-[#cbc6bf] shadow-lg  text-black py-2 text-[16px] rounded-none">
              Sign In
            </Button>
          </Link>
        ) : (
          <SignOutButton>
            <Button className="border-1 border-neutral-600 px-4 bg-[#F0EBE3] hover:bg-[#cbc6bf] shadow-lg  text-black py-2 text-[16px] rounded-none">
              Sign Out
            </Button>
          </SignOutButton>
        )}
      </div>
    </nav>
  );
}
