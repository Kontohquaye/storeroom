"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { RefObject } from "react";
// import { useRef } from "react";

const ResetSearch = ({ ref }: { ref: RefObject<HTMLFormElement | null> }) => {
  // const form = document.querySelector(".search-form") as HTMLFormElement;
  const handleReset = () => {
    if (ref) ref.current?.reset();
  };
  return (
    <button className="px-1">
      <Link href={"/dashboard"}>
        <X
          className="hover:text-red-400 hover:cursor-pointer  "
          onClick={handleReset}
        />
      </Link>
    </button>
  );
};

export default ResetSearch;
